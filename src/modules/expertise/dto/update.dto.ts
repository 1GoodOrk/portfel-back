export class UpdateDto {
  readonly _id: string;
  readonly projectId: string;
  readonly email: Array<any>;
  readonly generalExperts?: any;
  readonly type: string;
  readonly risksData: any;
  readonly recommendationDescription: string;
  readonly status: string;
  readonly approve: Array<any>;
}
