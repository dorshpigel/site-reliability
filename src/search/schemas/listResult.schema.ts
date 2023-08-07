import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Status {
  RUNNING = 'Running',
  DONE = 'Done',
  UNDONE = 'Undone',
}

@Schema({
  timestamps: true,
})
export class ListResult {
  @Prop({ required: true, index: true, unique: true })
  url: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  status: Status;
}

export const ListResultSchema = SchemaFactory.createForClass(ListResult);
