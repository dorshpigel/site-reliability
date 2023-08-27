import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger/dist';
import { WhoisInfo } from '../dto/whoisResponse.dto';
import { DomainResponse } from '../dto/virustotalResponse.dto';

@Schema({
  timestamps: true,
})
export class Result {
  @ApiProperty({ type: String })
  @Prop({ required: true, index: true, unique: true })
  url: string;

  @ApiProperty({ type: Date })
  @Prop()
  updatedAt: Date;

  @ApiProperty({ type: WhoisInfo })
  @Prop({ type: 'object' })
  whois_data: WhoisInfo;

  @ApiProperty({ type: DomainResponse })
  @Prop({ type: 'object' })
  virustotal_data: DomainResponse;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
