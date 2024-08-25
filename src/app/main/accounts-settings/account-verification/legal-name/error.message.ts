import { FormErrorMessage } from 'src/app/interfaces/input-error-message';

export const firstNameErrors: FormErrorMessage[] = [
  {
    field: 'firstname',
    error: 'required',
    message: 'First Name is required.',
  },
  {
    field: 'firstname',
    error: 'minlength',
    message: 'First Name must consist of 2 - 50 characters only.',
  },
  {
    field: 'firstname',
    error: 'maxlength',
    message: 'First Name must consist of 2 - 50 characters only.',
  },
];

export const lastNameErrors: FormErrorMessage[] = [
  {
    field: 'lastname',
    error: 'required',
    message: 'Last Name is required.',
  },
  {
    field: 'lastname',
    error: 'minlength',
    message: 'Last Name must consist of 2 - 50 characters only.',
  },
  {
    field: 'lastname',
    error: 'maxlength',
    message: 'Last Name must consist of 2 - 50 characters only.',
  },
];
