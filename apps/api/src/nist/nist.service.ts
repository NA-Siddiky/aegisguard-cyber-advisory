import { Injectable } from '@nestjs/common';

export interface NistFunctionAssessment {
  functionCode: 'GV' | 'ID' | 'PR' | 'DE' | 'RS' | 'RC';
  functionName: string;
  description: string;
  score: number; // 1-5 scale
  currentPractices: string[];
  strengths: string[];
  weaknesses: string[];
  gaps: string[];
  justification: string;
}

@Injectable()
export class NistService {
  private readonly nistAssessment: NistFunctionAssessment[] = [
    {
      functionCode: 'GV',
      functionName: 'Govern',
      description: 'Establish and monitor the cybersecurity risk management strategy, expectations, and policy enforcement across Nexor Digital Bank.',
      score: 3.8,
      currentPractices: [
        'Board Risk Committee convenes quarterly to review high-level cybersecurity threat landscape.',
        'Formal CISO appointment with independent reporting line directly to the Chief Executive Officer.',
        'Enterprise risk register maintained in confluence with bi-annual regulatory compliance reviews.'
      ],
      strengths: [
        'Clear executive escalation matrix and established cybersecurity governance steering committee.',
        'Formal regulatory alignment with Central Bank Cyber Guidelines and ISO 27001 standards.'
      ],
      weaknesses: [
        'Third-party software supply chain risk management lacks continuous automated validation.',
        'Cyber risk appetite statements lack quantifiable financial exposure metrics (FAIR framework).'
      ],
      gaps: [
        'GV.SC-04: Third-party risk management not integrated into real-time CI/CD pipeline dependency vetting.',
        'GV.OC-02: Key performance and risk indicators (KPI/KRI) not updated dynamically via automated telemetry.'
      ],
      justification: 'Governance foundations are robust at executive tiers, but operational vendor risk vetting and real-time metric automation require reinforcement.'
    },
    {
      functionCode: 'ID',
      functionName: 'Identify',
      description: 'Understand the cybersecurity risk to systems, people, assets, data, and capabilities supporting core banking ledgers and payment switches.',
      score: 4.1,
      currentPractices: [
        'Information Asset Register maintained with explicit CIA Triad categorization across 10 core banking assets.',
        'Automated AWS Config discovery tracking cloud resources across production VPCs.',
        'Crown Jewels formally classified and mapped against data flows in MTMT.'
      ],
      strengths: [
        'High visibility into cloud-native AWS EKS workloads and microservice dependencies.',
        'Well-defined Crown Jewel prioritization focusing on core ledger database and CloudHSM keys.'
      ],
      weaknesses: [
        'Shadow IT discovery on remote engineering endpoints relies on periodic agent scans.',
        'Vulnerability prioritization still relies heavily on raw CVSS scores rather than exploit probability (EPSS).'
      ],
      gaps: [
        'ID.RA-03: Lack of real-time Threat Intelligence and EPSS scoring integrated into Jira issue pipelines.',
        'ID.AM-05: Ephemeral container microservice assets lack automated provenance tagging.'
      ],
      justification: 'Asset discovery and threat identification are mature, requiring only the integration of exploitability telemetry into threat prioritization.'
    },
    {
      functionCode: 'PR',
      functionName: 'Protect',
      description: 'Implement safeguards to prevent or contain the impact of potential cybersecurity events against critical financial systems.',
      score: 3.5,
      currentPractices: [
        'TLS 1.3 encryption with Certificate Pinning enforced on mobile banking applications.',
        'AWS CloudHSM FIPS 140-2 Level 3 cryptographic modules used for payment tokenization and PIN translation.',
        'Multi-factor authentication (MFA) enabled across corporate Google Workspace accounts.'
      ],
      strengths: [
        'Institutional-grade hardware cryptographic key isolation via CloudHSM.',
        'Zero-trust network segregation between public edge API gateways and private Aurora database subnets.'
      ],
      weaknesses: [
        'SMS and software TOTP still permitted as MFA fallbacks on administrative tools, exposing users to adversary-in-the-middle phishing.',
        'Unmasked cardholder data and PII occasionally detected in application debug log streams.'
      ],
      gaps: [
        'PR.AA-03: Absence of universal FIDO2/WebAuthn phishing-resistant hardware key enforcement for developers.',
        'PR.DS-01: In-transit PII logging lacks automated format-preserving tokenization at the application tier.'
      ],
      justification: 'Core network and cryptographic protections are formidable, but authentication hardening (FIDO2) and log sanitization present critical short-term priorities.'
    },
    {
      functionCode: 'DE',
      functionName: 'Detect',
      description: 'Discover and analyze cybersecurity attacks and compromises across the AWS cloud perimeter, APIs, and internal networks.',
      score: 3.2,
      currentPractices: [
        'Cloudflare Edge WAF actively logging Layer-7 HTTP requests and bot traffic.',
        'AWS CloudTrail, GuardDuty, and VPC Flow Logs streamed into a centralized Splunk SIEM cluster.',
        '24/7 Security Operations Center (SOC) monitoring tier-1 alerts.'
      ],
      strengths: [
        'Comprehensive log telemetry ingestion covering edge, cloud control plane, and database audit logs.',
        'Automated GuardDuty threat detection flagging anomalous IAM behavior.'
      ],
      weaknesses: [
        'High alert fatigue in SOC due to heuristic threshold alerts on payment microservices.',
        'Absence of user and entity behavior analytics (UEBA) on the internal Nexor OpsCenter portal.'
      ],
      gaps: [
        'DE.AE-02: Anomaly detection lacks machine learning baselining for internal employee administrative activity.',
        'DE.CM-03: Real-time detection of data exfiltration via encrypted channels lacks behavioral inspection.'
      ],
      justification: 'Telemetry collection is exhaustive, but analytical detection relies on brittle rule thresholds that induce false positives.'
    },
    {
      functionCode: 'RS',
      functionName: 'Respond',
      description: 'Take action regarding a detected cybersecurity incident to contain damage, mitigate impact, and communicate with stakeholders.',
      score: 3.4,
      currentPractices: [
        'Computer Security Incident Response Plan (CSIRP) documented and reviewed annually.',
        'Automated Slack/PagerDuty notification channels established for Severity-1 incidents.',
        'Dedicated retainer contract with a tier-1 external digital forensics and incident response (DFIR) firm.'
      ],
      strengths: [
        'Rapid incident escalation channels and clear roles defined in the CSIRP.',
        'Retainer with external forensic partners guarantees specialized on-site support within 4 hours.'
      ],
      weaknesses: [
        'Limited automated orchestration and response (SOAR) playbooks; isolation of infected nodes is manual.',
        'Tabletop simulation exercises have not included executive boardroom leadership or legal counsel.'
      ],
      gaps: [
        'RS.MA-02: Absence of automated quarantine workflows in Kubernetes pods upon detection of malicious outbound connections.',
        'RS.CO-03: Regulatory notification playbooks lack automated evidence packaging for Central Bank deadlines.'
      ],
      justification: 'Incident plans are sound on paper, but incident containment speed is slowed down by manual intervention in container orchestration.'
    },
    {
      functionCode: 'RC',
      functionName: 'Recover',
      description: 'Restore assets and operations that were impacted by a cybersecurity incident to normal business operations.',
      score: 3.9,
      currentPractices: [
        'Continuous automated database backups with Amazon Aurora point-in-time recovery (PITR) up to 35 days.',
        'Immutable infrastructure deployment: entire microservice stack deployed via Terraform and ArgoCD.',
        'Bi-annual disaster recovery (DR) failover drills conducted to alternate AWS Availability Zones.'
      ],
      strengths: [
        'Near-zero RPO for database transactions due to Aurora continuous storage journaling.',
        'Declarative GitOps repository allows rebuild of entire Kubernetes clusters within 30 minutes.'
      ],
      weaknesses: [
        'DR drills have only tested single-AZ failovers, not catastrophic multi-region AWS cloud outages.',
        'Business continuity plan (BCP) communication channels rely heavily on internal corporate Slack.'
      ],
      gaps: [
        'RC.RP-01: True active-active multi-region database failover not fully implemented.',
        'RC.CO-03: Out-of-band crisis communications infrastructure not decoupled from corporate cloud identity.'
      ],
      justification: 'Recovery capabilities are exceptional for localized infrastructure failures, with full active-active cross-region redundancy designated as a long-term goal.'
    }
  ];

  getAssessment(): NistFunctionAssessment[] {
    return this.nistAssessment;
  }
}
