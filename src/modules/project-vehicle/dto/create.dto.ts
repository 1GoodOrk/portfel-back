import { IsNotEmpty } from 'class-validator';

export class CreateDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly subinfo: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly responsibleName: string;

  @IsNotEmpty()
  readonly responsibleSurname: string;

  @IsNotEmpty()
  readonly responsibleLastname: string;

  @IsNotEmpty()
  readonly managerName: string;

  @IsNotEmpty()
  readonly managerSurname: string;

  @IsNotEmpty()
  readonly managerLastname: string;

  @IsNotEmpty()
  readonly responsibleOrganization: string;

  @IsNotEmpty()
  readonly budget: number;

  @IsNotEmpty()
  readonly budgetSource: string;

  @IsNotEmpty()
  readonly forecastProjectTaskAmount: number;
  
  @IsNotEmpty()
  readonly des: string;

  @IsNotEmpty()
  readonly img: string;

  @IsNotEmpty()
  readonly portfolioId?: {
    name: string;
    tier: string;
    _id: string;
  };

  @IsNotEmpty()
  readonly options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }

  @IsNotEmpty()
  volumeOfWork: number;

  @IsNotEmpty()
  term: number;

  @IsNotEmpty()
  actionPlan: string;

  @IsNotEmpty()
  sphereOfAction: string;

  @IsNotEmpty()
  mainLosses: number;

  @IsNotEmpty()
  actualCost: number;

  @IsNotEmpty()
  additionalLosses: number;

  @IsNotEmpty()
  passengerTraffic: number;

  @IsNotEmpty()
  ticketPrice: number;

  @IsNotEmpty()
  governmentSubsidies: number;

  @IsNotEmpty()
  vehicle: string;

  @IsNotEmpty()
  infrastructure: string;

  @IsNotEmpty()
  priority: number;
  
  @IsNotEmpty()
  staff: string;

  @IsNotEmpty()
  technology: string;

  @IsNotEmpty()
  performanceIndex: number;

  @IsNotEmpty()
  indexOfAssetsEmployed: number;

  @IsNotEmpty()
  projectValuation: number;

  @IsNotEmpty()
  riskScore: number;
}
