import { IsNotEmpty } from 'class-validator';

export class CreateDto {

  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  readonly des: string;
  
  @IsNotEmpty()
  readonly subinfo: string;
  
  @IsNotEmpty()
  readonly priority: number;
  
  @IsNotEmpty()
  readonly responsibleName: string;
  
  @IsNotEmpty()
  readonly risksTableParams: any;

  @IsNotEmpty()
  readonly risks: any;
}
