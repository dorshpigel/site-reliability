import { ApiProperty } from '@nestjs/swagger/dist';

export class DomainRegistrar {
  @ApiProperty({ type: String })
  iana_id: string;
  @ApiProperty({ type: String })
  registrar_name: string;
  @ApiProperty({ type: String })
  whois_server: string;
  @ApiProperty({ type: String })
  website_url: string;
  @ApiProperty({ type: String })
  email_address: string;
  @ApiProperty({ type: String })
  phone_number: string;
}

export class ContactInformation {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  company: string;
  @ApiProperty({ type: String })
  street: string;
  @ApiProperty({ type: String })
  city: string;
  @ApiProperty({ type: String })
  state: string;
  @ApiProperty({ type: String })
  zip_code: string;
  @ApiProperty({ type: String })
  country_name: string;
  @ApiProperty({ type: String })
  country_code: string;
  @ApiProperty({ type: String })
  email_address: string;
  @ApiProperty({ type: String })
  phone: string;
  @ApiProperty({ type: String })
  fax: string;
}

export class WhoisData {
  @ApiProperty({ type: Boolean })
  status: boolean;
  @ApiProperty({ type: String })
  domain_name: string;
  @ApiProperty({ type: String })
  query_time: string;
  @ApiProperty({ type: String })
  whois_server: string;
  @ApiProperty({ type: String })
  domain_registered: string;
  @ApiProperty({ type: String })
  create_date: string;
  @ApiProperty({ type: String })
  update_date: string;
  @ApiProperty({ type: String })
  expiry_date: string;
  @ApiProperty({ type: DomainRegistrar })
  domain_registrar: DomainRegistrar;
  @ApiProperty({ type: ContactInformation })
  registrant_contact: ContactInformation;
  @ApiProperty({ type: ContactInformation })
  administrative_contact: ContactInformation;
  @ApiProperty({ type: ContactInformation })
  technical_contact: ContactInformation;
  @ApiProperty({ type: [String], isArray: true })
  name_servers: string[];
  @ApiProperty({ type: [String], isArray: true })
  domain_status: string[];
  @ApiProperty({ type: String })
  whois_raw_domain: string;
}

export class RegistryData {
  @ApiProperty({ type: String })
  domain_name: string;
  @ApiProperty({ type: String })
  query_time: string;
  @ApiProperty({ type: String })
  whois_server: string;
  @ApiProperty({ type: String })
  domain_registered: string;
  @ApiProperty({ type: DomainRegistrar })
  domain_registrar: DomainRegistrar;
  @ApiProperty({ type: [String], isArray: true })
  name_servers: string[];
  @ApiProperty({ type: [String], isArray: true })
  domain_status: string[];
  @ApiProperty({ type: String })
  whois_raw_registery: string;
}

export class WhoisInfo {
  @ApiProperty({ type: WhoisData })
  whois_data: WhoisData;
  @ApiProperty({ type: RegistryData })
  registry_data: RegistryData;
}
