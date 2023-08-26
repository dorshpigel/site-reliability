import { DomainResponse } from "./virustotalResponse.dto";
import { WhoisInfo } from "./whoisResponse.dto";

export default class InsertResultDto {
  url: string;
  updatedAt?: Date;
  whois_data: WhoisInfo;
  virustotal_data: DomainResponse;
}
