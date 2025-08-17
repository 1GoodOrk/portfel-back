import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly subinfo: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly budget: number;

  @IsNotEmpty()
  readonly budgetSource: string;

  @IsNotEmpty()
  readonly processDuration: number;

  @IsNotEmpty()
  readonly profit: number;

  @IsNotEmpty()
  readonly traffic: number;

  @IsNotEmpty()
  readonly road: number;

  @IsNotEmpty()
  readonly distance: number;

  @IsNotEmpty()
  readonly mainRoad: boolean;

  @IsNotEmpty()
  readonly inTown: boolean;

  @IsNotEmpty()
  readonly town?: string;
  
  @IsNotEmpty()
  readonly addressStart: string;
  
  @IsNotEmpty()
  readonly addressEnd: string;
  
  @IsNotEmpty()
  readonly des: string;

  @IsNotEmpty()
  readonly img: string;

  @IsNotEmpty()
  readonly portfolioId?: {
    tier: number;
    _id: string;
  };

  @IsNotEmpty()
  readonly dateCreation: string;

  @IsNotEmpty()
  readonly dateInitialization: string;

  @IsNotEmpty()
  readonly permissionDuration: number;

  @IsNotEmpty()
  readonly score: number;

  @IsNotEmpty()
  readonly priority: number;

  @IsNotEmpty()
  readonly options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
}
