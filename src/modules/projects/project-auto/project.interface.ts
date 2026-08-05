export interface ProjectAutoData {
  _id: string;
  name: string;
  des: string;
  subinfo: string;
  priority: number;
  responsibleName: string;
  phases: any;
  stackholders: any;
}

export interface ProjectAutoRO {
  data: ProjectAutoData;
}
