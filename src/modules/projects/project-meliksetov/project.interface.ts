export interface ProjectMeliksetovData {
  _id: string;
  name: string;
  des: string;
  code:  string;
  subinfo: string;
  priority: number;
  responsibleName: string;
  analyze: any;
}

export interface ProjectMeliksetovRO {
  data: ProjectMeliksetovData;
}
