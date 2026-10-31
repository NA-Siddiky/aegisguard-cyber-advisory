import { Injectable } from '@nestjs/common';

export interface StrideThreat {
  category: 'Spoofing' | 'Tampering' | 'Repudiation' | 'Information Disclosure' | 'Denial of Service' | 'Elevation of Privilege';
  title: string;
  threatDescription: string;
  affectedComponent: string;
  severity: 'High' | 'Medium' | 'Low';
  initialMitigation: string;
  mtmtElement: string;
}

export interface DfdComponent {
  type: 'External Entity' | 'Process' | 'Data Store' | 'Data Flow' | 'Trust Boundary';
  id: string;
  name: string;
  description: string;
}

@Injectable()
export class ThreatsService {
  private readonly strideThreats: StrideThreat[] = [
    {
      category: 'Spoofing',
      title: 'API Token Forgery & Device Impersonation',
      threatDescription: 'An adversary intercepts or reconstructs an OAuth2/JWT bearer token or clones device fingerprints to impersonate an authorized customer and submit fraudulent payment authorizations.',
      affectedComponent: 'Omnichannel API Gateway (P-01)',
      severity: 'High',
      initialMitigation: 'Enforce mTLS with hardware-backed device keys (Secure Enclave / StrongBox Keystore), short-lived RS256 JWTs (5-min expiry), rotating refresh tokens, and DPoP (Demonstrating Proof-of-Possession).',
      mtmtElement: 'Process: Omnichannel API Gateway'
    },
    {
      category: 'Tampering',
      title: 'Transaction Parameter & In-Transit Payload Manipulation',
      threatDescription: 'An attacker alters the beneficiary account number or modifies the transfer amount in the HTTP payload between the client device and the backend API during network transit.',
      affectedComponent: 'Payment Authorization Engine (P-02) & Data Flow DF-01',
      severity: 'High',
      initialMitigation: 'Enforce strict TLS 1.3 with Certificate Pinning in mobile apps; enforce client-side HMAC-SHA256 request signing with hardware nonces; server-side re-validation of account limits and balance constraints.',
      mtmtElement: 'Data Flow: Mobile Payment Request (DF-01)'
    },
    {
      category: 'Repudiation',
      title: 'Disputed High-Value Fund Transfer without Non-Repudiation Proof',
      threatDescription: 'A compromised or malicious account holder executes a high-value wire transfer and later claims the transaction was unauthorized, exploiting weak audit logs that lack digital signatures.',
      affectedComponent: 'Core Banking Ledger Engine (P-04) & Audit Subsystem (D-01)',
      severity: 'Medium',
      initialMitigation: 'Enforce mandatory step-up biometric authentication (FIDO2/WebAuthn) for transfers > $1,000; cryptographically signed receipts; ingest logs into AWS CloudTrail and S3 Object Lock in WORM compliance mode.',
      mtmtElement: 'Process: Core Banking Ledger Engine'
    },
    {
      category: 'Information Disclosure',
      title: 'Leakage of Cardholder Data & Customer PII in Application Logs',
      threatDescription: 'Verbose microservice error handling or unmasked log streams write unencrypted Primary Account Numbers (PAN), CVVs, and national identity numbers into centralized log repositories.',
      affectedComponent: 'Application Logging Stream & S3 Data Vault (D-03, DF-04)',
      severity: 'High',
      initialMitigation: 'Format-Preserving Encryption (FPE) and field-level tokenization via AWS CloudHSM; automated CI/CD secret/PII scanning rules; regex sanitization in FluentBit agents; AWS KMS SSE-KMS envelope encryption.',
      mtmtElement: 'Data Store: Customer PII & e-KYC Vault (D-03)'
    },
    {
      category: 'Denial of Service',
      title: 'Distributed Layer-7 API Flood & Database Connection Pool Exhaustion',
      threatDescription: 'An adversary uses botnets to flood the /api/v1/payments/transfer endpoint with malformed requests, saturating API gateway worker threads and causing database connection starvation for legitimate customers.',
      affectedComponent: 'API Gateway (P-01) & Core Ledger DB (D-01)',
      severity: 'High',
      initialMitigation: 'Cloudflare Magic Transit & Edge WAF managed Layer-7 DDoS rulesets; token-bucket rate limiting (10 req/min/user); AWS RDS Proxy connection pooling; asynchronous Kafka queuing.',
      mtmtElement: 'Process: Omnichannel API Gateway (P-01)'
    },
    {
      category: 'Elevation of Privilege',
      title: 'Broken Object-Level Authorization (BOLA/IDOR) in Back-Office Portal',
      threatDescription: 'A Tier-1 Customer Support agent tampers with HTTP request parameters in the OpsCenter console (/api/admin/accounts/{id}/override) to grant themselves super-admin privileges or bypass credit limits.',
      affectedComponent: 'Nexor OpsCenter (Internal Admin Suite) & IAM Mapping (P-02)',
      severity: 'High',
      initialMitigation: 'Strict server-side Attribute-Based Access Control (ABAC); Four-Eyes Principle (dual-custody sign-off) for financial overrides; hardware-token MFA (FIDO2 YubiKey) and isolated VPN access.',
      mtmtElement: 'Process: Nexor OpsCenter & IAM Mapping'
    }
  ];

