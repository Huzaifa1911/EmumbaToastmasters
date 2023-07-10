import {AxiosError} from 'axios';

import {TShowLoading} from 'Types';
import {useAppMutation} from '../../GenericHooks';
import {API_HELPERS, NavigationService, NetworkTypes} from 'Services';
import {firstOrNull, showToast} from 'Utils';

type TData = {detail: string};
type TError = {new_password2: string[]};

const onSuccess = (data: TData) => {
  showToast(data.detail, 'Update Password');
  NavigationService.goBack();
};

const onError = (error: AxiosError<TError>) => {
  const message: string = firstOrNull(error.response?.data.new_password2);
  if (message) showToast(message, 'Error', 'error');
  else showToast('Something went wrong!', 'Error', 'error');
};

export const useUpdatePassword = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TData, NetworkTypes.TUpdatePassword, TError>({
    queryFn: payload => API_HELPERS.updatePassword({payload}),
    showLoading,
    onSuccess,
    onError,
  });
};
