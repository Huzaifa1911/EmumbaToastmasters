import {TShowLoading, TStandardVotingPoll} from 'Types';
import {useAppQuery} from '../../GenericHooks';
import {API_HELPERS} from 'Services';

export const useGetActiveVotingPollDetails = ({
  showLoading,
  pollId,
  // ! Guest Mode Code
  voterId,
}: TShowLoading & {pollId: number; voterId?: number}) => {
  return useAppQuery<TStandardVotingPoll>({
    queryKey: ['VOTING_POLL_DETAILS', pollId],
    // ! Guest Mode Code
    queryFn: () => API_HELPERS.getActiveVotingPollDetails(pollId, voterId),
    showLoading,
  });
};
