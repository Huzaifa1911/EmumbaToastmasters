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

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
