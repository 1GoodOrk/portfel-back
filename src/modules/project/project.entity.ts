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
  responsibleName: string;

  @Column()
  responsibleSurname: string;

  @Column()
  responsibleLastname: string;

  @Column()
  managerName: string;

  @Column()
  managerSurname: string;

  @Column()
  managerLastname: string;

  @Column()
  responsibleOrganization: string;
  
  @Column()
  budget: number;

  @Column()
  budgetSource: string;

  @Column()
  profit: number;

  @Column()
  processDuration: number;
  
  @Column()
  road: string;

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
  forecastProjectTaskAmount: number;

  @Column()
  addressStart: string;

  @Column()
  addressEnd: string;

  @Column()
  des: string;

  @Column()
  img: string;

  @Column()
  portfolioId?: {
    name: string;
    tier: string;
    _id: string;
  };

  @Column()
  dateCreation: string;

  @Column()
  dateInitialization: string;

  @Column()
  permissionDuration: number;

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
  optionSoc: number;

  @Column()
  optionStruc: number;
}
