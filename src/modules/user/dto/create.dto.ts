import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly data: string;

  // @IsNotEmpty()
  // readonly email: string;

  // @IsNotEmpty()
  // readonly password: string;

  // @IsNotEmpty()
  // readonly type: string;

  // @IsNotEmpty()
  // readonly organization: string;
}
