import { ApiProperty } from '@nestjs/swagger/dist';
import { DomainResponse } from '../../database/dto/virustotalResponse.dto';
import { WhoisInfo } from 'src/database/dto/whoisResponse.dto';

export default class ProviderResponseDto {
  @ApiProperty({ type: Number })
  status: number;

  @ApiProperty({ type: DomainResponse || WhoisInfo })
  data: DomainResponse | WhoisInfo;
}
