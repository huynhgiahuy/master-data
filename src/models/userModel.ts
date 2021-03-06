export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  key: number;
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address
  phone: string;
  website: string;
  company: Company;
}

export interface AddedUser {
  email: string;
  name: string;
  username: string;
}

export interface EditedUser {
  id: number;
  email: string;
  name: string;
  username: string;
}

export interface UserDetail {
  id: number;
  email: string;
  name: string;
  username: string;
}