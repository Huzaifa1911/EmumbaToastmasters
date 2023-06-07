import {API_HELPERS} from 'Services';

import {TAttendedEvent, TShowLoading} from 'Types';
import {useAppInfiniteQuery} from '../../GenericHooks';

export const useGetAllAttendedEvents = ({showLoading = false}: TShowLoading) => {
  return useAppInfiniteQuery<TAttendedEvent>({
    queryKey: ['ATTENDED_EVENTS'],
    queryFn: async ({pageParam = 1}) => await API_HELPERS.getAllAttendedEvents(pageParam),
    showLoading,
  });
};
