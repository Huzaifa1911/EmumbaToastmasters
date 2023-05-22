import {QueryKey, useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {AxiosError, AxiosResponse} from 'axios';

import {MutationArgs, QueryArgs, QueryErrorResponse} from '../types';
import {hideLoader, showLoader, updateUser, useAppDispatch} from 'Store';
import {showToast} from 'Utils';

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
    AxiosResponse<TQueryData>,
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
        if (error.status === 401) {
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
      else return data.data as unknown as TSelectData;
    },
    refetchInterval,
  });

  useEffect(() => {
    if (isLoading && showLoading) dispatch(showLoader());
  }, [isLoading, showLoading]);

  return {isLoading, ...query};
};

export const useAppMutation = <TData, TVariables = null>(
  args: MutationArgs<TData, TVariables>,
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
      if (onSuccess) onSuccess(data.data, variables);
    },

    onMutate: variables => {
      if (showLoading) dispatch(showLoader());
      if (onMutate) onMutate(variables);
    },

    onError: (error, variables) => {
      if (onError) onError(error, variables);
      else {
        const message = error.response?.data.detail;
        showToast(message ?? '', 'Error', 'error');

        if (error.status === 401) {
          dispatch(updateUser({user: null}));
        }
      }
    },

    onSettled: (data, error) => {
      if (showLoading) dispatch(hideLoader());
      if (onSettled) onSettled(data?.data, error);
    },
  });
};

// export const useAppInfiniteQuery = <TQueryData, TSelectData = TQueryData>(
//   args: InfiniteQueryArgs<TQueryData, TSelectData>,
// ) => {
//   const {
//     queryKey,
//     queryFn,
//     onError,
//     onSettled,
//     onSuccess,
//     options,
//     select,
//     showLoading,
//     dataKey,
//     refetchInterval,
//   } = args;
//   const dispatch = useAppDispatch();

//   const {isLoading, ...query} = useInfiniteQuery<
//     InfiniteQueryResponse<AxiosResponse<TQueryData>>,
//     AxiosError<QueryErrorResponse>,
//     TSelectData,
//     QueryKey
//   >(queryKey, queryFn, {
//     ...options,

//     onSuccess: data => {
//       if (onSuccess) onSuccess(data);
//     },

//     onError: error => {
//       if (onError) onError(error);
//       else {
//         const message = error.response?.data.message;
//         // showToast(message ?? '', 'Error', 'error');
//       }
//     },

//     onSettled: (data, error) => {
//       if (showLoading) dispatch(hideLoader);
//       if (onSettled) onSettled(data, error);
//     },

//     select: data => {
//       if (select) return select(data);
//       return data;
//     },

//     refetchInterval,
//   });

//   useEffect(() => {
//     if (showLoading && isLoading) dispatch(showLoader);
//   }, []);

//   return {isLoading, ...query};
// };
