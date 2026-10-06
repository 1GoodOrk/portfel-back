import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('projectMeliksetov')
export class ProjectMeliksetovEntity {
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
  code: any;

  @Column()
  analyze: any;

}
