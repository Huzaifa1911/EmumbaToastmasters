import {TShowLoading, TStandardVotingPoll} from 'Types';
import {useAppQuery} from '../../GenericHooks';
import {API_HELPERS} from 'Services';

export const useGetActiveVotingPollDetails = ({
  showLoading,
  pollId,
}: TShowLoading & {pollId: number}) => {
  return useAppQuery<TStandardVotingPoll>({
    queryKey: ['VOTING_POLL_DETAILS', pollId],
    queryFn: () => API_HELPERS.getActiveVotingPollDetails(pollId),
    showLoading,
  });
};
