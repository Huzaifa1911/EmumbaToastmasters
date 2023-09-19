import {useAppMutation} from '../../GenericHooks';
import {API_HELPERS, NetworkTypes, queryClient} from 'Services';
import {TShowLoading, TVotingPoll} from 'Types';
import {showToast} from 'Utils';

const onSuccess = () => {
  queryClient.invalidateQueries(['VOTING_POLLS']);
  queryClient.invalidateQueries(['ACTIVE_POLL_DETAILS_FOR_EDIT']);
  showToast('Poll Updated Successfully!', 'Success', 'success');
};

export const useUpdateVotingPoll = ({showLoading = false}: TShowLoading) => {
  return useAppMutation<TVotingPoll, NetworkTypes.TUpdatePollPayload>({
    queryFn: payload => API_HELPERS.updateVotingPoll({payload}),
    onSuccess,
    showLoading,
  });
};
