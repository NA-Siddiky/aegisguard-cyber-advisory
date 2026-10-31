import { Injectable } from '@nestjs/common';

export interface ClientProfile {
  firmName: string;
  tagline: string;
  clientName: string;
  industry: string;
  size: string;
  coreOperations: string[];
  majorSystems: { name: string; description: string; tech: string }[];
  criticalProcesses: string[];
  crownJewels: { id: string; name: string; impact: string }[];
}

export interface AssetRegisterItem {
  id: string;
  name: string;
  description: string;
  owner: string;
  confidentiality: 'High' | 'Medium' | 'Low';
  integrity: 'High' | 'Medium' | 'Low';
  availability: 'High' | 'Medium' | 'Low';
  ciaRating: string;
}

@Injectable()
export class ProfileService {
  private readonly profile: ClientProfile = {
    firmName: 'AegisGuard Cyber Advisory',
    tagline: 'Securing Digital Trust, Engineering Cyber Resilience.',
    clientName: 'Nexor Financial Technologies Ltd. (Nexor Digital Bank)',
    industry: 'Financial Technology (FinTech) / Digital Challenger Banking',
    size: '480 Employees | 1.4 Million Active Retail Accounts | 32,000 SME Merchants',
    coreOperations: [
      'Retail Digital Banking & High-Yield Vaults',
      'Instant Payment Switching & Merchant Settlement',
      'Automated Micro-Lending & Real-Time Credit Underwriting',
      'Regulatory Clearing, AML Screening & Daily Statutory Reconciliation'
    ],
    majorSystems: [
      {
        name: 'Nexor Core Banking Engine (NCBE)',
        description: 'Distributed microservices orchestrating double-entry ledger journals and account balances.',
        tech: 'Go, Java Spring Boot, AWS EKS Multi-AZ'
      },
      {
        name: 'Omnichannel API Gateway & Edge',
        description: 'Client authentication, token issuance, rate-limiting, and request routing.',
        tech: 'Cloudflare Edge WAF, AWS API Gateway, Redis'
      },
      {
        name: 'Payment Switch & Card Processing Hub',
        description: 'PCI-DSS certified switch interfacing with VISA, Mastercard, SWIFT, and NPSB/RTGS.',
        tech: 'AWS CloudHSM, ISO 8583 protocol engine'
      },
      {
        name: 'Distributed Ledger & Storage Tier',
        description: 'ACID transactional persistence for customer balances and financial state.',
        tech: 'Amazon Aurora PostgreSQL Multi-Region, Amazon DynamoDB'
      },
      {
        name: 'Streaming Fraud Analytics Pipeline',
        description: 'Real-time event analysis and fraud scoring inference.',
        tech: 'Apache Kafka (Amazon MSK), Python FastAPI ML microservices'
      },
      {
        name: 'Nexor OpsCenter (Internal Administration)',
        description: 'Back-office operations console for compliance, KYC reviews, and customer dispute management.',
        tech: 'React, TypeScript, Okta SSO, AWS Bastion VPN'
      }
    ],
    criticalProcesses: [
      'Customer Digital Onboarding & e-KYC Verification',
      'Real-Time Transaction Authorization & Payment Clearing',
      'Automated Credit Scoring & Loan Disbursement',
      'Continuous Security Telemetry & Incident Containment'
    ],
    crownJewels: [
      {
        id: 'CJ-01',
        name: 'The Core Banking Double-Entry Financial Ledger',
        impact: 'Immutable record of financial balances. Corruption causes systemic insolvency and banking license revocation.'
      },
      {
        id: 'CJ-02',
        name: 'Hardware Security Module (HSM) Root Keys & Master PIN Keys',
        impact: 'Secures all payment card PIN blocks, tokenization vaults, and interbank transfer authorizations.'
      },
      {
        id: 'CJ-03',
        name: 'Customer PII, Biometric Vectors & e-KYC Identity Archives',
        impact: 'Exfiltration triggers catastrophic statutory GDPR/regulatory fines and permanent brand destruction.'
      },
      {
        id: 'CJ-04',
        name: 'Real-Time Payment Authorization & Switching Engine',
        impact: 'Prolonged outage halts retail commerce nationwide and violates mandatory Central Bank uptime SLAs.'
      }
    ]
  };

