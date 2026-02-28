export class UpdateDto {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly projectGoal: string;
  readonly projectProduct: string;
  readonly des: string;
  readonly priority: number;
  readonly responsibleName: string;
  readonly customer: string;
  readonly numberOfOrderDocument: string;
  readonly data: string;
  readonly staff: string;
  readonly projectExpertiseIds?: Array<string>
}
