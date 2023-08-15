import {useCallback} from 'react';

import {API_HELPERS, useAppMutation} from 'Services';
import {updateUser, useAppDispatch} from 'Store';
import {TCreateAccountPayload, TUser} from 'Types';
import {showToast} from 'Utils';

export const useCreateAccount = ({
  showLoading = false,
}: {
  showLoading?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(async (data: TUser) => {
    showToast('Logged In Successfully', 'Login');

    dispatch(updateUser({user: data}));
  }, []);

  return useAppMutation<TUser, TCreateAccountPayload>({
    queryFn: payload => API_HELPERS.createAccount(payload),
    showLoading,
    onSuccess,
  });
};