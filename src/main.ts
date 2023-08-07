import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//https://developers.virustotal.com/reference/overview
//https://whoisfreaks.com/documentation/api/whois-api.html
//https://www.youtube.com/watch?v=gB6WLkSrtJk
//https://www.mongodb.com/try/download/community



//data example whois:
// {
//   "status": 200,
//   "data": {
//       "status": true,
//       "domain_name": "www.cnn.com",
//       "query_time": "2023-08-07 16:09:10",
//       "whois_server": "whois.verisign-grs.com",
//       "domain_registered": "yes",
//       "create_date": "1993-09-22",
//       "update_date": "2020-10-20",
//       "expiry_date": "2026-09-21",
//       "domain_registrar": {
//           "iana_id": "299",
//           "registrar_name": "CSC CORPORATE DOMAINS, INC.",
//           "whois_server": "whois.corporatedomains.com",
//           "website_url": "www.cscprotectsbrands.com",
//           "email_address": "domainabuse@cscglobal.com",
//           "phone_number": "+1.8887802723"
//       },
//       "registrant_contact": {
//           "name": "Domain Name Manager",
//           "company": "Turner Broadcasting System, Inc.",
//           "street": "One CNN Center",
//           "city": "Atlanta",
//           "state": "GA",
//           "zip_code": "30303",
//           "country_name": "United States",
//           "country_code": "US",
//           "email_address": "tmgroup@turner.com",
//           "phone": "+1.4048275000",
//           "fax": "+1.4048271995"
//       },
//       "administrative_contact": {
//           "name": "Domain Name Manager",
//           "company": "Turner Broadcasting System, Inc.",
//           "street": "One CNN Center",
//           "city": "Atlanta",
//           "state": "GA",
//           "zip_code": "30303",
//           "country_name": "United States",
//           "country_code": "US",
//           "email_address": "tmgroup@turner.com",
//           "phone": "+1.4048275000",
//           "fax": "+1.4048271995"
//       },
//       "technical_contact": {
//           "name": "TBS Server Operations",
//           "company": "Turner Broadcasting System, Inc.",
//           "street": "One CNN Center",
//           "city": "Atlanta",
//           "state": "GA",
//           "zip_code": "30303",
//           "country_name": "United States",
//           "country_code": "US",
//           "email_address": "hostmaster@turner.com",
//           "phone": "+1.4048275000",
//           "fax": "+1.4048271593"
//       },
//       "name_servers": [
//           "ns-1086.awsdns-07.org",
//           "ns-1630.awsdns-11.co.uk",
//           "ns-47.awsdns-05.com",
//           "ns-576.awsdns-08.net"
//       ],
//       "domain_status": [
//           "clientTransferProhibited",
//           "serverDeleteProhibited",
//           "serverTransferProhibited",
//           "serverUpdateProhibited"
//       ],
//       "whois_raw_domain": "\n\nDomain Name: cnn.com\nRegistry Domain ID: 3269879_DOMAIN_COM-VRSN\nRegistrar WHOIS Server: whois.corporatedomains.com\nRegistrar URL: www.cscprotectsbrands.com\nUpdated Date: 2020-10-20T13:09:44Z\nCreation Date: 1993-09-22T00:00:00.000-04:00\nRegistrar Registration Expiration Date: 2026-09-21T00:00:00.000-04:00\nRegistrar: CSC CORPORATE DOMAINS, INC.\nRegistrar IANA ID: 299\nRegistrar Abuse Contact Email: domainabuse@cscglobal.com\nRegistrar Abuse Contact Phone: +1.8887802723\nDomain Status: clientTransferProhibited http://www.icann.org/epp#clientTransferProhibited\nDomain Status: serverDeleteProhibited http://www.icann.org/epp#serverDeleteProhibited\nDomain Status: serverTransferProhibited http://www.icann.org/epp#serverTransferProhibited\nDomain Status: serverUpdateProhibited http://www.icann.org/epp#serverUpdateProhibited\nRegistry Registrant ID: \nRegistrant Name: Domain Name Manager\nRegistrant Organization: Turner Broadcasting System, Inc.\nRegistrant Street: One CNN Center\nRegistrant City: Atlanta\nRegistrant State/Province: GA\nRegistrant Postal Code: 30303\nRegistrant Country: US\nRegistrant Phone: +1.4048275000\nRegistrant Phone Ext: \nRegistrant Fax: +1.4048271995\nRegistrant Fax Ext: \nRegistrant Email: tmgroup@turner.com\nRegistry Admin ID: \nAdmin Name: Domain Name Manager\nAdmin Organization: Turner Broadcasting System, Inc.\nAdmin Street: One CNN Center\nAdmin City: Atlanta\nAdmin State/Province: GA\nAdmin Postal Code: 30303\nAdmin Country: US\nAdmin Phone: +1.4048275000\nAdmin Phone Ext: \nAdmin Fax: +1.4048271995\nAdmin Fax Ext: \nAdmin Email: tmgroup@turner.com\nRegistry Tech ID: \nTech Name: TBS Server Operations\nTech Organization: Turner Broadcasting System, Inc.\nTech Street: One CNN Center\nTech City: Atlanta\nTech State/Province: GA\nTech Postal Code: 30303\nTech Country: US\nTech Phone: +1.4048275000\nTech Phone Ext: \nTech Fax: +1.4048271593\nTech Fax Ext: \nTech Email: hostmaster@turner.com\nName Server: ns-1086.awsdns-07.org\nName Server: ns-1630.awsdns-11.co.uk\nName Server: ns-47.awsdns-05.com\nName Server: ns-576.awsdns-08.net\nDNSSEC: unsigned\n\nFor more information on Whois status codes, please visit https://icann.org/epp\n\nCorporation Service Company(c) (CSC)  The Trusted Partner of More than 50% of the 100 Best Global Brands.\n\nContact us to learn more about our enterprise solutions for Global Domain Name Registration and Management, Trademark Research and Watching, Brand, Logo and Auction Monitoring, as well SSL Certificate Services and DNS Hosting.\n\nNOTICE: You are not authorized to access or query our WHOIS database through the use of high-volume, automated, electronic processes or for the purpose or purposes of using the data in any manner that violates these terms of use. The Data in the CSC WHOIS database is provided by CSC for information purposes only, and to assist persons in obtaining information about or related to a domain name registration record. CSC does not guarantee its accuracy. By submitting a WHOIS query, you agree to abide by the following terms of use: you agree that you may use this Data only for lawful purposes and that under no circumstances will you use this Data to: (1) allow, enable, or otherwise support the transmission of mass unsolicited, commercial advertising or solicitations via direct mail, e-mail, telephone, or facsimile; or (2) enable high volume, automated, electronic processes that apply to CSC (or its computer systems). CSC reserves the right to terminate your access to the WHOIS database in its sole discretion for any violations by you of these terms of use. CSC reserves the right to modify these terms at any time.\n\nRegister your domain name at http://www.cscglobal.com",
//       "registry_data": {
//           "domain_name": "CNN.COM",
//           "query_time": "2023-08-07 16:09:10",
//           "whois_server": "whois.verisign-grs.com",
//           "domain_registered": "yes",
//           "domain_registrar": {
//               "iana_id": "299",
//               "registrar_name": "CSC Corporate Domains, Inc.",
//               "whois_server": "whois.corporatedomains.com",
//               "website_url": "http://cscdbs.com",
//               "email_address": "domainabuse@cscglobal.com",
//               "phone_number": "8887802723"
//           },
//           "name_servers": [
//               "ns-1086.awsdns-07.org",
//               "ns-1630.awsdns-11.co.uk",
//               "ns-47.awsdns-05.com",
//               "ns-576.awsdns-08.net"
//           ],
//           "domain_status": [
//               "clientTransferProhibited",
//               "serverDeleteProhibited",
//               "serverTransferProhibited",
//               "serverUpdateProhibited"
//           ],
//           "whois_raw_registery": "\n   Domain Name: CNN.COM\n   Registry Domain ID: 3269879_DOMAIN_COM-VRSN\n   Registrar WHOIS Server: whois.corporatedomains.com\n   Registrar URL: http://cscdbs.com\n   Updated Date: 2018-04-10T16:43:38Z\n   Creation Date: 1993-09-22T04:00:00Z\n   Registry Expiry Date: 2026-09-21T04:00:00Z\n   Registrar: CSC Corporate Domains, Inc.\n   Registrar IANA ID: 299\n   Registrar Abuse Contact Email: domainabuse@cscglobal.com\n   Registrar Abuse Contact Phone: 8887802723\n   Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\n   Domain Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited\n   Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited\n   Domain Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited\n   Name Server: NS-1086.AWSDNS-07.ORG\n   Name Server: NS-1630.AWSDNS-11.CO.UK\n   Name Server: NS-47.AWSDNS-05.COM\n   Name Server: NS-576.AWSDNS-08.NET\n   DNSSEC: unsigned\n   URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/\n>>> Last update of whois database: 2023-08-07T16:08:52Z <<<\n\nFor more information on Whois status codes, please visit https://icann.org/epp\n\nNOTICE: The expiration date displayed in this record is the date the\nregistrar's sponsorship of the domain name registration in the registry is\ncurrently set to expire. This date does not necessarily reflect the expiration\ndate of the domain name registrant's agreement with the sponsoring\nregistrar.  Users may consult the sponsoring registrar's Whois database to\nview the registrar's reported date of expiration for this registration.\n\nTERMS OF USE: You are not authorized to access or query our Whois\ndatabase through the use of electronic processes that are high-volume and\nautomated except as reasonably necessary to register domain names or\nmodify existing registrations; the Data in VeriSign Global Registry\nServices' (\"VeriSign\") Whois database is provided by VeriSign for\ninformation purposes only, and to assist persons in obtaining information\nabout or related to a domain name registration record. VeriSign does not\nguarantee its accuracy. By submitting a Whois query, you agree to abide\nby the following terms of use: You agree that you may use this Data only\nfor lawful purposes and that under no circumstances will you use this Data\nto: (1) allow, enable, or otherwise support the transmission of mass\nunsolicited, commercial advertising or solicitations via e-mail, telephone,\nor facsimile; or (2) enable high volume, automated, electronic processes\nthat apply to VeriSign (or its computer systems). The compilation,\nrepackaging, dissemination or other use of this Data is expressly\nprohibited without the prior written consent of VeriSign. You agree not to\nuse electronic processes that are automated and high-volume to access or\nquery the Whois database except as reasonably necessary to register\ndomain names or modify existing registrations. VeriSign reserves the right\nto restrict your access to the Whois database in its sole discretion to ensure\noperational stability.  VeriSign may restrict or terminate your access to the\nWhois database for failure to abide by these terms of use. VeriSign\nreserves the right to modify these terms at any time.\n\nThe Registry database contains ONLY .COM, .NET, .EDU domains and\nRegistrars."
//       }
//   }
// }
