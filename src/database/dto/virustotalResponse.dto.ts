import { ApiProperty } from '@nestjs/swagger/dist';
//need to redo some classes and swagger
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

export class RSA {
  key_size: number;
  @ApiProperty({ type: String })
  modulus: string;
  @ApiProperty({ type: String })
  exponent: string;
}

export class PublicKey {
  @ApiProperty({ type: RSA })
  rsa: RSA;
  @ApiProperty({ type: String })
  algorithm: string;
}

export class Subject {
  @ApiProperty({ type: String })
  CN: string;
}

export class Validity {
  @ApiProperty({ type: String })
  not_after: string;
  @ApiProperty({ type: String })
  not_before: string;
}

export class AuthKeyIdentifier {
  @ApiProperty({ type: String })
  keyid: string;
}

export class Extensions {
  @ApiProperty({ type: [String],isArray: true })
  certificate_policies: string[];
  @ApiProperty({ type: [String],isArray: true })
  extended_key_usage: string[];
  @ApiProperty({ type: AuthKeyIdentifier })
  authority_key_identifier: AuthKeyIdentifier;
  @ApiProperty({ type: [String],isArray: true })
  subject_alternative_name: string[];
  @ApiProperty({ type: String })
  subject_key_identifier: string;
  @ApiProperty({ type: [String],isArray: true })
  crl_distribution_points: string[];
  @ApiProperty({ type: [String],isArray: true })
  key_usage: string[];
  [key: string]: any;
}

export class CertSignature {
  @ApiProperty({ type: String })
  signature_algorithm: string;
  @ApiProperty({ type: String })
  signature: string;
}

export class Issuer {
  @ApiProperty({ type: String })
  C: string;
  @ApiProperty({ type: String })
  CN: string;
  @ApiProperty({ type: String })
  O: string;
}

export class LastHttpsCertificate {
  @ApiProperty({ type: PublicKey })
  public_key: PublicKey;
  @ApiProperty({ type: String })
  thumbprint_sha256: string;
  @ApiProperty({ type: String })
  thumbprint: string;
  @ApiProperty({ type: Subject })
  subject: Subject;
  @ApiProperty({ type: Validity })
  validity: Validity;
  @ApiProperty({ type: String })
  version: string;
  @ApiProperty({ type: Extensions })
  extensions: Extensions;
  @ApiProperty({ type: CertSignature })
  cert_signature: CertSignature;
  @ApiProperty({ type: String })
  serial_number: string;
  @ApiProperty({ type: Issuer })
  issuer: Issuer;
  @ApiProperty({ type: Number })
  size: number;
}

export class TotalVotes {
  @ApiProperty({ type: Number })
  harmless: number;
  @ApiProperty({ type: Number })
  malicious: number;
}

export class LastAnalysisStats {
  @ApiProperty({ type: Number })
  harmless: number;
  @ApiProperty({ type: Number })
  malicious: number;
  @ApiProperty({ type: Number })
  suspicious: number;
  @ApiProperty({ type: Number })
  undetected: number;
  @ApiProperty({ type: Number })
  timeout: number;
}

export class Attributes {
  @ApiProperty({ type: DNSRecord,isArray:true })
  last_dns_records: DNSRecord[];
  @ApiProperty({ type: String })
  jarm: string;
  @ApiProperty({ type: String })
  whois: string;
  @ApiProperty({ type: Number })
  last_https_certificate_date: number;
  @ApiProperty({ type: String,isArray:true })
  tags: string[];
  @ApiProperty({ type: Object })
  popularity_ranks: Record<string, PopularityRank>;
  @ApiProperty({ type: Number })
  last_analysis_date: number;
  @ApiProperty({ type: Number })
  last_dns_records_date: number;
  @ApiProperty({ type: LastAnalysisStats })
  last_analysis_stats: LastAnalysisStats;
  @ApiProperty({ type: Number })
  creation_date: number;
  @ApiProperty({ type: Number })
  reputation: number;
  @ApiProperty({ type: String })
  registrar: string;
  last_analysis_results: Record<string, AnalysisResults>;
  @ApiProperty({ type: Number })
  last_update_date: number;
  @ApiProperty({ type: Number })
  last_modification_date: number;
  @ApiProperty({ type: String })
  tld: string;
  @ApiProperty({ type: LastHttpsCertificate })
  last_https_certificate: LastHttpsCertificate;
  @ApiProperty({ type: Object })
  categories: Record<string, string>;
  @ApiProperty({ type: TotalVotes })
  total_votes: TotalVotes;
  [key: string]: any;
}

export class Links {
  @ApiProperty({ type: String })
  self: string;
}

export class DomainData {
  @ApiProperty({ type: Attributes })
  attributes: Attributes;
  @ApiProperty({ type: String })
  type: string;
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: Links })
  links: Links;
}

export class DomainResponse {
  @ApiProperty({ type: DomainData })
  data: DomainData;
}
