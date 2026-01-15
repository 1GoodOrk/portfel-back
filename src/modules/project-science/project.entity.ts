import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('projectScience')
export class ProjectScienceEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;
  
  @Column()
  subinfo: string;

  @Column()
  type: string;

  @Column()
  priority: number;

  @Column()
  des: string;

  @Column()
  responsibleName: string;

  @Column()
  responsibleSurname: string;

  @Column()
  responsibleLastname: string;

  @Column()
  managerName: string;

  @Column()
  managerSurname: string;

  @Column()
  managerLastname: string;

  @Column()
  responsibleOrganization: string;
  
  @Column()
  budget: number;

  @Column()
  budgetSource: string;

  @Column()
  volumeOfWork: number;

  @Column()
  forecastProjectTaskAmount: number;

  @Column()
  term: number;

  @Column()
  actionPlan: string;

  @Column()
  sphereOfAction: string;

  @Column()
  governmentSubsidies: string;

  @Column()
  numberOfOrderDocument: string;

  @Column()
  staff: string;

  @Column()
  technology: string;

  @Column()
  projectExpertiseIds?: Array<string>
}
