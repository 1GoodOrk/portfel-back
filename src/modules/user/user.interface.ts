export interface UserData {
  id: string;
  email: string;
  token: string;
  portfolioIds: string;
  projectIds: string;
}

export interface UserRO {
  data: UserData;
}
