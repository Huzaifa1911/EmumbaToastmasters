import {TShowLoading, TUser} from 'Types';
import {useAppInfiniteQuery} from '../../GenericHooks';
import {ROUTES, axiosInstance} from 'Services';

export const useGetAllParticipants = ({showLoading = false}: TShowLoading) => {
  return useAppInfiniteQuery<TUser>({
    queryFn: ({pageParam = 1}) =>
      axiosInstance.get(ROUTES.USER, {
        params: {page: pageParam},
      }),
    queryKey: ['ALL_USERS'],
    showLoading,
  });
};
