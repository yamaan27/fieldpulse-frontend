// import { endPoints } from 'services/helpers/config'
import * as Yup from "yup";

//ADMIN LOGIN SCHEMA
// export const loginSchema = Yup.object().shape(
//   {
//     email: Yup.string().when(endPoints.auth.IS_VALIDATE, {
//       is: (value) => Boolean(value),
//       then: Yup.string()
//         .email('Must be a valid email id')
//         .max(255)
//         .required('Email is required'),
//       otherwise: Yup.string().nullable(),
//     }),
//     password: Yup.string().when(endPoints.auth.IS_VALIDATE, {
//       is: (value) => Boolean(value),
//       then: Yup.string()
//         .required('Please enter your password')
//         .min(8, 'Must be 8 characters or more')
//         .matches(/[a-z]+/, 'One lowercase character')
//         .matches(/[A-Z]+/, 'One uppercase character')
//         .matches(/[@$!%*#?&]+/, 'One special character')
//         .matches(/\d+/, 'One number'),
//       otherwise: Yup.string().nullable(),
//     }),
//   },
//   [endPoints.auth.IS_VALIDATE]
// )

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required")
    .min(4, "Email must be at least 4 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    // .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
});

export const forgotPasswordSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email("Please enter you email id")
      .max(50)
      .required("Email is required"),
  });
};
