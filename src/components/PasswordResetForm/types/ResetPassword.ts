/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_customerPasswordReset_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface ResetPassword_customerPasswordReset {
  __typename: "CustomerPasswordReset";
  errors: (ResetPassword_customerPasswordReset_errors | null)[] | null;
}

export interface ResetPassword {
  customerPasswordReset: ResetPassword_customerPasswordReset | null;
}

export interface ResetPasswordVariables {
  email: string;
}
