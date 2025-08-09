import {
  Entity,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ProjectEntity } from '../project/project.entity';
import { PortfolioEntity } from '../portfolio/portfolio.entity';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  organization: string;

  @Column()
  token: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany((type) => PortfolioEntity, (data) => data.id)
  portfolioIds: Array<PortfolioEntity>;

  @OneToMany((type) => ProjectEntity, (data) => data.id)
  projectIds: Array<ProjectEntity>;
}
