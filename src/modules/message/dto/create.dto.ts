import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly email: string;
  
  @IsNotEmpty()
  readonly status: string;
  
  @IsNotEmpty()
  readonly theme: string;

  @IsNotEmpty()
  readonly comment: string;
}
