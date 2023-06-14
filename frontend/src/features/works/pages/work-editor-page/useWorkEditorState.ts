import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import { WorksService } from '../../../../core/services/works-service';
import { EditingWork } from '../../../../core/models/editing-work';

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

  /** Ф-ция создания работы. */
  async function onWorkCreate() {
    if (work === null) {
      return;
    }
    try {
      setIsSaving(true);
      await WorksService.postWorkCreate(work);
    } catch (error: unknown) {
      setError((error as AxiosError).status ?? 404);
    } finally {
      setIsSaving(false);
    }
  }

  /** Ф-ция редактирования работы. */
  async function onWorkEdit() {
    if (work === null) {
      return;
    }
    try {
      setIsSaving(true);
      await WorksService.postWorkEdit(work, id ?? '');
    } catch (error: unknown) {
      setError((error as AxiosError).status ?? 404);
    } finally {
      setIsSaving(false);
    }
  }

  /** Ф-ция сохранения работы. */
  function onWorkSave() {
    if (id === 'new') {
      onWorkCreate();
    } else {
      onWorkEdit();
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
