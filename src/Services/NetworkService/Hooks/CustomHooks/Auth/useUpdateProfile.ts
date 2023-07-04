import {useCallback} from 'react';

import {TShowLoading, TUser} from 'Types';
import {useAppMutation} from '../../GenericHooks';
import {API_HELPERS, NetworkTypes} from 'Services';
import {updateUser, useAppDispatch} from 'Store';

type TVariables = {userId: number; payload: NetworkTypes.TUpdateProfile};

export const useUpdateProfile = ({showLoading = false}: TShowLoading) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback((data: TUser) => {
    dispatch(updateUser({user: data}));
  }, []);

  return useAppMutation<TUser, TVariables>({
    queryFn: ({payload, userId}) =>
      API_HELPERS.updateProfile({payload, userId}),
    showLoading,
    onSuccess,
  });
};
