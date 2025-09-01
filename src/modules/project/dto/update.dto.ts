export class UpdateDto {
  readonly _id: string;
  readonly name: string;
  readonly subinfo: string;
  readonly type: string;
  readonly responsibleName: string;
  readonly responsibleSurname: string;
  readonly responsibleLastname: string;
  readonly responsibleOrganization: string;
  readonly budget: number;
  readonly budgetSource: string;
  readonly processDuration: number;  
  readonly profit: number;
  readonly traffic: number;
  readonly forecastProjectTaskAmount: number;
  readonly road: string;
  readonly distance: number;
  readonly mainRoad: boolean;
  readonly inTown: boolean;
  readonly town?: string;
  readonly addressStart: string;
  readonly addressEnd: string;
  readonly des: string;
  readonly img: string;
  readonly portfolioId?: {
    name: string;
    tier: string;
    _id: string;
  };
  readonly dateCreation: string;
  readonly dateInitialization: string;
  readonly permissionDuration: number;
  readonly score: number;
  readonly priority: number;
  readonly options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  };
}
