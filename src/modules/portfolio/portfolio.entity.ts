import {
  Entity,
  ObjectIdColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

@Entity('porfolio')
export class PortfolioEntity {
  @ObjectIdColumn()
  _id: string;
  
  @Column()
  name: string;
  
  @Column()
  img: string;

  @Column()
  des: string;

  @Column()
  projects: number;
  
  @Column()
  projectIds: Array<string>;
  // TODO: check if it is too many resources takes
  // @OneToMany((type) => ProjectEntity, (article) => article._id)
  // projectIds: Array<ProjectEntity>;

  @Column()
  subinfo: string;
  
  @Column()
  budget: number;
  
  @Column()
  duration: number;

  @Column()
  location: string;
  
  @Column()
  town?: string;

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