export type RoadmapPhase = 'Short-Term (0-6 Months)' | 'Medium-Term (6-12 Months)' | 'Long-Term (12-24 Months)';
export type RiskPriority = 'Critical' | 'High' | 'Medium';

export interface CIAResilienceImpact {
  confidentiality: string;
  integrity: string;
  availability: string;
  resilience: string;
}

export interface RoadmapInitiative {
  id: string;
  phase: RoadmapPhase;
  title: string;
  businessRiskPriority: RiskPriority;
  targetThreats: string[];
  nistGapsAddressed: string[];
  ciaImpact: CIAResilienceImpact;
  actionPlan: string[];
  estimatedEffort: string;
  owner: string;
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapService {
  private readonly roadmap: RoadmapInitiative[] = [
    // SHORT-TERM (0-6 MONTHS)
    {
      id: 'INIT-ST-01',
      phase: 'Short-Term (0-6 Months)',
      title: 'Zero-Trust Credential Hardening & FIDO2 YubiKey Rollout',
      businessRiskPriority: 'Critical',
      targetThreats: ['Spoofing', 'Elevation of Privilege'],
      nistGapsAddressed: ['PR.AA-01 (MFA Coverage Gap)', 'PR.AA-03 (Phishing-Resistant Auth Gap)'],
      ciaImpact: {
        confidentiality: 'Eliminates credential interception and session hijacking vectors across administrative and developer portals.',
        integrity: 'Guarantees that only cryptographically verified personnel can commit code or approve financial overrides.',
        availability: 'No direct availability impact; prevents malicious lockouts caused by compromised administrator credentials.',
        resilience: 'Dramatically reduces institutional exposure to automated credential stuffing and phishing-based takeover attacks.'
      },
      actionPlan: [
        'Procure and provision FIDO2 YubiKey 5C NFC hardware keys to 100% of engineering and operations personnel.',
        'Enforce mandatory biometric step-up authentication via Mobile Secure Enclave on fund transfers > $1,000.',
        'Deprecate SMS and standard TOTP authenticator app fallbacks for all privileged AWS/GitHub accounts.'
      ],
      estimatedEffort: '8 Weeks (Cross-functional IT & Security Operations)',
      owner: 'Chief Information Security Officer (CISO)'
    },
    {
      id: 'INIT-ST-02',
      phase: 'Short-Term (0-6 Months)',
      title: 'Automated Log Sanitization & Field-Level PII Tokenization',
      businessRiskPriority: 'High',
      targetThreats: ['Information Disclosure'],
      nistGapsAddressed: ['PR.DS-01 (Data-at-Rest Leakage)', 'DE.AE-03 (Log Sanitization Deficiencies)'],
      ciaImpact: {
        confidentiality: 'Guarantees that sensitive credit card PANs, CVVs, and e-KYC national ID numbers are never written into plaintext logs.',
        integrity: 'Prevents corrupt or fabricated logging data from polluting regulatory audit streams.',
        availability: 'Low latency overhead (< 2ms) via in-memory format-preserving tokenization.',
        resilience: 'Protects the bank against massive statutory fines under GDPR and Central Bank Data Protection acts.'
      },
      actionPlan: [
        'Deploy regex-based PII redaction filters across all Logstash/FluentBit ingestion daemons.',
        'Integrate AWS CloudHSM Format-Preserving Encryption (FPE) for cardholder data prior to Kafka streaming.',
        'Audit all Datadog and Splunk log indexes to purge legacy unmasked log entries.'
      ],
      estimatedEffort: '6 Weeks (Platform Engineering & Infosec)',
      owner: 'VP of Platform Engineering'
    },
    {
      id: 'INIT-ST-03',
      phase: 'Short-Term (0-6 Months)',
      title: 'Layer-7 Ingress Rate Limiting & Edge Anti-DDoS Hardening',
      businessRiskPriority: 'High',
      targetThreats: ['Denial of Service'],
      nistGapsAddressed: ['PR.IR-01 (Infrastructure Resilience)', 'DE.CM-01 (Network Ingress Monitoring)'],
      ciaImpact: {
        confidentiality: 'Neutral.',
        integrity: 'Prevents transaction racing and payload corruption during volumetric buffer overflows.',
        availability: 'Guarantees 99.99% payment switch API uptime during peak shopping and malicious bot surges.',
        resilience: 'Enables autonomous shedding of malicious traffic without impacting verified customer requests.'
      },
      actionPlan: [
        'Activate Cloudflare Enterprise WAF Bot Management and HTTP DDoS managed rulesets.',
        'Implement distributed token-bucket rate limiting (10 req/min/user) at AWS API Gateway.',
        'Configure AWS RDS Proxy connection pooling to absorb concurrent thread spikes.'
      ],
      estimatedEffort: '4 Weeks (DevOps & Site Reliability Engineering)',
      owner: 'Lead SRE & Edge Security Lead'
    },

    // MEDIUM-TERM (6-12 MONTHS)
    {
      id: 'INIT-MT-01',
      phase: 'Medium-Term (6-12 Months)',
      title: 'Dual-Custody Four-Eyes Enforcement in Back-Office OpsCenter',
      businessRiskPriority: 'Critical',
      targetThreats: ['Elevation of Privilege', 'Tampering', 'Repudiation'],
      nistGapsAddressed: ['PR.AA-05 (Separation of Duties)', 'GV.OC-01 (Internal Fraud Oversight)'],
      ciaImpact: {
        confidentiality: 'Restricts unilateral customer data inspection to authorized, audited audit workflows.',
        integrity: 'Guarantees that no single insider can fabricate ledger credits or alter loan approval balances.',
        availability: 'Streamlined asynchronous approval queues maintain business throughput with < 5 minute SLAs.',
        resilience: 'Constructs an airtight defense against rogue insider collusion and compromised operator tokens.'
      },
      actionPlan: [
        'Refactor OpsCenter backend microservices to enforce cryptographically signed peer sign-off for ledger updates.',
        'Implement immutable audit journaling in Amazon Aurora with AWS S3 Object Lock (WORM).',
        'Establish automated alerting for out-of-band administrative override attempts.'
      ],
      estimatedEffort: '16 Weeks (Core Banking Dev & Compliance)',
      owner: 'Head of Core Banking Engineering'
    },
    {
      id: 'INIT-MT-02',
      phase: 'Medium-Term (6-12 Months)',
      title: 'DevSecOps Pipeline Integration: SAST, DAST & Container Image Signing',
      businessRiskPriority: 'High',
      targetThreats: ['Tampering', 'Elevation of Privilege'],
      nistGapsAddressed: ['PR.PS-06 (Software Supply Chain Security)', 'ID.RA-03 (Vulnerability Prioritization)'],
      ciaImpact: {
        confidentiality: 'Prevents hardcoded API tokens and cryptographic private keys from leaking via public repositories.',
        integrity: 'Guarantees that only verified, vulnerability-scanned container images run in production EKS clusters.',
        availability: 'Minimizes zero-day production crashes caused by unvetted open-source library vulnerabilities.',
        resilience: 'Achieves continuous compliance readiness for ISO 27001 and PCI-DSS 4.0 audits.'
      },
      actionPlan: [
        'Integrate Snyk and Semgrep into GitHub Actions CI/CD to block pull requests with CVSS >= 7.0 vulnerabilities.',
        'Enforce Cosign container image signing and AWS ECR cryptographic provenance validation via Kyverno policies.',
        'Conduct bi-annual automated third-party dynamic penetration tests on mobile and web client endpoints.'
      ],
      estimatedEffort: '12 Weeks (DevOps & Application Security)',
      owner: 'Lead AppSec Engineer'
    },

    // LONG-TERM (12-24 MONTHS)
    {
      id: 'INIT-LT-01',
      phase: 'Long-Term (12-24 Months)',
      title: 'Active-Active Multi-Region Resilient Core Banking Architecture',
      businessRiskPriority: 'High',
      targetThreats: ['Denial of Service'],
      nistGapsAddressed: ['RC.RP-01 (Disaster Recovery Automation)', 'PR.IR-02 (System Redundancy)'],
      ciaImpact: {
        confidentiality: 'Maintains cross-region AES-256 envelope encryption across distributed Aurora replicas.',
        integrity: 'Ensures distributed consensus and eliminates split-brain ledger desynchronization risks.',
        availability: 'Achieves 99.999% availability with automated cross-region failover under 30 seconds.',
        resilience: 'Eliminates single-region AWS outage vulnerability, ensuring continuity during catastrophic regional events.'
      },
      actionPlan: [
        'Migrate from single-region Aurora PostgreSQL to Amazon Aurora Global Database with sub-second replication.',
        'Deploy AWS Route 53 Application Recovery Controller (ARC) for automated DNS traffic rerouting.',
        'Execute quarterly unannounced chaos engineering drills using AWS Fault Injection Simulator (FIS).'
      ],
      estimatedEffort: '24 Weeks (Cloud Architecture & Database Engineering)',
      owner: 'Chief Technology Officer (CTO)'
    },
    {
      id: 'INIT-LT-02',
      phase: 'Long-Term (12-24 Months)',
      title: 'AI-Powered Real-Time Autonomous Threat Hunting & SOAR Integration',
      businessRiskPriority: 'Medium',
      targetThreats: ['Spoofing', 'Elevation of Privilege', 'Information Disclosure'],
      nistGapsAddressed: ['DE.AE-02 (Automated Anomaly Detection)', 'RS.AN-01 (Incident Forensics)'],
      ciaImpact: {
        confidentiality: 'Identifies and terminates illicit data egress attempts within seconds of initiation.',
        integrity: 'Guarantees the integrity of automated forensic artifacts collected during security incident response.',
        availability: 'Prevents collateral system downtime through micro-targeted IP and session quarantining.',
        resilience: 'Transforms the bank from reactive alert triage to proactive, autonomous threat containment.'
      },
      actionPlan: [
        'Deploy AWS Security Lake paired with machine learning behavioral anomaly detection on VPC and API telemetry.',
        'Construct automated Security Orchestration, Automation, and Response (SOAR) playbooks in Cortex XSOAR.',
        'Automate immediate token revocation and host isolation upon detection of lateral movement signals.'
      ],
      estimatedEffort: '20 Weeks (SOC Lead & Machine Learning Engineers)',
      owner: 'SOC Manager & Lead Data Scientist'
    }
  ];

  getAllInitiatives(): RoadmapInitiative[] {
    return this.roadmap;
  }

  getInitiativesByPhase(phase: RoadmapPhase): RoadmapInitiative[] {
    return this.roadmap.filter((item) => item.phase.toLowerCase().includes(phase.toLowerCase()));
  }
}
