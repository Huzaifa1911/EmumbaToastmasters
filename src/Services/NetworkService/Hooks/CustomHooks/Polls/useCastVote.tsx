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
  showToast("You've Successfully Casted Vote");
  queryClient.invalidateQueries(['VOTING_POLL_DETAILS']);

  NavigationService.goBack();
};

export const useCastVote = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TVote, NetworkTypes.TCastVotePayload>({
    queryFn: payload => API_HELPERS.castVote({payload}),
    showLoading,
    onSuccess,
  });
};