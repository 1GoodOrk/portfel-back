import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('projectTransport')
export class ProjectTransportEntity {
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
  stackholders: any;

  @Column()
  stackholderData: any;

  @Column()
  analyze: any;

  @Column()
  balance: any;
}
