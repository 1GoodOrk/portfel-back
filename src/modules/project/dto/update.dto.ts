export class UpdateDto {
  readonly id: string;
  readonly name: string;
  readonly subinfo: string;
  readonly type: string;
  readonly budgetSource: number;
  readonly processDuration: number;
  readonly profit: number;
  readonly road: number;
  readonly distance: number;
  readonly mainRoad: boolean;
  readonly inTown: boolean;
  readonly town?: string;
  readonly addressStart: string;
  readonly addressEnd: string;
  readonly des: string;
  readonly img: string;
  readonly portfolioId: string;
  readonly dateCreation: string;
  readonly dateInitialization: string;
  readonly permissionDuration: string;
  readonly score: number;
  readonly priority: number;
  readonly options: {
    eco: number;
    war: number;
    log: number;
    doc: number;
    struc: number;
  };
}
