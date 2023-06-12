import {useAppMutation} from '../../GenericHooks';
import {
  API_HELPERS,
  NavigationService,
  NetworkTypes,
  queryClient,
} from 'Services';
import {TShowLoading, TVotingPoll} from 'Types';

const onSuccess = () => {
  queryClient.invalidateQueries(['VOTING_POLLS']);
  NavigationService.goBack();
};

export const useCloseVotingPoll = ({
  showLoading = false,
  pollId,
}: {pollId: number} & TShowLoading) => {
  return useAppMutation<TVotingPoll, NetworkTypes.TClosePollPayload>({
    queryFn: payload => API_HELPERS.closeVotingPoll({payload, pollId}),
    onSuccess,
    showLoading,
  });
};
