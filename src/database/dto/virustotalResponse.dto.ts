export class DNSRecord {
    type: string;
    value: string;
    ttl: number;
  }
  
  export class PopularityRank {
    timestamp: number;
    rank: number;
  }
  
  export class AnalysisResults {
    category: string;
    result: string;
    method: string;
    engine_name: string;
  }
  
  export class LastHttpsCertificate {
    public_key: {
      rsa: {
        key_size: number;
        modulus: string;
        exponent: string;
      };
      algorithm: string;
    };
    thumbprint_sha256: string;
    thumbprint: string;
    subject: {
      CN: string;
    };
    validity: {
      not_after: string;
      not_before: string;
    };
    version: string;
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
    cert_signature: {
      signature_algorithm: string;
      signature: string;
    };
    serial_number: string;
    issuer: {
      C: string;
      CN: string;
      O: string;
    };
    size: number;
  }
  
  export class TotalVotes {
    harmless: number;
    malicious: number;
  }
  
  export class DomainData {
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
    type: string;
    id: string;
    links: {
      self: string;
    };
  }
  
  export class DomainResponse {
    data: DomainData;
  }
  