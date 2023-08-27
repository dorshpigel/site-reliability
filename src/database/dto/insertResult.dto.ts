import { ApiProperty } from '@nestjs/swagger/dist';
import { DomainResponse } from './virustotalResponse.dto';
import { WhoisInfo } from './whoisResponse.dto';

export default class InsertResultDto {
  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: Date })
  updatedAt?: Date;

  @ApiProperty({ type: WhoisInfo })
  whois_data: WhoisInfo;

  @ApiProperty({ type: DomainResponse })
  virustotal_data: DomainResponse;
}
