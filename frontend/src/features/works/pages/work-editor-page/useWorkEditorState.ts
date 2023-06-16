import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import { toast } from 'react-toastify';

import { WorksService } from '../../../../core/services/works-service';
import { EditingWork } from '../../../../core/models/editing-work';
import { WorkBlockType } from '../../../../core/models/work-block';
import { FilesService } from '../../../../core/services/files-service';

export const useWorkEditorState = () => {

  /** Id работы. */
  const { id } = useParams<{ id: string; }>();

  /** Редактируемая работа. */
  const [work, setWork] = useState<EditingWork | null>(null);

  /** Загружаются ли данные работы. */
  const [isLoading, setIsLoading] = useState(true);

  /** Ошибка при получении/сохранении данных. */
  const [error, setError] = useState<number | null>(null);

  /** Сохраняется ли работа. */
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    onDataGet();
  }, []);

  /** Ф-ция получения данных редактируемой работы. */
  async function onDataGet() {
    try {
      const workData = id === 'new' ? await WorksService.getWorkCreate() : await WorksService.getWorkEdit(id ?? '');
      setWork(workData);
    } catch (error: unknown) {
      setError((error as AxiosError).status ?? 404);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Ф-ция создания работы.
   * @param curWork
   */
  async function onWorkCreate(curWork: EditingWork) {
    if (curWork === null) {
      return;
    }
    try {
      setIsSaving(true);
      await WorksService.postWorkCreate(curWork);
      toast.success('Работа создана');
    } catch (error: unknown) {
      setError((error as AxiosError).status ?? 404);
      toast.error('Произошла ошибка');
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Ф-ция редактирования работы.
   * @param curWork
   */
  async function onWorkEdit(curWork: EditingWork) {
    if (curWork === null) {
      return;
    }
    try {
      setIsSaving(true);
      await WorksService.putWorkEdit(curWork, id ?? '');
      toast.success('Работа изменена');
    } catch (error: unknown) {
      setError((error as AxiosError).status ?? 404);
      toast.error('Произошла ошибка');
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Ф-ция сохранения работы.
   * @param curWork
   * @param files
   */
  async function onWorkSave(curWork: EditingWork, files: File[]) {
    setIsSaving(true);
    for (let i = 0; i < curWork.workBlock.length; i++) {
      const block = curWork.workBlock[i];
      if (block.blockType !== WorkBlockType.Image || !block.blockImage) {
        continue;
      }

      const fileName = block.blockImage.name;
      try {
        const url = await FilesService.postWorkFile(block.blockImage);
        block.blockImageUrls = [url];
      } catch (error: unknown) {
        toast.error(`Ошибка при загрузке файла: ${fileName}`);
        block.blockImageUrls = [];
      }
    }

    if (id === 'new') {
      onWorkCreate(curWork);
    } else {
      onWorkEdit(curWork);
    }
  }

  return {

    /** Редактируемая работа. */
    work,

    /** Ф-ция сохранения редактируемой работы. */
    setWork,

    /** Загружаются ли данные работы. */
    isLoading,

    /** Ошибка при получении/сохранении данных. */
    error,

    /** Ф-ция сохранения работы. */
    onWorkSave,

    /** Сохраняется ли работа. */
    isSaving,
  };
};
