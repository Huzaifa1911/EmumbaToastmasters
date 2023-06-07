import {TDataItem, TShowLoading} from 'Types';
import {API_HELPERS, useAppQuery} from 'Services';

export const useGetGamificationPoints = ({showLoading = false}: TShowLoading) => {
  return useAppQuery<TDataItem[]>({
    queryKey: ['GAMIFICATION_DATA'],
    queryFn: API_HELPERS.getGamificationPoints,
    showLoading,
  });
};
