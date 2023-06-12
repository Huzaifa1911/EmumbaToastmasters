import {useAppMutation} from '../../GenericHooks';
import {API_HELPERS, NetworkTypes, queryClient} from 'Services';
import {TShowLoading, TVotingPoll} from 'Types';

const onSuccess = () => {
  queryClient.invalidateQueries(['VOTING_POLLS']);
};

export const useCreateVotingPoll = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TVotingPoll, NetworkTypes.TCreatePollPayload>({
    queryFn: payload => API_HELPERS.createVotingPoll(payload),
    onSuccess,
    showLoading,
  });
};
