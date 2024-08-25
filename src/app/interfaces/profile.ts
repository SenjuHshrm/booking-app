export interface Fullname {
  fName: string;
  mName?: string;
  lName: string;
  xName?: string;
}

interface Address {
  unit?: string;
  street?: string;
  brgy?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
}

interface Description {
  description?: string;
  favFood?: string;
  favPlace?: string;
  hobbies?: string[];
  work?: string;
}

interface Property {
  image: string;
  title: string;
  description: string;
  permonth: string;
  cover: string;
  imgs: string[];
}

export interface IUserProfile {
  name: Fullname;
  desc: Description;
  address: Address;
  status: string;
  email: string;
  contact: string;
  identificationStat: string;
  img: string;
  paymentClientId: string;
  userType: string;
  createdAt: string;
  properties: Property[];
}
