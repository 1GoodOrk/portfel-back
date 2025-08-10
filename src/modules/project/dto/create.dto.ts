import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly subinfo: string;

  @IsNotEmpty()
  readonly budget: number;

  @IsNotEmpty()
  readonly duration: number;

  @IsNotEmpty()
  readonly road: number;

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
}