  private readonly assets: AssetRegisterItem[] = [
    {
      id: 'AST-01',
      name: 'Core Financial Ledger & Balance Database',
      description: 'Amazon Aurora PostgreSQL holding double-entry general ledger and balances.',
      owner: 'Chief Financial Officer (CFO) / Head of Core Banking',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'High',
      ciaRating: 'C=High, I=High, A=High'
    },
    {
      id: 'AST-02',
      name: 'Customer PII & e-KYC Biometric Vault',
      description: 'Encrypted S3 object storage containing identity cards and biometric vectors.',
      owner: 'Chief Compliance Officer (CCO) / Head of Operations',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'Medium',
      ciaRating: 'C=High, I=High, A=Med'
    },
    {
      id: 'AST-03',
      name: 'CloudHSM Cryptographic Root Keys & PIN Blocks',
      description: 'FIPS 140-2 Level 3 hardware security module keys and tokenization vaults.',
      owner: 'Chief Information Security Officer (CISO)',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'High',
      ciaRating: 'C=High, I=High, A=High'
    },
    {
      id: 'AST-04',
      name: 'Payment Switching & Routing Hub',
      description: 'Real-time payment gateway switch orchestrating external card and clearinghouse connectivity.',
      owner: 'Chief Technology Officer (CTO) / VP of Engineering',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'High',
      ciaRating: 'C=High, I=High, A=High'
    },
    {
      id: 'AST-05',
      name: 'Proprietary Banking Source Code & CI/CD Pipelines',
      description: 'GitHub Enterprise repos, container registries, and automated deployment pipelines.',
      owner: 'VP of Engineering / Lead DevOps Architect',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'Medium',
      ciaRating: 'C=High, I=High, A=Med'
    },
    {
      id: 'AST-06',
      name: 'Real-Time Fraud Analytics & ML Scoring Engine',
      description: 'Kafka streaming data, models, and heuristics evaluating transaction risk.',
      owner: 'Chief Risk Officer (CRO) / Head of Fraud Analytics',
      confidentiality: 'Medium',
      integrity: 'High',
      availability: 'High',
      ciaRating: 'C=Med, I=High, A=High'
    },
    {
      id: 'AST-07',
      name: 'Omnichannel Mobile & Web API Gateway',
      description: 'Public-facing REST and GraphQL gateway endpoints orchestrating user sessions.',
      owner: 'Head of Digital Banking / Principal Architect',
      confidentiality: 'Medium',
      integrity: 'High',
      availability: 'High',
      ciaRating: 'C=Med, I=High, A=High'
    },
    {
      id: 'AST-08',
      name: 'AWS Cloud Infrastructure & IAM Access Control',
      description: 'AWS Organizations, IAM role policies, Terraform states, and EKS control plane.',
      owner: 'Head of Cloud Infrastructure / CISO',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'High',
      ciaRating: 'C=High, I=High, A=High'
    },
    {
      id: 'AST-09',
      name: 'Security Audit Logs & SIEM Telemetry Data',
      description: 'Centralized append-only security logs, AWS CloudTrail, and Splunk indexers.',
      owner: 'Security Operations Center (SOC) Manager',
      confidentiality: 'High',
      integrity: 'High',
      availability: 'Medium',
      ciaRating: 'C=High, I=High, A=Med'
    },
    {
      id: 'AST-10',
      name: 'Executive & Corporate Communications Suite',
      description: 'Google Workspace containing executive emails, board decks, and financial audits.',
      owner: 'General Counsel / Chief Operating Officer (COO)',
      confidentiality: 'High',
      integrity: 'Medium',
      availability: 'Medium',
      ciaRating: 'C=High, I=Med, A=Med'
    }
  ];

  getProfile(): ClientProfile {
    return this.profile;
  }

  getAssets(): AssetRegisterItem[] {
    return this.assets;
  }
}
