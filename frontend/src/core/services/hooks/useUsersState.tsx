import { useEffect, useState } from 'react';

import { UsersService } from '../users-service';
import { ShortUser } from '../../models/short-user';
import { AppError } from '../../models/app-error';

type Props = Readonly<{
  page: number;
  count: number;
  skillIds?: string[] | number[];
  search?: string;
  onlySubscriptions?: boolean;
}>;

export const useUsersState = (props: Props) => {
  const [users, setUsers] = useState<Readonly<ShortUser[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError<ShortUser[]> | null>(null);

  useEffect(() => {
    getUsers();
  }, [props.page, props.count, props.search, props.skillIds, props.onlySubscriptions]);

  const getUsers = async() => {
    setIsLoading(true);
    setUsers(null);
    try {
      const newUsers = await UsersService.getUsers(props.page, props.count, props.onlySubscriptions ?? false, props.search, props.skillIds);
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
