import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('projectLogistic')
export class ProjectLogisticEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  des: string;

  @Column()
  subinfo: string;

  @Column()
  priority: number;

  @Column()
  responsibleName: string;

  @Column()
  managerName: string;

  @Column()
  responsibleOrganization: string;

  @Column()
  phases: any;

  @Column()
  stackholders: any;
}
