export interface EnterpriseLogData {
  _id: string;
  name: string;
  des: string;
  subinfo: string;
  priority: number;
  responsibleName: string;
  phases: any;
  dateCreation: any;
  stackholders: any;
}

export interface EnterpriseLogRO {
  data: EnterpriseLogData;
}
