export interface ProjectMeliksetovData {
  _id: string;
  name: string;
  des: string;
  subinfo: string;
  priority: number;
  responsibleName: string;
  stackholders: any;
  stackholderData: any;
  analyze: any;
  balance: any;  
}

export interface ProjectMeliksetovRO {
  data: ProjectMeliksetovData;
}
