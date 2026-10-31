export type ControlCategory = 'Administrative' | 'Technical' | 'Physical';

export interface SecurityControl {
  id: string;
  category: ControlCategory;
  title: string;
  description: string;
  implementationDetails: string;
  mappedThreats: string[];
  mitigationJustification: string;
  frameworkRef: string;
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ControlsService {
  private readonly controls: SecurityControl[] = [
    // ADMINISTRATIVE CONTROLS
    {
      id: 'CTRL-ADM-01',
      category: 'Administrative',
      title: 'Information Security Governance & Board Oversight Policy',
      description: 'Comprehensive information security charter establishing institutional governance, executive CISO accountability, and bi-annual audit mandates.',
      implementationDetails: 'Mandates quarterly security reviews with the Board Risk Committee, formal policy sign-offs, and alignment with ISO/IEC 27001:2022 and NIST CSF 2.0 GV.OC.',
      mappedThreats: ['Elevation of Privilege', 'Repudiation'],
      mitigationJustification: 'Ensures clear demarcation of responsibilities and eliminates organizational silos that allow privilege escalation or rogue insider behavior without executive visibility.',
      frameworkRef: 'NIST CSF 2.0: GV.OC-01 | ISO 27001: A.5.1'
    },
    {
      id: 'CTRL-ADM-02',
      category: 'Administrative',
      title: 'Continuous Security Awareness & Anti-Phishing Simulation Training',
      description: 'Role-specific security education and monthly simulated spear-phishing campaigns targeting all employees and contractors.',
      implementationDetails: 'Mandatory completion of secure coding (OWASP Top 10) for developers and social engineering response workshops for customer-facing banking agents.',
      mappedThreats: ['Spoofing', 'Elevation of Privilege'],
      mitigationJustification: 'Hardens human defense against credential theft, social engineering, and session hijacking targeting administrative portals.',
      frameworkRef: 'NIST CSF 2.0: PR.AT-01 | PCI-DSS 4.0: 12.6'
    },
    {
      id: 'CTRL-ADM-03',
      category: 'Administrative',
      title: 'Formal Computer Security Incident Response Plan (CSIRP)',
      description: 'Documented, tested triage and containment procedures defining escalation paths, forensic capture protocols, and statutory notification timelines.',
      implementationDetails: 'Includes playbooks for ransomware containment, API credential compromise, and regulatory data breach disclosure within 72 hours (GDPR/Central Bank SLA).',
      mappedThreats: ['Denial of Service', 'Information Disclosure'],
      mitigationJustification: 'Limits breach dwell time and guarantees standardized containment protocols during severe service denial or data exfiltration events.',
      frameworkRef: 'NIST CSF 2.0: RS.MA-01 | ISO 27001: A.5.24'
    },
    {
      id: 'CTRL-ADM-04',
      category: 'Administrative',
      title: 'Enterprise Risk Management & Vendor Due Diligence Framework',
      description: 'Third-party risk management (TPRM) policy governing external SaaS integrations, payment gateway partners, and cloud service providers.',
      implementationDetails: 'Requires SOC 2 Type II reports, continuous vendor security rating assessments, and mandatory contractual right-to-audit clauses.',
      mappedThreats: ['Tampering', 'Information Disclosure'],
      mitigationJustification: 'Mitigates supply chain injection vectors and data leaks stemming from third-party payment gateways and SDK vendors.',
      frameworkRef: 'NIST CSF 2.0: GV.SC-04 | PCI-DSS 4.0: 12.8'
    },
    {
      id: 'CTRL-ADM-05',
      category: 'Administrative',
      title: 'Corporate Acceptable Use Policy (AUP) & Clean Desk Standard',
      description: 'Mandatory policy regulating employee usage of corporate laptops, remote VPN access, password complexity, and data handling.',
      implementationDetails: 'Enforced via MDM profiles prohibiting external storage media (USB blocking) and clipboard synchronization across untrusted applications.',
      mappedThreats: ['Information Disclosure'],
      mitigationJustification: 'Prevents intentional or accidental local exfiltration of customer PII and internal API tokens onto unauthorized media.',
      frameworkRef: 'NIST CSF 2.0: PR.AA-01 | ISO 27001: A.8.1'
    },

    // TECHNICAL CONTROLS
    {
      id: 'CTRL-TEC-01',
      category: 'Technical',
      title: 'FIDO2 Hardware-Backed MFA & Adaptive Step-Up Authentication',
      description: 'Enforcement of phishing-resistant authentication (WebAuthn/FIDO2 YubiKeys) for all internal portals, and biometric step-up for mobile transactions.',
      implementationDetails: 'Integrates Okta with YubiKeys for administrative consoles and biometric Secure Enclave authorization for mobile fund transfers > $1,000.',
      mappedThreats: ['Spoofing', 'Elevation of Privilege'],
      mitigationJustification: 'Completely eliminates credential-replay and phishing attacks against core administrative tools and API endpoints.',
      frameworkRef: 'NIST CSF 2.0: PR.AA-03 | PCI-DSS 4.0: 8.3'
    },
    {
      id: 'CTRL-TEC-02',
      category: 'Technical',
      title: 'Granular Role-Based Access Control (RBAC) with Four-Eyes Principle',
      description: 'Least-privilege authorization architecture requiring dual-custody verification for high-risk operations.',
      implementationDetails: 'Enforces dual-sign-off in Nexor OpsCenter for credit limit adjustments, ledger overrides, and manual wire processing.',
      mappedThreats: ['Elevation of Privilege', 'Repudiation'],
      mitigationJustification: 'Prevents single-operator compromise or insider fraud from unilaterally approving illicit financial transfers.',
      frameworkRef: 'NIST CSF 2.0: PR.AA-05 | ISO 27001: A.9.4'
    },
    {
      id: 'CTRL-TEC-03',
      category: 'Technical',
      title: 'End-to-End Cryptography: TLS 1.3 in Transit & CloudHSM Envelope at Rest',
      description: 'Strict cryptographic protection across all communication channels and persistence layers.',
      implementationDetails: 'Enforces TLS 1.3 with Certificate Pinning on mobile apps; Aurora PostgreSQL and S3 utilize AWS CloudHSM AES-256 GCM envelope encryption.',
      mappedThreats: ['Tampering', 'Information Disclosure'],
      mitigationJustification: 'Guarantees confidentiality and payload integrity against Man-in-the-Middle network tampering and physical disk compromise.',
      frameworkRef: 'NIST CSF 2.0: PR.DS-01 | PCI-DSS 4.0: 3.4 & 4.1'
    },
    {
      id: 'CTRL-TEC-04',
      category: 'Technical',
      title: 'Cloudflare Edge WAF, DDoS Shield & Dynamic API Rate Limiting',
      description: 'Edge protection inspecting all ingress HTTP/HTTPS traffic to prevent volumetric, application-layer, and botnet assaults.',
      implementationDetails: 'Managed OWASP Core Rule Set, automated bot mitigation, and Redis token bucket limiting at 10 payment requests/min per device.',
      mappedThreats: ['Denial of Service', 'Spoofing'],
      mitigationJustification: 'Defends against distributed Layer-7 flooding and automated credential-stuffing bots targeting payment APIs.',
      frameworkRef: 'NIST CSF 2.0: PR.IR-01 | PCI-DSS 4.0: 6.4'
    },
    {
      id: 'CTRL-TEC-05',
      category: 'Technical',
      title: 'Centralized Immutable SIEM Audit Telemetry & WORM Logging',
      description: 'Streaming security logging architecture capturing all API gateway transactions, VPC flow logs, and privileged administrative access.',
      implementationDetails: 'Logs streamed via Amazon Kinesis to Splunk SIEM; stored with S3 Object Lock (WORM compliance) for 7-year regulatory retention.',
      mappedThreats: ['Repudiation', 'Information Disclosure'],
      mitigationJustification: 'Provides tamper-proof, non-repudiable audit evidence essential for post-incident digital forensics and regulatory compliance.',
      frameworkRef: 'NIST CSF 2.0: DE.AE-03 | ISO 27001: A.12.4'
    },
    {
      id: 'CTRL-TEC-06',
      category: 'Technical',
      title: 'Automated Multi-AZ Database Snapshot Replication & Disaster Recovery',
      description: 'Continuous transactional journaling with multi-region backup failover targeting RPO < 1 minute and RTO < 15 minutes.',
      implementationDetails: 'Automated Aurora Global Database replication to a secondary AWS region with monthly automated disaster recovery drills.',
      mappedThreats: ['Denial of Service'],
      mitigationJustification: 'Protects core banking ledger availability against infrastructure failures, data corruption, or regional AWS disruptions.',
      frameworkRef: 'NIST CSF 2.0: RC.RP-01 | ISO 27001: A.12.3'
    },

    // PHYSICAL CONTROLS
    {
      id: 'CTRL-PHY-01',
      category: 'Physical',
      title: 'Multi-Factor Biometric Access & Mantrap Entry to HQ Server Rooms',
      description: 'Physical perimeter defense restricting server rooms and network wiring closets at Nexor corporate offices.',
      implementationDetails: 'Dual-credential authentication requiring encrypted RFID smartcards plus fingerprint biometrics, controlled via mantrap airlocks.',
      mappedThreats: ['Tampering', 'Elevation of Privilege'],
      mitigationJustification: 'Stops unauthorized physical access to corporate network taps, internal switches, and administrator workstations.',
      frameworkRef: 'NIST CSF 2.0: PR.PS-01 | ISO 27001: A.11.1'
    },
    {
      id: 'CTRL-PHY-02',
      category: 'Physical',
      title: '24/7 Monitored CCTV Surveillance with 90-Day Retention',
      description: 'High-definition closed-circuit television coverage across all facility perimeters, entry gates, and secure development zones.',
      implementationDetails: 'Motion-activated AI camera feeds continuously monitored by SOC physical security officers with tamper alerts.',
      mappedThreats: ['Repudiation', 'Spoofing'],
      mitigationJustification: 'Provides verifiable visual evidence to dispute physical access claims and deter physical intrusion attempts.',
      frameworkRef: 'NIST CSF 2.0: DE.CM-02 | PCI-DSS 4.0: 9.1'
    },
    {
      id: 'CTRL-PHY-03',
      category: 'Physical',
      title: 'Automated Visitor Identity Management & Escort Protocol',
      description: 'Formal digital registration, government ID verification, and temporary badge provisioning for external visitors.',
      implementationDetails: 'Visitors must be accompanied by an authorized badge-holder at all times; unescorted visitor access immediately revokes badge.',
      mappedThreats: ['Information Disclosure'],
      mitigationJustification: 'Prevents shoulder surfing, rogue drop-box deployment, and social engineering in high-security corporate areas.',
      frameworkRef: 'NIST CSF 2.0: PR.PS-02 | ISO 27001: A.11.1'
    },
    {
      id: 'CTRL-PHY-04',
      category: 'Physical',
      title: 'Advanced Environmental Safeguards (Novec 1230 Fire Suppression & N+1 UPS)',
      description: 'Data center-grade environmental controls protecting corporate operations centers and communication hubs.',
      implementationDetails: 'Clean-agent gaseous fire extinguishing systems (Novec 1230) and redundant dual-diesel generators providing 72 hours of emergency power.',
      mappedThreats: ['Denial of Service'],
      mitigationJustification: 'Guarantees continuous uptime and equipment preservation in case of municipal power grid failures or environmental fires.',
      frameworkRef: 'NIST CSF 2.0: PR.PS-05 | ISO 27001: A.11.2'
    }
  ];

  getAllControls(): SecurityControl[] {
    return this.controls;
  }

  getControlsByCategory(category: ControlCategory): SecurityControl[] {
    return this.controls.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }
}
