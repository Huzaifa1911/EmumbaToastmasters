import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {useEffect} from 'react';
import {AxiosError} from 'axios';
import {pathOr} from 'ramda';

import {
  InfiniteQueryArgs,
  MutationArgs,
  QueryArgs,
  QueryErrorResponse,
} from '../types';
import {hideLoader, showLoader, updateUser, useAppDispatch} from 'Store';
import {showToast} from 'Utils';
import {TPaginatedResponse} from 'Types';

export const useAppQuery = <TQueryData, TSelectData = TQueryData>(
  args: QueryArgs<TQueryData, TSelectData>,
) => {
  const {
    queryFn,
    queryKey,
    onError,
    onSuccess,
    select,
    showLoading,
    onSettled,
    options,
    refetchInterval,
  } = args;

  const dispatch = useAppDispatch();

  const {isLoading, ...query} = useQuery<
    TQueryData,
    AxiosError<QueryErrorResponse>,
    TSelectData,
    QueryKey
  >(queryKey, queryFn, {
    ...options,
    onSuccess: data => {
      if (onSuccess) onSuccess(data);
    },

    onError: error => {
      if (onError) onError(error);
      else {
        const message = error.response?.data.detail;
        showToast(message ?? '', 'Error', 'error');
        if (error.response?.status === 401) {
          dispatch(updateUser({user: null}));
        }
      }
    },

    onSettled(data, error) {
      if (showLoading) dispatch(hideLoader());
      if (onSettled) onSettled(data, error);
    },
    select: data => {
      if (select) return select(data);
      else return data as unknown as TSelectData;
    },
    refetchInterval,
  });

  useEffect(() => {
    if (isLoading && showLoading) dispatch(showLoader());
  }, [isLoading, showLoading]);

  return {isLoading, ...query};
};

export const useAppMutation = <
  TData,
  TVariables = null,
  TError = QueryErrorResponse,
>(
  args: MutationArgs<TData, TVariables, TError>,
) => {
  const {
    onError,
    onMutate,
    onSettled,
    onSuccess,
    queryFn,
    options,
    showLoading,
  } = args;

  const dispatch = useAppDispatch();

  return useMutation(queryFn, {
    ...options,
    onSuccess: (data, variables) => {
      if (onSuccess) onSuccess(data, variables);
    },

    onMutate: variables => {
      if (showLoading) dispatch(showLoader());
      if (onMutate) onMutate(variables);
    },

    onError: (error, variables) => {
      if (onError) onError(error, variables);
      else {
        const message = pathOr('Error', ['response', 'data', 'detail'], error);
        showToast(message, 'Error', 'error');

        if (error.response?.status === 401) {
          dispatch(updateUser({user: null}));
        }
      }
    },

    onSettled: (data, error) => {
      if (showLoading) dispatch(hideLoader());
      if (onSettled) onSettled(data, error);
    },
  });
};

export const useAppInfiniteQuery = <TQueryData, TSelectData = TQueryData>(
  args: InfiniteQueryArgs<TQueryData, TSelectData>,
) => {
  const {
    queryKey,
    queryFn,
    onError,
    onSettled,
    onSuccess,
    options,
    select,
    showLoading,
    refetchInterval,
  } = args;
  const dispatch = useAppDispatch();

  const {isLoading, ...query} = useInfiniteQuery<
    TPaginatedResponse<TQueryData>,
    AxiosError<QueryErrorResponse>,
    TSelectData,
    QueryKey
  >(queryKey, queryFn, {
    ...options,

    onSuccess: data => {
      if (onSuccess) onSuccess(data);
    },

    onError: error => {
      if (onError) onError(error);
      else {
        const message = error.response?.data.detail;
        showToast(message ?? '', 'Error', 'error');
        if (error.response?.status === 401) {
          dispatch(updateUser({user: null}));
        }
      }
    },

    onSettled: (data, error) => {
      if (showLoading) dispatch(hideLoader());
      if (onSettled) onSettled(data, error);
    },

    select: data => {
      const {pageParams, pages} = data;
      const formattedData = pages.flatMap(page => page.results);
      if (select) return {pageParams, pages: select(formattedData)};
      return {
        pageParams,
        pages: formattedData,
      } as unknown as InfiniteData<TSelectData>;
    },
    getNextPageParam: lastPage => {
      const {current_page, num_pages, results} = lastPage;
      if (current_page < num_pages && results.length < 100)
        return current_page + 1;
      else undefined;
    },
    refetchInterval,
  });

  useEffect(() => {
    if (showLoading && isLoading) dispatch(showLoader());
  }, [isLoading, showLoading]);

  return {isLoading, ...query};
};
