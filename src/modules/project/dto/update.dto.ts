export class UpdateDto {
  readonly id: string;
  readonly name: string;
  readonly subinfo: string;
  readonly budget: number;
  readonly duration: number;
  readonly road: number;
  readonly mainRoad: boolean;
  readonly inTown: boolean;
  readonly town?: string;
  readonly addressStart: string;
  readonly addressEnd: string;
  readonly des: string;
  readonly img: string;
}
