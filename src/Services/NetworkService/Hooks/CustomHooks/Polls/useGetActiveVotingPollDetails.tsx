import {TShowLoading, TStandardVotingPoll} from 'Types';
import {useAppQuery} from '../../GenericHooks';
import {API_HELPERS} from 'Services';

export const useGetActiveVotingPollDetails = ({
  showLoading,
  pollId,
  voterId,
}: TShowLoading & {pollId: number; voterId: number}) => {
  return useAppQuery<TStandardVotingPoll>({
    queryKey: ['VOTING_POLL_DETAILS', pollId, voterId],
    queryFn: () => API_HELPERS.getActiveVotingPollDetails(pollId, voterId),
    showLoading,
  });
};
