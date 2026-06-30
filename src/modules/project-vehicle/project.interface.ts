export interface ProjectVehicleData {
  _id: string;
  name: string;
  subinfo: string;
  des: string;
  img: string;
  type: string;
  priority: number;
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
  mainLosses: number;
  actualCost: number;
  additionalLosses: number;
  passengerTraffic: number;
  ticketPrice: number;
  governmentSubsidies: number;
  vehicle: string;
  infrastructure: string;
  staff: string;
  technology: string;
  options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
  performanceIndex: number;
  indexOfAssetsEmployed: number;
  projectValuation: number;
  riskScore: number;
}

export interface ProjectVehicleRO {
  data: ProjectVehicleData;
}
