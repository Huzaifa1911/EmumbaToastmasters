import {useAppQuery} from '../../GenericHooks';
import {TShowLoading} from 'Types';
import {API_HELPERS} from 'Services';

export const useGetClosedPollDetails = ({
  showLoading = false,
  pollId,
}: TShowLoading & {pollId: number}) => {
  return useAppQuery({
    queryKey: ['CLOSE_POLL_DETAILS', pollId],
    queryFn: () => API_HELPERS.getClosedVotingPollDetails(pollId),
    showLoading,
    refetchInterval: 5000,
  });
};
