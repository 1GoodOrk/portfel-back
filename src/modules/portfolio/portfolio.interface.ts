export interface PortfolioData {
  _id: string;
  name: string;
  img: string;
  des: string;
  projects: number;
  projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  duration: number;
  location: string;
  town?: string;
  optionEco: number;
  optionWar: number;
  optionLog: number;
  optionSoc: number;
  optionStruc: number;
}

export interface PortfolioDataRO {
  _id: string;
  name: string;
  img: string;
  des: string;
  projects: number;
  projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  duration: number;
  location: string;
  town?: string;
  options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
}

export interface PortfolioRO {
  data: PortfolioDataRO;
}
