import { Fullname } from './profile';

export interface IFAQ {
  addedBy: string;
  question: string;
  answer: string;
  isActive: boolean;
}

export interface IFAQCreator {
  _id: string;
  img: string;
  name: Fullname;
}

export interface IFAQItem {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
  addedBy: IFAQCreator;
}
