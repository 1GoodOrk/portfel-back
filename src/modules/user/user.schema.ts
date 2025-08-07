import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String, equired: true })
  email: string;

  @Prop({ type: String, required: true })
  organization: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ required: true, type: [String] })
  porfolioIds: Array<string>;

  @Prop({ required: true, type: [String] })
  projectIds: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
