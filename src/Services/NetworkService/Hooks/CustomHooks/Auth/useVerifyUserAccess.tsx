import {useCallback} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {TShowLoading, TUser} from 'Types';
import {ROUTES, axiosInstance, useAppQuery} from 'Services';
import {decodeJwtToken} from 'Utils';
import {updateUser, useAppDispatch} from 'Store';

const onSettled = () => {
  setTimeout(() => SplashScreen.hide(), 1000);
};

export const useVerifyUserAccess = ({showLoading = false}: TShowLoading) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback((data: TUser) => {
    dispatch(updateUser({user: data}));
  }, []);

  return useAppQuery<TUser>({
    queryKey: ['APP_USER'],
    queryFn: async () => {
      const jwtData = await decodeJwtToken();
      return axiosInstance.get(
        `${ROUTES.GET_USER_DETAILS}/${jwtData?.user_id}`,
      );
    },
    showLoading,
    onSuccess,
    onSettled,
  });
};
