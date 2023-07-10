import {useCallback} from 'react';

import {useAppMutation} from '../../GenericHooks';
import {API_HELPERS, KeychainStorageService} from 'Services';
import {updateUser, useAppDispatch} from 'Store';
import {showToast} from 'Utils';
import {TShowLoading} from 'Types';

export const useDeActivateAccount = ({showLoading = false}: TShowLoading) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(async () => {
    const isRemoved = await KeychainStorageService.clearToken();
    dispatch(updateUser({user: null}));
    if (isRemoved)
      showToast(
        'User Account has been deactivated successfully',
        'Deactivate Account',
      );
  }, []);
  return useAppMutation({
    queryFn: () => API_HELPERS.deactivateAccount(),
    onSuccess,
    showLoading,
  });
};
