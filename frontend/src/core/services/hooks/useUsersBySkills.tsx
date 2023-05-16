import {useEffect, useState} from 'react';
import {UsersService} from "../users-service";
import {ShortUser} from "../../models/short-user";
import {AppError} from "../../models/app-error";

export const useStateShortUsers = (skillId: string | null) => {
  const [users, setUsers] = useState<Readonly<ShortUser[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AppError<ShortUser[]> | null>(null);

  useEffect(() => {
    if (skillId !== null) {
      getUsers(skillId);
    }
  }, [skillId])

  const getUsers = async (skillId: string) => {
    setIsLoading(true);
    setUsers(null);
    try {
      const newUsers = await UsersService.getUsers(1, 6, false, undefined, [skillId]);
      setUsers(newUsers);
    } catch (error: unknown) {
      if (error instanceof AppError<ShortUser[]>)
        setError(error);
    }
    setIsLoading(false);
  };

  return {
    users, isLoading, error,
  }
};
