import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('enterpriseLog')
export class EnterpriseLogEntity {
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

  @Column()
  dateCreation: any;

  @Column()
  options: any;
}
