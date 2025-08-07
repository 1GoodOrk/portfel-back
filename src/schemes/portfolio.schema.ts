import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema()
export class Portfolio {
  @Prop({ required: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: true })
  des: string;

  @Prop({ type: Number, required: true })
  projects: number;

  @Prop({ type: [String], required: true })
  projectIds: Array<string>;

  @Prop({ type: String, required: true })
  subinfo: string;

  @Prop({ type: Number, required: true })
  budget: number;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({
    type: String,
    default: 'INSIDE',
    enum: ['INSIDE', 'OUTSIDE', 'COMPLEX'],
    required: true,
  })
  location: string;

  @Prop({ type: String, required: true })
  town: string;

  @Prop({
    required: true,
    type: {
      eco: { type: Number },
      war: { type: Number },
      log: { type: Number },
      soc: { type: Number },
      struc: { type: Number },
    },
  })
  options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  };
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
