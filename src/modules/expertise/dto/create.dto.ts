import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly email: Array<any>;

  @IsNotEmpty()
  readonly generalExperts?: any;
  
  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly risksData: any;

  @IsNotEmpty()
  readonly recommendationDescription: string;

  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  readonly approve: Array<any>;
}
