import {
  Entity,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('message')
export class MessageEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  email: string;
  
  @Column()
  status?: string;
  
  @Column()
  theme: string;

  @Column()
  comment: string;
}
