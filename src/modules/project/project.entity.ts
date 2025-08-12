import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;
  
  @Column()
  subinfo: string;

  @Column()
  type: string;
  
  @Column()
  budget: number;

  @Column()
  budgetSource: number;

  @Column()
  profit: number;

  @Column()
  processDuration: number;
  
  @Column()
  road: number;

  @Column()
  traffic: number;

  @Column()
  distance: number;

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

  @Column()
  portfolioId: string;

  @Column()
  dateCreation: string;

  @Column()
  dateInitialization: string;

  @Column()
  permissionDuration: string;

  @Column()
  score: number;

  @Column()
  priority: number;

  @Column()
  optionEco: number;

  @Column()
  optionWar: number;

  @Column()
  optionLog: number;

  @Column()
  optionDoc: number;

  @Column()
  optionStruc: number;
}
