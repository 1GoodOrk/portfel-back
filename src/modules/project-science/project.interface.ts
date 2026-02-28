export interface ProjectScienceData {
  _id: string;
  name: string;
  type: string;
  projectGoal: string;
  projectProduct: string;
  des: string;
  priority: number;
  responsibleName: string;
  customer: string;
  numberOfOrderDocument: string;
  data: string;
  staff: string;
  projectExpertiseIds?: Array<string>
}

export interface ProjectScienceRO {
  data: ProjectScienceData;
}
