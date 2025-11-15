import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('projectVehicle')
export class ProjectVehicleEntity {
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
  forecastProjectTaskAmount: number;

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
  optionEco: number;

  @Column()
  optionWar: number;

  @Column()
  optionLog: number;

  @Column()
  optionSoc: number;

  @Column()
  optionStruc: number;

  @Column()
  volumeOfWork: number;

  @Column()
  term: number;

  @Column()
  actionPlan: string;

  @Column()
  sphereOfAction: string;

  @Column()
  mainLosses: number;

  @Column()
  actualCost: number;

  @Column()
  additionalLosses: number;

  @Column()
  passengerTraffic: number;

  @Column()
  ticketPrice: number;

  @Column()
  governmentSubsidies: number;

  @Column()
  vehicle: string;

  @Column()
  infrastructure: string;

  @Column()
  staff: string;

  @Column()
  technology: string;

  @Column()
  performanceIndex: number;

  @Column()
  indexOfAssetsEmployed: number;

  @Column()
  projectValuation: number;

  @Column()
  priority: number;

  @Column()
  riskScore: number;
}
