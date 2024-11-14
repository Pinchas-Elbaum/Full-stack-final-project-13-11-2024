export interface IUser {
  id?: string;
  name: string;
  password?: string;
  organization: string;
  area?: string;
  bugdet?: number;
  organizationId?: string;
}

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IOrganization {
  resources: { name: string; amount: number }[];
}

export interface IMissiles {
  name: string;
  intercepts : Array<string>;
  price: number;
}