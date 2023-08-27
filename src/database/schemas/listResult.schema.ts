import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger/dist';

export enum Status {
  RUNNING = 'Running',
  DONE = 'Done',
  UNDONE = 'Undone',
}

@Schema({
  timestamps: true,
})
export class ListResult {
  @ApiProperty({ type: String })
  @Prop({ required: true, index: true, unique: true })
  url: string;

  @ApiProperty({ type: Date })
  @Prop()
  updatedAt: Date;

  @ApiProperty({ type: Status })
  @Prop()
  status: Status;
}

export const ListResultSchema = SchemaFactory.createForClass(ListResult);
