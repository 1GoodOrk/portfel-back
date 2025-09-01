import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly img: string;

  @IsNotEmpty()
  readonly des: string;

  @IsNotEmpty()
  readonly responsibleName: string;

  @IsNotEmpty()
  readonly responsibleSurname: string;

  @IsNotEmpty()
  readonly responsibleLastname: string;

  @IsNotEmpty()
  readonly responsibleOrganization: string;

  @IsNotEmpty()
  readonly projects: number;

  @IsNotEmpty()
  readonly projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };

  @IsNotEmpty()
  readonly subinfo: string;

  @IsNotEmpty()
  readonly budget: number;

  @IsNotEmpty()
  readonly profit: number;

  @IsNotEmpty()
  readonly location: string;
  readonly town?: string;
}
