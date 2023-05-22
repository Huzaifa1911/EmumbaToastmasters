import {
  InfiniteData,
  MutationFunction,
  MutationOptions,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import {AxiosError, AxiosResponse} from 'axios';

type data<T> = {[k: string]: T[]};

export type InfiniteQueryResponse<T> = {
  data: {
    previous_page: number;
    next_page: number;
    // total: number; // this is changing, needs to be same i.e., total from Backend
    current_page: number;
  } & data<T>;
};

export type QueryErrorResponse = {
  detail: string;
};

export type QueryArgs<TQueryData, TSelectData = TQueryData> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<AxiosResponse<TQueryData>>;
  onSuccess?: (data: TQueryData | TSelectData) => void;
  onSettled?: (
    data: TSelectData | undefined,
    error: AxiosError<QueryErrorResponse> | null,
  ) => void;
  select?: (data: AxiosResponse<TQueryData, any>) => TSelectData;
  onError?: (error: AxiosError<QueryErrorResponse>) => void;
  showLoading?: boolean;
  refetchInterval?: number | false;
  options?: Omit<
    UseQueryOptions<AxiosResponse<TQueryData>, AxiosError<QueryErrorResponse>>,
    'onSuccess' | 'onError | onSettled' | 'refetchInterval' | 'select'
  >;
};

export type MutationArgs<TData, TVariables> = {
  queryFn: MutationFunction<AxiosResponse<TData>, TVariables>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (
    error: AxiosError<QueryErrorResponse>,
    variables: TVariables,
  ) => void;
  onSettled?: (
    data: TData | undefined,
    error: AxiosError<QueryErrorResponse> | null,
  ) => void;
  onMutate?: (variables: TVariables) => void;
  showLoading?: boolean;
  options?: Omit<
    MutationOptions<TData, AxiosError<QueryErrorResponse>>,
    'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >;
};

export type InfiniteQueryArgs<TQueryData, TSelectData = TQueryData> = {
  queryKey: QueryKey;
  dataKey: string[];
  queryFn: QueryFunction<AxiosResponse<InfiniteQueryResponse<TQueryData>>>;
  showLoading?: boolean;
  refetchInterval?: number | false;
  onSuccess?: (data: InfiniteData<TSelectData>) => void;
  onError?: (data: AxiosError<QueryErrorResponse>) => void;
  onSettled?: (
    data: InfiniteData<TSelectData> | undefined,
    error: AxiosError<QueryErrorResponse> | null,
  ) => void;
  select?: (data: InfiniteData<TQueryData>) => TSelectData[];
  options?: Omit<
    UseInfiniteQueryOptions<
      AxiosResponse<InfiniteQueryResponse<TQueryData>>,
      AxiosError<QueryErrorResponse>
    >,
    'onSuccess' | 'onError' | 'onSettled' | 'select' | 'refetchInterval'
  >;
};
