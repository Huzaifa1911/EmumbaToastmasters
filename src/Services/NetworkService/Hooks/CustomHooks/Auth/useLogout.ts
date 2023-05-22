import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';

import {TShowLoading} from 'Types';
import {KeychainStorageService} from 'Services';
import {showToast} from 'Utils';
import {hideLoader, showLoader, updateUser, useAppDispatch} from 'Store';

// ! Simulating the logout functionality by remove access token from Storage.
export const useLogout = ({showLoading = true}: TShowLoading) => {
  const dispatch = useAppDispatch();

  const logoutHelper = useCallback(
    (): Promise<string> =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const isRemoved = await KeychainStorageService.clearToken();
          dispatch(updateUser({user: null}));
          if (isRemoved) resolve('Logged out successfully');
          else reject('Unable to logged out');
        }, 1000);
      }),
    [],
  );

  return useMutation<string, string>(logoutHelper, {
    onMutate: () => showLoading && dispatch(showLoader()),
    onSettled: () => showLoading && dispatch(hideLoader()),
    onSuccess: data => showToast(data, 'Success', 'success'),
    onError: error => showToast(error, 'Error', 'error'),
  });
};
