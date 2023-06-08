import {TShowLoading, TVote} from 'Types';
import {useAppMutation} from '../../GenericHooks';
import {
  API_HELPERS,
  NavigationService,
  NetworkTypes,
  queryClient,
} from 'Services';
import {showToast} from 'Utils';

type TVariables = {
  payload: NetworkTypes.TCastVotePayload;
  method: 'post' | 'patch';
};

const onSuccess = () => {
  // eslint-disable-next-line quotes
  showToast("You've Successfully Casted Vote");
  queryClient.invalidateQueries(['VOTING_POLL_DETAILS', 'VOTING_POLLS']);
  NavigationService.goBack();
};

export const useCastVote = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TVote, TVariables>({
    queryFn: ({payload, method}) => API_HELPERS.castVote({payload, method}),
    showLoading,
    onSuccess,
  });
};
