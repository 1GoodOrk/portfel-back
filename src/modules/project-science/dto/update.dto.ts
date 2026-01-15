export class UpdateDto {
  readonly _id: string;
  readonly name: string;
  readonly subinfo: string;
  readonly type: string;
  readonly priority: number;
  readonly des: string;
  readonly responsibleName: string;
  readonly responsibleSurname: string;
  readonly responsibleLastname: string;
  readonly managerName: string;
  readonly managerSurname: string;
  readonly managerLastname: string;
  readonly responsibleOrganization: string;
  readonly volumeOfWork: number;
  readonly forecastProjectTaskAmount: number;
  readonly term: number;
  readonly actionPlan: string;
  readonly sphereOfAction: string;
  readonly budget: number;
  readonly budgetSource: string;
  readonly governmentSubsidies: string;
  readonly numberOfOrderDocument: string;
  readonly staff: string;
  readonly technology: string;
  readonly projectExpertiseIds?: Array<string>
}
