export interface UserData {
  _id: string;
  email: string;
  token: string;
  portfolioIds: Array<string>;
  projectIds: Array<string>;
}

export interface UserRO {
  data: UserData;
}