  private readonly dfdElements: DfdComponent[] = [
    { type: 'External Entity', id: 'E-01', name: 'Mobile Banking Customer', description: 'iOS/Android client initiating fund transfers and submitting biometric credentials.' },
    { type: 'External Entity', id: 'E-02', name: 'External Payment Clearinghouse', description: 'VISA, Mastercard, SWIFT, and Central Bank NPSB/RTGS clearing systems.' },
    { type: 'Process', id: 'P-01', name: 'Omnichannel API Gateway', description: 'Edge reverse proxy enforcing rate limiting, header inspection, and JWT/OAuth2 verification.' },
    { type: 'Process', id: 'P-02', name: 'Payment Authorization Engine', description: 'Evaluates spending limits, business policies, and orchestrates transaction execution.' },
    { type: 'Process', id: 'P-03', name: 'Kafka Fraud Analytics Engine', description: 'Ingests transaction event streams to compute real-time ML risk scores.' },
    { type: 'Process', id: 'P-04', name: 'Core Banking Ledger Engine', description: 'Executes double-entry balance updates with strict ACID transactional guarantees.' },
    { type: 'Data Store', id: 'D-01', name: 'Core Ledger Database', description: 'Amazon Aurora PostgreSQL Multi-AZ cluster storing immutable account balance states.' },
    { type: 'Data Store', id: 'D-02', name: 'AWS CloudHSM Key Vault', description: 'FIPS 140-2 Level 3 hardware security module securing PIN keys and tokenization secrets.' },
    { type: 'Data Store', id: 'D-03', name: 'Customer PII & e-KYC Vault', description: 'Encrypted S3 repository containing customer identification archives and biometric templates.' },
    { type: 'Trust Boundary', id: 'TB-01', name: 'Public Internet Boundary', description: 'Demarcates untrusted mobile devices and public internet from the Cloudflare edge.' },
    { type: 'Trust Boundary', id: 'TB-02', name: 'Cloud DMZ Perimeter', description: 'Separates public-facing edge gateways from private microservice pods inside AWS VPC.' },
    { type: 'Trust Boundary', id: 'TB-03', name: 'Private Mesh Boundary', description: 'Isolates general microservices from dedicated financial calculation engines via mTLS.' },
    { type: 'Trust Boundary', id: 'TB-04', name: 'Zero-Trust Storage Boundary', description: 'Encloses database and cryptographic tiers accessible solely via verified IAM roles.' }
  ];

  getThreats(): StrideThreat[] {
    return this.strideThreats;
  }

  getDfd(): DfdComponent[] {
    return this.dfdElements;
  }
}
