import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { User } from '../../../../core/models/user';
import { UsersService } from '../../../../core/services/users-service';

export const useUserState = () => {

  /** User id. */
  const { id } = useParams<{ id?: string; }>();

  /** User data.  */
  const [user, setUser] = useState<User | null>(null);

  /** Is loading user data. */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onUserGet();
  }, [id]);

  /** Get user data. */
  async function onUserGet() {
    try {
      setIsLoading(true);
      setUser(null);
      const currUser = await UsersService.getUser(id ?? '');
      setUser(currUser);
    } catch (error: unknown) {
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return {

    /** User id. */
    id,

    /** User data.  */
    user,

    /** Is loading user data. */
    isLoading,

    onUserGet,
  };
};
