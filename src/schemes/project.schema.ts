import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  subinfo: string;

  @Prop({ type: Number, required: true })
  budget: number;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: Number, required: true })
  road: number;

  @Prop({ type: Boolean, required: true })
  mainRoad: boolean;

  @Prop({ type: Boolean, required: true })
  inTown: boolean;

  @Prop({ type: String, required: true })
  town: string;

  @Prop({ type: String, required: true })
  addressStart: string;

  @Prop({ type: String, required: true })
  addressEnd: string;

  @Prop({ type: String, required: true })
  des: string;

  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: true })
  portfolioId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
