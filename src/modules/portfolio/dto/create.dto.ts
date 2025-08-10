import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly img: string;

  @IsNotEmpty()
  readonly des: string;

  @IsNotEmpty()
  readonly projects: number;

  @IsNotEmpty()
  readonly projectIds: Array<string>;

  @IsNotEmpty()
  readonly subinfo: string;

  @IsNotEmpty()
  readonly budget: number;

  @IsNotEmpty()
  readonly duration: number;

  @IsNotEmpty()
  readonly location: string;
  readonly town?: string;

  @IsNotEmpty()
  readonly options: {
    eco: number;
    war: number;
    log: number;
    doc: number;
    struc: number;
  }
}
