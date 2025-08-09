import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

@Entity('porfolio')
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  img: string;

  @Column()
  des: string;

  @Column()
  projects: number;
  
  @OneToMany((type) => ProjectEntity, (article) => article.id)
  projectIds: Array<ProjectEntity>;

  @Column()
  subinfo: number;
  
  @Column()
  budget: number;
  
  @Column()
  duration: number;

  @Column()
  location: string;
  
  @Column()
  town: string;

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