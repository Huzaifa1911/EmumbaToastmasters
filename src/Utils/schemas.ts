import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Please enter your email'),
  // .matches(/\@emumba.com$/, 'Domain not allowed'),
  password: yup.string().required('Pleasee enter password'),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required('Please enter your firstname'),
  lastName: yup.string().required('Please enter your lastname'),
  email: yup.string().email().required('Please enter your email'),
  // .matches(/\@emumba.com$/, 'Domain not allowed'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
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
