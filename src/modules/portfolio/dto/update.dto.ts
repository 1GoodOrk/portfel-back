export class UpdateDto {
  readonly _id: string;
  readonly name: string;
  readonly img: string;
  readonly des: string;
  readonly responsibleName: string;
  readonly responsibleSurname: string;
  readonly responsibleLastname: string;
  readonly responsibleOrganization: string;
  readonly projects: number;
  readonly projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  readonly subinfo: string;
  readonly budget: number;
  readonly profit: number;
  readonly location: string;
  readonly town?: string;
}
