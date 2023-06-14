import {TShowLoading} from 'Types';
import {useAppQuery} from '../../GenericHooks';
import {API_HELPERS} from 'Services';

export const useGetStatPoints = ({showLoading = false}: TShowLoading) => {
  return useAppQuery({
    queryKey: ['APP_USER_STATS'],
    queryFn: () => API_HELPERS.getStatPoints(),
    showLoading,
  });
};
