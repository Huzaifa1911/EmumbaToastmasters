import {useCallback} from 'react';

import {API_HELPERS, useAppMutation} from 'Services';
import {updateUser, useAppDispatch} from 'Store';
import {TLoginPayload, TUser} from 'Types';
import {showToast} from 'Utils';

export const useLogin = ({showLoading = false}: {showLoading?: boolean}) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(async (data: TUser) => {
    showToast('Logged In Successfully', 'Login');
    dispatch(updateUser({user: data}));
  }, []);

  return useAppMutation<TUser, TLoginPayload>({
    queryFn: payload => API_HELPERS.loginWithUsername(payload),
    showLoading,
    onSuccess,
  });
};
