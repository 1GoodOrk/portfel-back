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
  email: string;
  
  @Column()
  risksLean: any;
  
  @Column()
  risksDigital: any;

  @Column()
  risksClassic: any;
  
  @Column()
  risksClassicTables: any;
  
  @Column()
  recommendationDescription: string;

  @Column()
  status: string;

  @Column()
  projectId: string;

  @Column()
  approve: Array<any>;
}
