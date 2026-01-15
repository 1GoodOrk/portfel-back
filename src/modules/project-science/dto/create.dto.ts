import { IsNotEmpty } from 'class-validator';

export class CreateDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly subinfo: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly priority: number;
  
  @IsNotEmpty()
  readonly des: string;
  
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
  readonly volumeOfWork: number;
  
  @IsNotEmpty()
  readonly forecastProjectTaskAmount: number;
  
  @IsNotEmpty()
  readonly term: number;
  
  @IsNotEmpty()
  readonly actionPlan: string;
  
  @IsNotEmpty()
  readonly sphereOfAction: string;
  
  @IsNotEmpty()
  readonly budget: number;
  
  @IsNotEmpty()
  readonly budgetSource: string;
  
  @IsNotEmpty()
  readonly governmentSubsidies: string;
  
  @IsNotEmpty()
  readonly numberOfOrderDocument: string;
  
  @IsNotEmpty()
  readonly staff: string;
  
  @IsNotEmpty()
  readonly technology: string;

  @IsNotEmpty()
  readonly projectExpertiseIds?: Array<string>
}
