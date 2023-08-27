import { ApiProperty } from '@nestjs/swagger/dist';

export class DNSRecord {
  @ApiProperty({ type: String })
  type: string;
  @ApiProperty({ type: String })
  value: string;
  @ApiProperty({ type: Number })
  ttl: number;
}

export class PopularityRank {
  @ApiProperty({ type: Number })
  timestamp: number;
  @ApiProperty({ type: Number })
  rank: number;
}

export class AnalysisResults {
  @ApiProperty({ type: String })
  category: string;
  @ApiProperty({ type: String })
  result: string;
  @ApiProperty({ type: String })
  method: string;
  @ApiProperty({ type: String })
  engine_name: string;
}

export class LastHttpsCertificate {
  @ApiProperty({ type: Object })
  public_key: {
    rsa: {
      key_size: number;
      modulus: string;
      exponent: string;
    };
    algorithm: string;
  };
  @ApiProperty({ type: String })
  thumbprint_sha256: string;
  @ApiProperty({ type: String })
  thumbprint: string;
  @ApiProperty({ type: Object })
  subject: {
    CN: string;
  };
  @ApiProperty({ type: Object })
  validity: {
    not_after: string;
    not_before: string;
  };
  @ApiProperty({ type: String })
  version: string;
  @ApiProperty({ type: Object })
  extensions: {
    certificate_policies: string[];
    extended_key_usage: string[];
    authority_key_identifier: {
      keyid: string;
    };
    subject_alternative_name: string[];
    subject_key_identifier: string;
    crl_distribution_points: string[];
    key_usage: string[];
    [key: string]: any;
  };
  @ApiProperty({ type: Object })
  cert_signature: {
    signature_algorithm: string;
    signature: string;
  };
  @ApiProperty({ type: String })
  serial_number: string;
  @ApiProperty({ type: Object })
  issuer: {
    C: string;
    CN: string;
    O: string;
  };
  @ApiProperty({ type: Number })
  size: number;
}

export class TotalVotes {
  @ApiProperty({ type: Number })
  harmless: number;
  @ApiProperty({ type: Number })
  malicious: number;
}

export class DomainData {
  @ApiProperty({ type: Object })
  attributes: {
    last_dns_records: DNSRecord[];
    jarm: string;
    whois: string;
    last_https_certificate_date: number;
    tags: string[];
    popularity_ranks: Record<string, PopularityRank>;
    last_analysis_date: number;
    last_dns_records_date: number;
    last_analysis_stats: {
      harmless: number;
      malicious: number;
      suspicious: number;
      undetected: number;
      timeout: number;
    };
    creation_date: number;
    reputation: number;
    registrar: string;
    last_analysis_results: Record<string, AnalysisResults>;
    last_update_date: number;
    last_modification_date: number;
    tld: string;
    last_https_certificate: LastHttpsCertificate;
    categories: Record<string, string>;
    total_votes: TotalVotes;
    [key: string]: any;
  };
  @ApiProperty({ type: String })
  type: string;
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: Object })
  links: {
    self: string;
  };
}

export class DomainResponse {
  @ApiProperty({ type: DomainData })
  data: DomainData;
}
