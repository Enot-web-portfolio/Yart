import { useEffect, useState } from 'react';

import { UsersService } from '../users-service';
import { ShortUser } from '../../models/short-user';
import { AppError } from '../../models/app-error';

export const useUsersState = (skillIds: string[] | number[]) => {
  const [users, setUsers] = useState<Readonly<ShortUser[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError<ShortUser[]> | null>(null);

  useEffect(() => {
    getUsers(skillIds);
  }, [skillIds]);

  const getUsers = async(currSkillsIds: string[] | number[]) => {
    setIsLoading(true);
    setUsers(null);
    try {
      const newUsers = await UsersService.getUsers(1, 6, false, undefined, currSkillsIds);
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
    users, isLoading, error,
  };
};
