import {useCallback} from 'react';

import {
  KeychainStorageService,
  ROUTES,
  axiosInstance,
  queryClient,
  useAppMutation,
} from 'Services';
import {updateUser, useAppDispatch} from 'Store';
import {AUTHORIZATION, decodeJwtToken} from 'Utils';

type TVariables = {username: string; password: string};
type TResponse = {refresh: string; access: string};

export const useLogin = ({showLoading = false}: {showLoading?: boolean}) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(async (data: TResponse) => {
    await KeychainStorageService.setToken(
      AUTHORIZATION.ACCESS_TOKEN,
      data.access,
    );
    const jwtdata = await decodeJwtToken();

    const {data: user} = await queryClient.fetchQuery({
      queryKey: ['APP_USER'],
      queryFn: () =>
        axiosInstance.get(`${ROUTES.GET_USER_DETAILS}/${jwtdata?.user_id}`),
    });

    dispatch(updateUser({user}));
  }, []);

  return useAppMutation<TResponse, TVariables>({
    queryFn: payload => axiosInstance.post(ROUTES.LOGIN, payload),
    showLoading,
    onSuccess,
  });
};
