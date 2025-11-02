export interface PortfolioData {
  _id: string;
  name: string;
  img: string;
  des: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleLastname: string;
  responsibleOrganization?: string;
  projects: number;
  projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  location: string;
  town?: string;
}

export interface PortfolioDataRO {
  _id: string;
  name: string;
  img: string;
  des: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleLastname: string;
  responsibleOrganization?: string;
  projects: number;
  projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  location: string;
  town?: string;
}

export interface PortfolioRO {
  data: PortfolioDataRO;
}
