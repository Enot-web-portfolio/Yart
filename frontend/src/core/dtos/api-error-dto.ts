import { AxiosError } from 'axios';

export type GeneralApiError<T> = AxiosError<T>;
