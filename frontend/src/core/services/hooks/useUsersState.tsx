import { useState } from 'react';

import { UsersService } from '../users-service';
import { ShortUser } from '../../models/short-user';
import { AppError } from '../../models/app-error';

export const useUsersState = () => {
  const [users, setUsers] = useState<Readonly<ShortUser[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError<ShortUser[]> | null>(null);

  const getUsers = async(skillIds: string[] | number[], search?: string) => {
    setIsLoading(true);
    setUsers(null);
    try {
      const newUsers = await UsersService.getUsers(1, 100, false, search, skillIds);
      setUsers(newUsers);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof AppError<ShortUser[]>) {
        setError(error);
        if (error.message !== 'canceled') {
          setIsLoading(false);
        }
      }
    }
  };

  return {
    users, isLoading, error, getUsers,
  };
};
