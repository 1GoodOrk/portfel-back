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
  type: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column()
  portfolioIds: Array<string>;
  // TODO: check if it is too many resources takes
  // @OneToMany((type) => PortfolioEntity, (data) => data._id)
  // portfolioIds: Array<PortfolioEntity>;

  @Column()
  projectIds: Array<string>;
  // TODO: check if it is too many resources takes
  // @OneToMany((type) => ProjectEntity, (data) => data._id)
  // projectIds: Array<ProjectEntity>;
}
