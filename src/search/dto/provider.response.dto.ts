import { DomainResponse } from '../../database/dto/virustotalResponse.dto';
import { WhoisInfo } from 'src/database/dto/whoisResponse.dto';

export default class ProviderResponseDto {
  status: number;

  data: DomainResponse | WhoisInfo;
}
