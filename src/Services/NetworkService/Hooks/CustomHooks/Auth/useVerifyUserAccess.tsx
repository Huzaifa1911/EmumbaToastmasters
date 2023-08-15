import {useCallback} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {TShowLoading, TUser} from 'Types';
import {API_HELPERS, queryClient, useAppQuery} from 'Services';
import {decodeJwtToken} from 'Utils';
import {updateUser, useAppDispatch} from 'Store';

const onSettled = () => {
  setTimeout(() => SplashScreen.hide(), 2000);
};

export const useVerifyUserAccess = ({showLoading = false}: TShowLoading) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback((data: TUser) => {
    dispatch(updateUser({user: data}));
    queryClient.invalidateQueries(['APP_USER']);
  }, []);

  return useAppQuery<TUser>({
    queryKey: ['APP_USER'],
    queryFn: async () => {
      const jwtData = await decodeJwtToken();
      return API_HELPERS.getAllUsers<TUser>({pathParams: [jwtData?.user_id]});
    },
    showLoading,
    onSuccess,
    onSettled,
  });
};
