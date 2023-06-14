import {
  InfiniteData,
  MutationFunction,
  MutationOptions,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {TPaginatedResponse} from 'Types';

import {AxiosError} from 'axios';

export type QueryErrorResponse = {
  detail: string;
};

export type QueryArgs<TQueryData, TSelectData = TQueryData> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<TQueryData>;
  onSuccess?: (data: TQueryData | TSelectData) => void;
  onSettled?: (
    data: TSelectData | undefined,
    error: AxiosError<QueryErrorResponse> | null,
  ) => void;
  select?: (data: TQueryData) => TSelectData;
  onError?: (error: AxiosError<QueryErrorResponse>) => void;
  showLoading?: boolean;
  refetchInterval?: number | false;
  options?: Omit<
    UseQueryOptions<TQueryData, AxiosError<QueryErrorResponse>>,
    'onSuccess' | 'onError | onSettled' | 'refetchInterval' | 'select'
  >;
};

export type MutationArgs<TData, TVariables> = {
  queryFn: MutationFunction<TData, TVariables>;
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
  queryFn: QueryFunction<TPaginatedResponse<TQueryData>>;
  showLoading?: boolean;
  refetchInterval?: number | false;
  onSuccess?: (data: InfiniteData<TSelectData>) => void;
  onError?: (data: AxiosError<QueryErrorResponse>) => void;
  onSettled?: (
    data: InfiniteData<TSelectData> | undefined,
    error: AxiosError<QueryErrorResponse> | null,
  ) => void;
  select?: (data: TQueryData[]) => TSelectData[];
  options?: Omit<
    UseInfiniteQueryOptions<
      TPaginatedResponse<TQueryData>,
      AxiosError<QueryErrorResponse>
    >,
    | 'onSuccess'
    | 'onError'
    | 'onSettled'
    | 'select'
    | 'refetchInterval'
    | 'getNextPageParam'
  >;
};

export type TCastVotePayload = {
  candidate: number;
  poll: number;
  voter: number;
};

export type TUpdateVotePayload = {
  candidate: number;
  vote: number;
};

export type TCreatePollPayload = {
  candidates: number[];
  poll_type: number;
  owner: number;
  is_active: boolean;
};

export type TUpdatePollPayload = {
  pollId: number;
  is_active: boolean;
};
