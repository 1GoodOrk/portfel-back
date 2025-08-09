import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  subinfo: string;
  
  @Column()
  budget: number;
  
  @Column()
  duration: number;
  
  @Column()
  road: number;

  @Column()
  mainRoad: boolean;

  @Column()
  inTown: boolean;

  @Column()
  town: string;

  @Column()
  addressStart: string;

  @Column()
  addressEnd: string;

  @Column()
  des: string;

  @Column()
  img: string;
}
