import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly email: string;
  
  @IsNotEmpty()
  readonly risksLean: any;
  
  @IsNotEmpty()
  readonly risksDigital: any;

  @IsNotEmpty()
  readonly risksClassic: any;

  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  readonly approve: Array<any>;
}
