export class UpdateDto {
  readonly _id: string;
  readonly name: string;
  readonly img: string;
  readonly des: string;
  readonly projects: number;
  readonly projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  readonly subinfo: string;
  readonly budget: number;
  readonly profit: number;
  readonly duration: number;
  readonly location: string;
  readonly town?: string;
  readonly options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
}
