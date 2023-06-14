import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { EditorUser } from '../../../../../../core/models/editor-user';
import { UsersService } from '../../../../../../core/services/users-service';

/** Хук стейта настроек. */
export const useEditorUserState = () => {

  /** Id пользователя. */
  const { id } = useParams<{id: string;}>();

  /** Данные изменяемого пользователя. */
  const [editorUser, setEditorUser] = useState<EditorUser | null>(null);

  /** Загружаются ли данные. */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onDataGet();
  }, []);

  /** Ф-ция получения данных настроек. */
  async function onDataGet() {
    try {
      const user = await UsersService.getUserEdit(id ?? '');
      setEditorUser(user);
    } catch (error: unknown) {

    } finally {
      setIsLoading(false);
    }
  }

  return {

    /** Id пользователя. */
    editorUser,

    /** Загружаются ли данные. */
    isLoading,
  };
};
