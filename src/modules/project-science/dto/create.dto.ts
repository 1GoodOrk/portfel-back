import { IsNotEmpty } from 'class-validator';

export class CreateDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly projectGoal: string;

  @IsNotEmpty()
  readonly projectProduct: string;

  @IsNotEmpty()
  readonly des: string;

  @IsNotEmpty()
  readonly priority: number;

  @IsNotEmpty()
  readonly responsibleName: string;

  @IsNotEmpty()
  readonly customer: string;

  @IsNotEmpty()
  readonly numberOfOrderDocument: string;

  @IsNotEmpty()
  readonly data: string;

  @IsNotEmpty()
  readonly staff: string;
}
