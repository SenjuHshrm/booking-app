import { FormErrorMessage } from 'src/app/interfaces/input-error-message';

export const unitErrors: FormErrorMessage[] = [
  {
    field: 'unit',
    error: 'required',
    message: 'Unit is required.',
  },
  {
    field: 'unit',
    error: 'maxlength',
    message: 'Unit must not exceed 20 characters.',
  },
];

export const streetErrors: FormErrorMessage[] = [
  {
    field: 'street',
    error: 'required',
    message: 'Street is required.',
  },
  {
    field: 'street',
    error: 'maxlength',
    message: 'Street must not exceed 100 characters.',
  },
];

export const barangayErrors: FormErrorMessage[] = [
  {
    field: 'barangay',
    error: 'required',
    message: 'Barangay is required.',
  },
  {
    field: 'barangay',
    error: 'maxlength',
    message: 'Barangay must not exceed 100 characters.',
  },
];

export const cityErrors: FormErrorMessage[] = [
  {
    field: 'city',
    error: 'required',
    message: 'City is required.',
  },
  {
    field: 'city',
    error: 'maxlength',
    message: 'City must not exceed 100 characters.',
  },
];

export const provinceErrors: FormErrorMessage[] = [
  {
    field: 'province',
    error: 'required',
    message: 'Province is required.',
  },
  {
    field: 'province',
    error: 'maxlength',
    message: 'Province must not exceed 100 characters.',
  },
];

export const countryErrors: FormErrorMessage[] = [
  {
    field: 'country',
    error: 'required',
    message: 'Country is required.',
  },
  {
    field: 'country',
    error: 'maxlength',
    message: 'Country must not exceed 100 characters.',
  },
];

export const zipErrors: FormErrorMessage[] = [
  {
    field: 'zip',
    error: 'required',
    message: 'Zip Code is required.',
  },
  {
    field: 'zip',
    error: 'maxlength',
    message: 'Zip Code must not exceed 100 characters.',
  },
];
