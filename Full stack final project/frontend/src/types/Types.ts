export interface IUser {
  name: string;
  password?: string;
  organization: string;
  area?: string;
  organizationId?: string;
}

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IOrganization {
  name: string;
  resources: { name: string; amount: number }[];
  budget: number;
}