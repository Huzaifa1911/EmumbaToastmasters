import {TShowLoading, TVotingPollDetails} from 'Types';
import {useAppQuery} from '../../GenericHooks';
import {API_HELPERS} from 'Services';

export const useGetActiveVotingPollDetailsForEdit = ({
  showLoading,
  pollId,
}: TShowLoading & {pollId: number}) => {
  return useAppQuery<TVotingPollDetails>({
    queryKey: ['ACTIVE_POLL_DETAILS_FOR_EDIT', pollId],
    queryFn: () => API_HELPERS.getActivePollDetailsForEdit(pollId),
    showLoading,
  });
};
