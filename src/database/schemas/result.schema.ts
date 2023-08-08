import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Result {
  @Prop({ required: true, index: true, unique: true})
  url: string;

  @Prop()
  updatedAt: Date;

  @Prop({type:"object"})
  whois_data: {};

  @Prop({type:"object"})
  virustotal_data: {};
}

export const ResultSchema = SchemaFactory.createForClass(Result);
