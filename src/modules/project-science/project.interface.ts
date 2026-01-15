export interface ProjectScienceData {
  _id: string;
  name: string;
  subinfo: string;
  type: string;
  priority: number;
  des: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleLastname: string;
  managerName: string;
  managerSurname: string;
  managerLastname: string;
  responsibleOrganization: string;
  volumeOfWork: number;
  forecastProjectTaskAmount: number;
  term: number;
  actionPlan: string;
  sphereOfAction: string;
  budget: number;
  budgetSource: string;
  governmentSubsidies: string;
  numberOfOrderDocument: string;
  staff: string;
  technology: string;
  projectExpertiseIds?: Array<string>
}

export interface ProjectScienceRO {
  data: ProjectScienceData;
}
