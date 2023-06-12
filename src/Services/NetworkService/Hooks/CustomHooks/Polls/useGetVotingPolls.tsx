import {useAppInfiniteQuery} from '../../GenericHooks';
import {TFormattedVotingPoll, TShowLoading} from 'Types';
import {API_HELPERS} from 'Services';

export const useGetVotingPolls = ({showLoading = false}: TShowLoading) => {
  return useAppInfiniteQuery<TFormattedVotingPoll>({
    queryKey: ['VOTING_POLLS'],
    queryFn: async ({pageParam = 1}) =>
      await API_HELPERS.getVotingPolls({params: {current_page: pageParam}}),
    showLoading,
    refetchInterval: 5000,
  });
};
