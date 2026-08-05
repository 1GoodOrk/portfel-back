import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('projectAuto')
export class ProjectAutoEntity {
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
  risksTableParams: any;

  @Column()
  risks: any;
}
