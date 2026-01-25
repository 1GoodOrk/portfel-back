export class UpdateDto {
  readonly _id: string;
  readonly projectId: string;
  readonly risksLean: any;
  readonly risksDigital: any;
  readonly risksClassic: any;
  readonly risksClassicTables: any;
  readonly recommendationDescription: string;
  readonly status: string;
  readonly approve: Array<any>;
}
