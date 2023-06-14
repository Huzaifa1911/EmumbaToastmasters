import {useAppMutation} from '../../GenericHooks';
import {API_HELPERS, NetworkTypes, queryClient} from 'Services';
import {TShowLoading, TVotingPoll} from 'Types';

const onSuccess = () => {
  queryClient.invalidateQueries(['VOTING_POLLS']);
};

export const useUpdateVotingPoll = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TVotingPoll, NetworkTypes.TUpdatePollPayload>({
    queryFn: payload => API_HELPERS.updateVotingPoll({payload}),
    onSuccess,
    showLoading,
  });
};
