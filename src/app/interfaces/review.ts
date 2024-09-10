import { Address } from '../main/accounts-settings/account-verification/account-verification.component';
import { Fullname } from './profile';

export interface Review {
  _id: string;
  comment?: string;
  media?: string[];
  staycation: string;
  user: ReviewAuthor;
  expand?: boolean;
  rating: number;
}

export interface ReviewAuthor {
  _id: string;
  img: string;
  name: Fullname;
  address: Address;
}
