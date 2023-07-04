import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Please enter username'),
  password: yup.string().required('Pleasee enter password'),
});

export const castVoteSchema = yup.object().shape({
  selectedCandidate: yup.number().required('Please Select Candidate'),
});

export const updateProfileSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});
