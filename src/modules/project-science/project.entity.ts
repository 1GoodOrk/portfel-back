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
  type: string;

  @Column()
  projectGoal: string;

  @Column()
  projectProduct: string;

  @Column()
  des: string;

  @Column()
  priority: number;

  @Column()
  responsibleName: string;

  @Column()
  customer: string;

  @Column()
  numberOfOrderDocument: string;

  @Column()
  data: string;

  @Column()
  staff: string;

  @Column()
  projectExpertiseIds?: Array<string>
}
