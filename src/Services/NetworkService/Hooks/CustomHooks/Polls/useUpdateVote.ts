import {TShowLoading, TVote} from 'Types';
import {useAppMutation} from '../../GenericHooks';
import {
  API_HELPERS,
  NavigationService,
  NetworkTypes,
  queryClient,
} from 'Services';
import {showToast} from 'Utils';

const onSuccess = () => {
  // eslint-disable-next-line quotes
  showToast("You've Successfully Updated a Vote");
  queryClient.invalidateQueries(['VOTING_POLL_DETAILS']);
  NavigationService.goBack();
};

export const useUpdateVote = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TVote, NetworkTypes.TUpdateVotePayload>({
    queryFn: payload => API_HELPERS.updateVote({payload}),
    showLoading,
    onSuccess,
  });
};
