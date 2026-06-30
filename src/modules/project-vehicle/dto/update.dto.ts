export class UpdateDto {
  readonly _id: string;
  readonly name: string;
  readonly subinfo: string;
  readonly des: string;
  readonly img: string;
  readonly type: string;
  readonly responsibleName: string;
  readonly responsibleSurname: string;
  readonly responsibleLastname: string;
  readonly managerName: string;
  readonly managerSurname: string;
  readonly managerLastname: string;
  readonly responsibleOrganization: string;
  readonly volumeOfWork: number;
  readonly forecastProjectTaskAmount: number;
  readonly term: number;
  readonly actionPlan: string;
  readonly sphereOfAction: string;
  readonly portfolioId?: {
    name: string;
    tier: string;
    _id: string;
  };
  readonly budget: number;
  readonly budgetSource: string;
  readonly mainLosses: number;
  readonly actualCost: number;
  readonly additionalLosses: number;
  readonly passengerTraffic: number;
  readonly ticketPrice: number;
  readonly governmentSubsidies: number;
  readonly vehicle: string;
  readonly priority: number;
  readonly infrastructure: string;
  readonly staff: string;
  readonly technology: string;
  readonly options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
  readonly performanceIndex: number;
  readonly indexOfAssetsEmployed: number;
  readonly projectValuation: number;
  readonly riskScore: number;
}
