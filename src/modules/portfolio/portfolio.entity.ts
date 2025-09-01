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
  responsibleName: string;

  @Column()
  responsibleSurname: string;

  @Column()
  responsibleLastname: string;

  @Column()
  responsibleOrganization: string;

  @Column()
  projects: number;
  
  @Column()
  projectIds: {
    tierI: Array<string>;
    tierII: Array<string>;
    tierIII: Array<string>;
  };
  // TODO: check if it is too many resources takes
  // @OneToMany((type) => ProjectEntity, (article) => article._id)
  // projectIds: Array<ProjectEntity>;

  @Column()
  subinfo: string;
  
  @Column()
  budget: number;

  @Column()
  profit: number;
  
  @Column()
  location: string;
  
  @Column()
  town?: string;
}