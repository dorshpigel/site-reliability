import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WhoisInfo } from '../dto/whoisResponse.dto';
import { DomainResponse } from '../dto/virustotalResponse.dto';

@Schema({
  timestamps: true,
})
export class Result {
  @Prop({ required: true, index: true, unique: true })
  url: string;

  @Prop()
  updatedAt: Date;

  @Prop({ type: 'object' })
  whois_data: WhoisInfo;

  @Prop({ type: 'object' })
  virustotal_data: DomainResponse;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
