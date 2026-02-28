import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('expertise')
export class ExpertiseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  type: string;

  @Column()
  email: Array<any>;

  @Column()
  generalExperts?: any;

  @Column()
  risksData: any;
  
  @Column()
  recommendationDescription: string;

  @Column()
  status: string;

  @Column()
  projectId: string;

  @Column()
  approve: Array<any>;
}
