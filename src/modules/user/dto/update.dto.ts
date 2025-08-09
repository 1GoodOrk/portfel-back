export class UpdateDto {
  readonly _id: string;
  readonly email: string;
  readonly organization: string;
  readonly password: string;
  readonly projectIds: Array<string>;
  readonly portfoliosIds: Array<string>;
}
