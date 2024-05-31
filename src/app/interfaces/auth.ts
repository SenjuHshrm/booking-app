import { FormControl } from '@angular/forms';

export interface IAuthForm {
  email: FormControl;
  password: FormControl;
}

export interface IAuth {
  email: string;
  password: string
}