# University of Dhaka
### Department of Management Information Systems
### Master of Professional Management Information Systems (MPMIS)
**Course:** MPMIS 516 – Information Systems Security  
**Assessment Task:** Information System Security Risk Assessment and Improvement Plan  
**Consultancy Practice:** AegisGuard Cyber Advisory  
**Client Organization:** Nexor Financial Technologies Ltd. ("Nexor Digital Bank")  
**Submission Format:** Google Sites website, supported by a responsive advisory portal  

> **Engagement status:** This is an academic case study. AegisGuard and Nexor Digital Bank are hypothetical; organization details and security practices below are scenario assumptions, not independently verified facts. The numeric NIST CSF discussion scores use an internal rubric and are not NIST Implementation Tiers, a certification, or an audit opinion. The conceptual DFD and manual STRIDE analysis are not Microsoft Threat Modeling Tool (MTMT) exports. Genuine MTMT source-model and generated-report evidence must be added by the assessment group before submission.

---

# Table of Contents
1. [Consultancy Firm Identity & Positioning](#1-consultancy-firm-identity--positioning)
2. [Part 1 – Organization Profile & Crown Jewels](#2-part-1--organization-profile--crown-jewels)
3. [Part 2 – Information Asset Identification & Asset Register](#3-part-2--information-asset-identification--asset-register)
4. [Part 3 – Threat Modelling (MTMT & STRIDE)](#4-part-3--threat-modelling-mtmt--stride)
5. [Part 4 – Security Assessment Using NIST CSF 2.0](#5-part-4--security-assessment-using-nist-csf-20)
6. [Part 5 – Information System Security Controls](#6-part-5--information-system-security-controls)
7. [Part 6 – Security Improvement Recommendations & Strategic Roadmap](#7-part-6--security-improvement-recommendations--strategic-roadmap)
8. [References](#8-references)

---

# 1. Consultancy Firm Identity & Positioning

### Firm Name: AegisGuard Cyber Advisory
**Tagline:** *Securing Digital Trust, Engineering Cyber Resilience.*

### About Us
**AegisGuard Cyber Advisory** is a hypothetical cybersecurity and risk advisory practice developed for this assessment. The case study applies risk analysis, threat modeling, and security-control design to a fictional cloud-native financial institution.

The proposed approach references the **NIST Cybersecurity Framework (CSF) 2.0**, **ISO/IEC 27001:2022**, and **PCI DSS 4.0**, alongside STRIDE threat analysis and least-privilege security design. These references are not claims of certification or compliance.

### Consultancy Services
1. **NIST CSF 2.0 Maturity & Gap Assessments**: Institutional audits across Govern, Identify, Protect, Detect, Respond, and Recover functions.
2. **Architectural Threat Modeling & STRIDE Analysis**: Microservice trust-boundary decomposition and threat elicitation for core banking channels.
3. **Information Asset Governance & CIA Classification**: Asset discovery, executive data ownership, and sensitivity scoring.
4. **Security Controls Engineering**: Formulation of administrative policies, technical control matrices, and physical safeguards.
5. **Multi-Year Improvement Roadmapping**: Risk-prioritized remediation strategies spanning short-term (0–6m), medium-term (6–12m), and long-term (12–24m) horizons.

---

# 2. Part 1 – Organization Profile & Crown Jewels

## 2.1 Organization Overview
* **Client Name:** Nexor Financial Technologies Ltd. (operating as **"Nexor Digital Bank"**)
* **Industry Sector:** Financial Technology (FinTech) / Digital Challenger Banking & Payments
* **Organizational Size:** 480 full-time employees (210 Software Engineers, DevOps, and SREs; 130 Risk, Compliance, and Fraud Operations Specialists; 140 Corporate and Customer Operations).
* **Customer Base:** 1.4 million active digital retail accounts and 32,000 small-and-medium enterprise (SME) merchants.

Nexor Digital Bank is a high-growth, cloud-native digital banking platform licensed to provide digital deposit accounts, peer-to-peer (P2P) transfers, instant merchant checkouts, and automated micro-lending. Operating as a branchless institution, Nexor relies entirely on cloud-native infrastructure to deliver high-availability, low-latency financial services across regional markets.

## 2.2 Core Business Operations
1. **Retail Digital Banking:** Multi-currency digital accounts, savings vaults, and virtual/physical debit card provisioning managed via mobile applications.
2. **Instant Payment Switching & Merchant Settlement:** High-throughput payment gateway processing QR-code merchant checkouts, ACH, and central bank RTGS clearing.
3. **Automated Micro-Lending & Credit Scoring:** Algorithmic credit underwriting evaluating real-time transaction telemetry to disburse credit facilities within seconds.
4. **Treasury Management & Compliance Operations:** Real-time Anti-Money Laundering (AML) transaction screening, fraud monitoring, and automated daily statutory reserve reconciliation.

## 2.3 Major Information Systems Architecture
* **Nexor Core Banking Engine (NCBE):** Distributed microservices running on **Amazon Elastic Kubernetes Service (AWS EKS)** across three Availability Zones. Built with Go and Java Spring Boot, NCBE manages double-entry ledgers and balances.
* **Omnichannel Mobile & Web Gateway:** Native mobile applications (iOS/Swift, Android/Kotlin) and customer web portal (React/TypeScript) terminating at a **Cloudflare Edge WAF/DDoS Shield** and routed into **AWS API Gateway**.
* **Payment Switch & Card Processing Hub:** PCI-DSS Level 1 certified gateway cluster interfacing with VISA, Mastercard, SWIFT, and regional clearing switches, backed by dedicated **AWS CloudHSM** for cryptographic PIN translation and tokenization.
* **Transactional Data Store:** Distributed databases utilizing **Amazon Aurora PostgreSQL** (multi-region read replicas with strict ACID compliance) and **Amazon DynamoDB** for low-latency session caching.
* **Streaming Fraud Detection Pipeline:** Real-time event bus built on **Apache Kafka (Amazon MSK)** streaming payment events into a low-latency machine learning fraud-scoring engine.
* **Nexor OpsCenter (Internal Administration):** Role-based web console used by compliance officers, support teams, and fraud investigators to review flagged transactions and e-KYC documents.

## 2.4 Critical Business Processes
* **Customer Digital Onboarding & e-KYC Verification:** Real-time facial biometric matching, document OCR, and national identity registry queries to validate identity in compliance with AML/CFT regulations.
* **Real-Time Transaction Authorization & Clearing:** Sub-second payment validation encompassing biometric authentication, fraud risk score calculation, ledger deduction, and payment switch settlement dispatch.
* **Continuous Credit Scoring & Loan Disbursement:** Event-driven ingestion of payment behaviors into automated credit models resulting in automated balance provisioning.
* **Continuous Security Telemetry & Incident Containment:** Streaming cloud audit trails (AWS CloudTrail), container runtime telemetry, and application access logs into a SIEM pipeline.

## 2.5 Identification of the Organization's "Crown Jewels"
In cybersecurity consulting, **"Crown Jewels"** represent the mission-critical information assets and operational engines whose compromise, exfiltration, or disruption would result in catastrophic financial loss, regulatory sanction, or existential brand failure.

AegisGuard has identified the following **four primary Crown Jewels** for Nexor Digital Bank:

1. **The Core Banking Double-Entry Financial Ledger (AST-01):**
   * *Scope:* Immutable general ledger, customer balance states, and journal entries.
   * *Impact of Compromise:* Any unauthorized tampering or integrity breach causes immediate balance distortion, systemic insolvency, and instant revocation of the bank's operational license by the Central Bank.
2. **CloudHSM Cryptographic Root Keys & Master PIN Keys (AST-03):**
   * *Scope:* FIPS 140-2 Level 3 Hardware Security Module root keys, Zone Master Keys (ZMK), and cardholder tokenization vaults.
   * *Impact of Compromise:* Invalidation of the bank's entire cryptographic trust boundary, enabling widespread fraudulent card creation, PIN decryption, and payment switch forgery.
3. **Customer PII, Biometric Vectors & e-KYC Identity Archives (AST-02):**
   * *Scope:* High-resolution national identity card scans, facial biometric templates, tax identification numbers, and contact archives.
   * *Impact of Compromise:* Large-scale data exfiltration triggers massive statutory penalties under GDPR and Central Bank Data Protection acts, catastrophic reputational damage, and widespread identity theft.
4. **Real-Time Payment Authorization & Switching Engine (AST-04):**
   * *Scope:* Microservice routing core responsible for executing real-time payments across card networks and clearinghouses.
   * *Impact of Compromise:* A prolonged availability outage (Denial of Service) halts nationwide retail commerce, violates statutory uptime SLAs (99.99%), and incurs punitive daily regulatory fines.

---

# 3. Part 2 – Information Asset Identification & Asset Register

The following Information Asset Register classifies the critical assets supporting Nexor Digital Bank, identifies executive asset ownership, and establishes security baselines according to the **Confidentiality, Integrity, and Availability (CIA) Triad**:

| Asset ID | Asset Name | Description & Technical Scope | Asset Owner | Confidentiality | Integrity | Availability | CIA Requirement |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **AST-01** | **Core Financial Ledger & Balance Database** | Amazon Aurora PostgreSQL database holding double-entry general ledger, customer balance states, and transaction histories. | Chief Financial Officer (CFO) / Head of Core Banking | **High** | **High** | **High** | **C=High, I=High, A=High** |
| **AST-02** | **Customer PII & e-KYC Biometric Vault** | Encrypted S3 object storage containing identity card scans, facial biometric feature vectors, and customer identity metadata. | Chief Compliance Officer (CCO) / Head of Operations | **High** | **High** | **Medium** | **C=High, I=High, A=Med** |
| **AST-03** | **CloudHSM Cryptographic Root Keys & PIN Blocks** | Hardware Security Module (HSM) root encryption keys, Zone Master Keys (ZMK), and cardholder tokenization vaults. | Chief Information Security Officer (CISO) | **High** | **High** | **High** | **C=High, I=High, A=High** |
| **AST-04** | **Payment Switching & Routing Hub** | Real-time payment gateway switch orchestrating external connectivity with VISA, Mastercard, and national clearing systems. | Chief Technology Officer (CTO) / VP of Engineering | **High** | **High** | **High** | **C=High, I=High, A=High** |
| **AST-05** | **Proprietary Banking Source Code & CI/CD Pipelines** | GitHub Enterprise repositories, build scripts, container images (ECR), and production deployment pipelines (GitHub Actions). | VP of Engineering / Lead DevOps Architect | **High** | **High** | **Medium** | **C=High, I=High, A=Med** |
| **AST-06** | **Real-Time Fraud Analytics & ML Scoring Engine** | Apache Kafka streaming data, inference models, and risk rules evaluating every payment transaction for fraudulent patterns. | Chief Risk Officer (CRO) / Head of Fraud Analytics | **Medium** | **High** | **High** | **C=Med, I=High, A=High** |
| **AST-07** | **Omnichannel Mobile & Web API Gateway** | Public-facing REST and GraphQL gateway endpoints orchestrating user authentication, session tokens, and request routing. | Head of Digital Banking / Principal Architect | **Medium** | **High** | **High** | **C=Med, I=High, A=High** |
| **AST-08** | **AWS Cloud Infrastructure & IAM Access Control** | AWS Organizations, IAM role policies, Terraform state files, and Kubernetes cluster control plane configurations. | Head of Cloud Infrastructure / CISO | **High** | **High** | **High** | **C=High, I=High, A=High** |
| **AST-09** | **Security Audit Logs & SIEM Telemetry Data** | Centralized, append-only security event logs, AWS CloudTrail, VPC Flow logs, and SIEM incident audit repositories. | Security Operations Center (SOC) Manager | **High** | **High** | **Medium** | **C=High, I=High, A=Med** |
| **AST-10** | **Executive & Corporate Communications Suite** | Google Workspace / Corporate Microsoft 365 containing executive emails, board decks, legal contracts, and financial audits. | General Counsel / Chief Operating Officer (COO) | **High** | **Medium** | **Medium** | **C=High, I=Med, A=Med** |

---

# 4. Part 3 – Threat Modelling (MTMT & STRIDE)

## 4.1 Step 1: System Modelling (Data Flow Diagram - DFD)
The following conceptual data-flow model decomposes the fictional bank’s primary transaction path: the **Mobile Banking App to Core Ledger Payment Pipeline**. It is structured to support recreation and validation in MTMT; no MTMT source file or export was supplied for this assessment.

```
TB-01 PUBLIC / UNTRUSTED INTERNET
  E-01 Mobile customer
       ── DF-01 HTTPS payment instruction ──>
TB-02 CLOUD EDGE / DMZ
  Cloudflare WAF → P-01 API gateway
       ── DF-02 authenticated request ──>
TB-03 PRIVATE AWS VPC
  P-02 Payment authorization engine
       ├── DF-03 ledger request ──> P-04 Core ledger engine ── DF-04 ──> D-01 Aurora ledger
       ├── DF-05 risk event ──────> P-03 Fraud analytics
       ├── DF-06 key operation ──> D-02 CloudHSM
       ├── DF-07 e-KYC access ───> D-03 Customer identity vault
       ├── DF-08 audit events ───> Security monitoring / immutable log store
       └── DF-09 clearing message <──> E-02 External payment network
  P-05 OpsCenter ── privileged, independently approved action ──> P-02
TB-04 DATA / CRYPTOGRAPHIC SERVICES
  D-01 Aurora ledger · D-02 CloudHSM · D-03 encrypted identity vault
```

> **Submission evidence outstanding:** Add a genuine screenshot of the reviewed model in Microsoft Threat Modeling Tool, together with the `.tm7` source file where permitted. The diagram above is a conceptual working model, not an MTMT screenshot.

### Decomposition Elements:
* **External Entities:** Mobile Customer (`E-01`), External Payment Clearinghouse (`E-02`).
* **Processes:** Omnichannel API Gateway (`P-01`), Payment Authorization Engine (`P-02`), Kafka Fraud Analytics Engine (`P-03`), Core Banking Ledger Engine (`P-04`), Nexor OpsCenter Admin Suite (`P-05`).
* **Data Stores:** Aurora PostgreSQL Core Ledger Database (`D-01`), AWS CloudHSM Key Vault (`D-02`), Customer PII & e-KYC S3 Vault (`D-03`).
* **Data Flows:** HTTPS Payment Instruction (`DF-01`), Authenticated API Request (`DF-02`), Ledger Request (`DF-03`), Ledger Commit (`DF-04`), Fraud Risk Event (`DF-05`), HSM Key Operation (`DF-06`), e-KYC Access (`DF-07`), Audit Events (`DF-08`), and Payment-Network Message (`DF-09`).
* **Trust Boundaries:** Untrusted Public Internet Boundary (`TB-01`), Cloud DMZ Perimeter Boundary (`TB-02`), Private Application VPC Boundary (`TB-03`), Storage & Cryptographic Isolation Boundary (`TB-04`).

---

## 4.2 Step 2 & 3: STRIDE Threat Identification & Initial Mitigation Matrix
Using **STRIDE** as a scenario-based threat-elicitation method, the following threats were identified and paired with proposed mitigations. The analysis has not yet been imported into or validated by MTMT.

| STRIDE Category | Threat Description | Affected Component | Severity | Initial Mitigation (Technical & Administrative Controls) |
| :--- | :--- | :--- | :---: | :--- |
| **Spoofing** | **API Token Forgery & Device Impersonation:** An adversary intercepts or reconstructs an OAuth2/JWT bearer token or clones device fingerprints to impersonate an authorized customer and submit fraudulent payment authorizations. | **Omnichannel API Gateway (P-01)** | **High** | • Enforce **mTLS (Mutual TLS)** with hardware-backed device keys stored in iOS Secure Enclave / Android StrongBox Keystore.<br>• Issue short-lived, cryptographically signed asymmetric **RS256/ES256 JWTs** (5-minute expiration) with rotating refresh tokens stored in Redis.<br>• Implement **DPoP (Demonstrating Proof-of-Possession)** to bind tokens cryptographically to the client device. |
| **Tampering** | **Transaction Parameter & In-Transit Payload Manipulation:** An attacker alters the beneficiary account number or modifies the transfer amount in the HTTP payload between the client device and the backend API during network transit. | **Payment Authorization Engine (P-02) & Data Flow DF-01** | **High** | • Enforce strict **TLS 1.3** transport security combined with **Certificate Pinning** within the native mobile binaries.<br>• Enforce client-side cryptographic request signing: each transfer request must include an **HMAC-SHA256 signature** generated using a hardware-derived secret, incorporating a cryptographic nonce and a 30-second timestamp window.<br>• Server-side re-validation of account limits and balance constraints prior to execution. |
| **Repudiation** | **Disputed High-Value Fund Transfer without Non-Repudiation Proof:** A compromised or malicious account holder executes a high-value wire transfer and later claims the transaction was unauthorized, exploiting weak audit logs that lack digital signatures. | **Core Banking Ledger Engine (P-04) & Audit Subsystem (D-01)** | **Medium** | • Enforce mandatory step-up **biometric authentication (FIDO2 / WebAuthn)** for transactions exceeding threshold values ($>\$1,000$).<br>• Generate an immutable, cryptographically hashed transaction receipt containing timestamp, device ID, IP, and biometric signature token.<br>• Ingest audit logs into **AWS CloudTrail and Amazon S3 Object Lock** running in Write-Once-Read-Many (WORM) compliance mode to prevent deletion or alteration. |
| **Information Disclosure** | **Leakage of Cardholder Data & Customer PII in Application Logs:** Verbose microservice error handling or unmasked log streams write unencrypted Primary Account Numbers (PAN), CVVs, and national identity numbers into centralized log repositories. | **Application Logging Stream & S3 Data Vault (D-03, DF-04)** | **High** | • Implement automated **Format-Preserving Encryption (FPE)** and field-level tokenization via AWS CloudHSM prior to application logging.<br>• Deploy automated pre-commit and CI/CD secret/PII scanning rules, alongside runtime regex filtering in Logstash/FluentBit agents to mask credit cards and national IDs (`************1234`).<br>• Enforce strict **AWS KMS SSE-KMS** envelope encryption at rest across all S3 buckets and RDS databases. |
| **Denial of Service (DoS)** | **Distributed Layer-7 API Flood & Database Connection Pool Exhaustion:** An adversary uses botnets to flood the `/api/v1/payments/transfer` endpoint with malformed requests, saturating API gateway worker threads and causing database connection starvation for legitimate customers. | **API Gateway (P-01) & Core Ledger DB (D-01)** | **High** | • Deploy **Cloudflare Magic Transit & Web Application Firewall (WAF)** with managed Layer-7 DDoS rulesets and automated behavioral rate limiting.<br>• Implement **Token Bucket Rate Limiting** at the API Gateway level (e.g., maximum 10 transfer requests/minute per authenticated user/IP).<br>• Implement connection pooling via **AWS RDS Proxy** and resilient circuit breakers (**Resilience4j**) with asynchronous Kafka job queuing to decouple API request ingestion from ledger database writes. |
| **Elevation of Privilege** | **Broken Object-Level Authorization (BOLA/IDOR) in Back-Office Portal:** A Tier-1 Customer Support agent tampers with HTTP request parameters in the OpsCenter console (`/api/admin/accounts/{id}/override`) to grant themselves super-admin privileges or bypass credit limits. | **Nexor OpsCenter (Internal Admin Suite) & IAM Mapping (P-02)** | **High** | • Enforce server-side **Attribute-Based Access Control (ABAC)** and fine-grained Role-Based Access Control (RBAC); never trust client-supplied privilege claims or role parameters.<br>• Mandate the **"Four-Eyes Principle" (Dual-Custody Authorization)**: Any administrative account modification or financial override requires cryptographic sign-off from two independent senior managers.<br>• Enforce hardware-token MFA (**FIDO2 YubiKey**) and restrict administrative console access to an isolated, zero-trust bastion VPN. |

> **Submission evidence outstanding:** Add a genuine screenshot of MTMT's generated threat analysis report after reviewing the model and resolving or documenting its findings. Do not label the manual matrix above as MTMT-generated output.

---

# 5. Part 4 – Security Assessment Using NIST CSF 2.0

AegisGuard performed a scenario-based discussion of the six **NIST Cybersecurity Framework (CSF) 2.0** functions. Practices attributed to Nexor are hypothetical assessment inputs and have not been independently verified.

Scores use an internal ordinal discussion scale from **1 (ad hoc)** to **5 (continuously improving)**. NIST CSF 2.0 does not prescribe these numeric scores; they are not NIST Implementation Tiers or evidence of certification. The six function scores average **3.65 / 5.00**.

## 5.1 Function Evaluations

### 1. Govern (GV) – Maturity Score: 3.8 / 5.0
* **Current Practices:** Board Risk Committee convenes quarterly to review cyber threat matrices; CISO reports directly to the CEO; enterprise risk register aligned with Central Bank guidelines.
* **Strengths:** Strong executive sponsorship; defined risk ownership across business lines.
* **Weaknesses:** Third-party vendor risk assessment is manual; lack of dynamic risk metric reporting.
* **Identified Gaps:** `GV.SC-04` (Third-party risk management not integrated into automated CI/CD pipeline dependency vetting); `GV.OC-02` (Cyber risk appetite metrics not dynamically driven by real-time telemetry).
* **Justification:** High governance maturity at executive tiers, but requires real-time operational integration.

### 2. Identify (ID) – Maturity Score: 4.1 / 5.0
* **Current Practices:** Information Asset Register maintained with explicit CIA classifications across 10 critical assets; automated AWS Config discovery of cloud resources; Crown Jewels cataloged.
* **Strengths:** Granular visibility into AWS cloud assets; clear Crown Jewel asset mapping.
* **Weaknesses:** Vulnerability scanning relies on raw CVSS scores rather than Exploit Prediction Scoring System (EPSS).
* **Identified Gaps:** `ID.RA-03` (Lack of real-time threat intelligence and EPSS scoring integrated into developer issue queues); `ID.AM-05` (Ephemeral Kubernetes container pods lack automated cryptographic provenance tagging).
* **Justification:** Asset identification is institutionalized; prioritization requires exploitability scoring.

### 3. Protect (PR) – Maturity Score: 3.5 / 5.0
* **Current Practices:** TLS 1.3 encryption with certificate pinning; AWS CloudHSM FIPS 140-2 Level 3 hardware security modules; multi-factor authentication (MFA) enabled across corporate accounts.
* **Strengths:** FIPS-validated cryptographic key isolation; zero-trust network segregation between edge and database.
* **Weaknesses:** SMS/TOTP fallbacks permitted for administrative accounts; unmasked PII occasionally found in debug logs.
* **Identified Gaps:** `PR.AA-03` (Absence of mandatory phishing-resistant FIDO2 hardware keys across 100% of engineering staff); `PR.DS-01` (In-transit application logging lacks automated format-preserving tokenization).
* **Justification:** Solid baseline protections, but vulnerable to advanced adversary-in-the-middle (AiTM) phishing.

### 4. Detect (DE) – Maturity Score: 3.2 / 5.0
* **Current Practices:** Cloudflare Edge WAF logs Layer-7 traffic; AWS CloudTrail, GuardDuty, and VPC Flow Logs ingested into Splunk SIEM; 24/7 SOC monitors tier-1 alerts.
* **Strengths:** Comprehensive log telemetry collection across edge, compute, and database tiers.
* **Weaknesses:** High alert fatigue due to static threshold alerts; lack of internal user behavior analytics (UEBA).
* **Identified Gaps:** `DE.AE-02` (Anomaly detection lacks ML baselines for internal administrative activity in OpsCenter); `DE.CM-03` (Real-time detection of data exfiltration via encrypted egress channels lacks behavioral inspection).
* **Justification:** Logging is exhaustive, but detection analytics are reactive rather than predictive.

### 5. Respond (RS) – Maturity Score: 3.4 / 5.0
* **Current Practices:** Computer Security Incident Response Plan (CSIRP) documented and reviewed annually; Slack/PagerDuty escalation channels established; external retainer with tier-1 DFIR firm.
* **Strengths:** Defined escalation workflows; rapid guaranteed access to forensic specialists within 4 hours.
* **Weaknesses:** Response execution is heavily manual; tabletop exercises exclude C-suite and legal counsel.
* **Identified Gaps:** `RS.MA-02` (Lack of automated container network quarantine playbooks upon anomalous outbound beaconing); `RS.CO-03` (Statutory 72-hour regulatory breach disclosure playbooks not automated).
* **Justification:** Incident response plans are comprehensive on paper, but containment speed is throttled by manual playbooks.

### 6. Recover (RC) – Maturity Score: 3.9 / 5.0
* **Current Practices:** Continuous automated database backups with Amazon Aurora Point-In-Time Recovery (PITR); declarative Terraform/GitOps infrastructure deployment; bi-annual AZ failover drills.
* **Strengths:** Sub-minute RPO for transactional data; declarative rebuild of Kubernetes clusters in < 30 minutes.
* **Weaknesses:** Disaster recovery testing is confined to single-AZ disruptions, not full multi-region AWS cloud outages.
* **Identified Gaps:** `RC.RP-01` (Active-active multi-region database failover not implemented); `RC.CO-03` (Crisis communications rely on corporate identity infrastructure rather than decoupled out-of-band channels).
* **Justification:** Localized infrastructure resilience is exceptional; multi-region cross-cloud redundancy is an ongoing priority.

## 5.2 Summary Scenario Scorecard

| NIST CSF 2.0 Function | Internal scenario score (1–5) | Primary remediation target |
| :--- | :---: | :--- |
| **Govern (GV)** | **3.8** | Automated software supply-chain vendor vetting |
| **Identify (ID)** | **4.1** | EPSS-driven vulnerability prioritization |
| **Protect (PR)** | **3.5** | Phishing-resistant MFA and PII log sanitization |
| **Detect (DE)** | **3.2** | Behavioral anomaly detection and UEBA |
| **Respond (RS)** | **3.4** | Automated container containment playbooks |
| **Recover (RC)** | **3.9** | Multi-region recovery and out-of-band crisis communications |
| **Overall scenario average** | **3.65 / 5.00** | **Illustrative only; validate against evidence** |

> The internal score is a prioritization aid for this case study, not a NIST-prescribed maturity rating or a substitute for assessing CSF outcomes against verified evidence.

---

# 6. Part 5 – Information System Security Controls

Based on the fictional bank’s scenario, Crown Jewels, scenario-based STRIDE analysis, and NIST CSF 2.0 outcome gaps, AegisGuard proposes a tripartite control baseline:

## 6.1 Administrative Controls
1. **Information Security Governance & Board Oversight Policy (CTRL-ADM-01):**
   * *Implementation:* Mandates quarterly security reviews with the Board Risk Committee, formal policy sign-offs, and compliance alignment with ISO 27001:2022 and NIST CSF 2.0 `GV.OC`.
   * *Mitigation Justification:* Eliminates organizational blind spots and ensures executive accountability for security investments.
2. **Continuous Security Awareness & Anti-Phishing Simulation Training (CTRL-ADM-02):**
   * *Implementation:* Role-specific security curriculum with monthly simulated spear-phishing campaigns targeting all employees and contractors, including OWASP Top 10 secure coding training for engineers.
   * *Mitigation Justification:* Neutralizes social engineering, credential theft, and spear-phishing targeting privileged back-office staff.
3. **Formal Computer Security Incident Response Plan (CSIRP) (CTRL-ADM-03):**
   * *Implementation:* Documented incident containment workflows, evidence preservation standards, and automated playbooks for statutory breach notification within 72 hours.
   * *Mitigation Justification:* Minimizes breach dwell time and guarantees institutional compliance during severe service denial or data leakage incidents.
4. **Enterprise Risk Management & Vendor Due Diligence Framework (CTRL-ADM-04):**
   * *Implementation:* Mandatory SOC 2 Type II review, contractual right-to-audit clauses, and continuous vendor security rating assessments for all third-party SaaS and payment partners.
   * *Mitigation Justification:* Secures the software supply chain against malicious SDK injections and partner data breaches.
5. **Corporate Acceptable Use Policy (AUP) & Clean Desk Standard (CTRL-ADM-05):**
   * *Implementation:* Enforced via Mobile Device Management (MDM) profiles blocking external USB mass storage and clipboard synchronization on corporate laptops.
   * *Mitigation Justification:* Prevents accidental or deliberate exfiltration of customer PII and API keys onto external media.

## 6.2 Technical Controls
1. **FIDO2 Hardware-Backed MFA & Adaptive Step-Up Authentication (CTRL-TEC-01):**
   * *Implementation:* Mandates FIDO2 YubiKey 5C NFC hardware tokens for all internal portal logins; mobile biometrics (Secure Enclave) for fund transfers > $1,000.
   * *Mitigation Justification:* Completely neutralizes credential stuffing, brute-force attacks, and adversary-in-the-middle phishing.
2. **Granular Role-Based Access Control (RBAC) with Four-Eyes Principle (CTRL-TEC-02):**
   * *Implementation:* Enforces dual-custody verification in OpsCenter: any administrative limit change or manual wire transfer requires independent cryptographic sign-off from two managers.
   * *Mitigation Justification:* Prevents rogue insiders or compromised operator accounts from unilaterally approving fraudulent financial transfers.

   | Role | Sensitive-data access | Initiate payment | Approve exception | IAM administration | Audit evidence |
   | :--- | :--- | :--- | :--- | :--- | :--- |
   | Customer | Own accounts only | Own transfers | — | — | Own activity |
   | Support agent | Assigned cases; masked | — | — | — | Assigned activity |
   | Fraud analyst | Risk cases; masked | — | Recommend hold | — | Case activity |
   | Payment maker | Assigned transaction | Payment exception | — | — | Own activity |
   | Payment checker | Minimum necessary | — | Independent co-approval | — | Approval trail |
   | Security administrator | No default access | — | — | Time-bound; peer-approved | Security logs |
   | Auditor | Approved read-only | — | — | — | Read-only evidence |
   | Workload identity | Service-scoped | Policy-bound API | No human approval | Workload identity only | Service telemetry |

   Access is deny-by-default and least-privilege. Enforce case and ownership scoping, separation of maker and checker identities, phishing-resistant MFA, just-in-time privileged elevation with expiry, periodic access recertification, and audited break-glass use. This is a proposed design, not a verified production access configuration.
3. **End-to-End Cryptography: TLS 1.3 in Transit & CloudHSM Envelope at Rest (CTRL-TEC-03):**
   * *Implementation:* Enforces TLS 1.3 with Certificate Pinning on mobile apps; Aurora PostgreSQL and S3 utilize AWS CloudHSM AES-256 GCM envelope encryption.
   * *Mitigation Justification:* Guarantees data confidentiality and payload integrity against network interception and physical disk compromise.
4. **Cloudflare Edge WAF, DDoS Shield & Dynamic API Rate Limiting (CTRL-TEC-04):**
   * *Implementation:* Managed OWASP Core Rule Set, automated bot mitigation, and Redis token bucket limiting at 10 payment requests/min per device.
   * *Mitigation Justification:* Prevents Layer-7 DDoS attacks and automated credential-stuffing bots from exhausting backend database connections.
5. **Centralized Immutable SIEM Audit Telemetry & WORM Logging (CTRL-TEC-05):**
   * *Implementation:* Streams all API gateway logs, VPC flow logs, and IAM activity into Splunk SIEM; stored with S3 Object Lock (WORM compliance) for 7 years.
   * *Mitigation Justification:* Provides tamper-proof, non-repudiable audit evidence essential for digital forensics and regulatory audits.
6. **Automated Multi-AZ Database Snapshot Replication & Disaster Recovery (CTRL-TEC-06):**
   * *Implementation:* Continuous transactional journaling with multi-region backup failover targeting RPO < 1 minute and RTO < 15 minutes.
   * *Mitigation Justification:* Protects core banking ledger availability against infrastructure failures, data corruption, or regional AWS disruptions.

## 6.3 Physical Controls
1. **Multi-Factor Biometric Access & Mantrap Entry to HQ Server Rooms (CTRL-PHY-01):**
   * *Implementation:* Dual-credential authentication requiring encrypted RFID smartcards plus fingerprint biometrics, controlled via mantrap airlocks.
   * *Mitigation Justification:* Stops unauthorized physical access to corporate network taps, internal switches, and administrator workstations.
2. **24/7 Monitored CCTV Surveillance with 90-Day Retention (CTRL-PHY-02):**
   * *Implementation:* High-definition CCTV coverage across facility perimeters, entry gates, and secure development zones, monitored 24/7 by SOC officers.
   * *Mitigation Justification:* Provides verifiable visual evidence to dispute physical access claims and deter physical intrusion attempts.
3. **Automated Visitor Identity Management & Escort Protocol (CTRL-PHY-03):**
   * *Implementation:* Formal digital registration, government ID verification, and temporary badge provisioning with mandatory escort policies.
   * *Mitigation Justification:* Prevents shoulder surfing, rogue drop-box deployment, and social engineering in corporate offices.
4. **Advanced Environmental Safeguards (Novec 1230 Fire Suppression & N+1 UPS) (CTRL-PHY-04):**
   * *Implementation:* Clean-agent gaseous fire extinguishing systems (Novec 1230) and redundant dual-diesel generators providing 72 hours of emergency power.
   * *Mitigation Justification:* Guarantees continuous uptime and equipment preservation in case of municipal power grid failures or environmental fires.

---

# 7. Part 6 – Security Improvement Recommendations & Strategic Roadmap

AegisGuard synthesized the scenario-based STRIDE analysis and NIST CSF 2.0 outcome discussion to develop a phased, risk-prioritized improvement roadmap for Nexor Digital Bank:

```
+---------------------------------------------------------------------------------------------------------+
|                               NEXOR DIGITAL BANK: STRATEGIC ROADMAP TIMELINE                            |
+=========================================================================================================+
| [0 - 6 Months: Short-Term Remediation]                                                                  |
|   • INIT-ST-01: Zero-Trust Credential Hardening & FIDO2 YubiKey Rollout (Critical | CISO)               |
|   • INIT-ST-02: Automated Log Sanitization & Field-Level PII Tokenization (High | VP Engineering)       |
|   • INIT-ST-03: Layer-7 Ingress Rate Limiting & Edge Anti-DDoS Hardening (High | Lead SRE)              |
+---------------------------------------------------------------------------------------------------------+
| [6 - 12 Months: Medium-Term Maturation]                                                                 |
|   • INIT-MT-01: Dual-Custody Four-Eyes Enforcement in Back-Office OpsCenter (Critical | Core Banking)   |
|   • INIT-MT-02: DevSecOps Pipeline Integration: SAST, DAST & Container Image Signing (High | AppSec)    |
+---------------------------------------------------------------------------------------------------------+
| [12 - 24 Months: Long-Term Architectural Resilience]                                                    |
|   • INIT-LT-01: Active-Active Multi-Region Resilient Core Banking Architecture (High | CTO)             |
|   • INIT-LT-02: AI-Powered Autonomous Threat Hunting & SOAR Integration (Medium | SOC Manager)          |
+---------------------------------------------------------------------------------------------------------+
```

## 7.1 Phased Strategic Initiatives

### Short-Term Initiatives (0–6 Months) – Immediate Risk Mitigation
1. **INIT-ST-01: Zero-Trust Credential Hardening & FIDO2 YubiKey Rollout**
   * *Business Risk Priority:* **Critical**
   * *Targeted STRIDE Threats:* Spoofing, Elevation of Privilege
   * *NIST Gaps Addressed:* `PR.AA-01`, `PR.AA-03`
   * *CIA Impact:* Eliminates credential interception (**Confidentiality**); ensures authorized code commits (**Integrity**); prevents administrative lockouts (**Availability**); establishes robust phishing resistance (**Resilience**).
   * *Action Plan:* Procure FIDO2 YubiKey 5C NFC hardware keys for 100% of staff; enforce mobile biometric step-up for transfers > $1,000; deprecate SMS OTP fallbacks.
   * *Owner:* Chief Information Security Officer (CISO) | *Effort:* 8 Weeks.

2. **INIT-ST-02: Automated Log Sanitization & Field-Level PII Tokenization**
   * *Business Risk Priority:* **High**
   * *Targeted STRIDE Threats:* Information Disclosure
   * *NIST Gaps Addressed:* `PR.DS-01`, `DE.AE-03`
   * *CIA Impact:* Eliminates PAN and national ID leakage in log repositories (**Confidentiality**); maintains audit record veracity (**Integrity**); negligible latency overhead (**Availability**); protects against statutory GDPR fines (**Resilience**).
   * *Action Plan:* Deploy regex PII redaction filters across Logstash/FluentBit; implement AWS CloudHSM Format-Preserving Encryption (FPE); purge legacy unmasked log indexes.
   * *Owner:* VP of Platform Engineering | *Effort:* 6 Weeks.

3. **INIT-ST-03: Layer-7 Ingress Rate Limiting & Edge Anti-DDoS Hardening**
   * *Business Risk Priority:* **High**
   * *Targeted STRIDE Threats:* Denial of Service
   * *NIST Gaps Addressed:* `PR.IR-01`, `DE.CM-01`
   * *CIA Impact:* Protects telemetry during flood attacks (**Confidentiality**); prevents transaction racing during buffer floods (**Integrity**); maintains 99.99% payment switch uptime (**Availability**); enables autonomous traffic shedding (**Resilience**).
   * *Action Plan:* Activate Cloudflare Enterprise Bot Management; configure distributed token-bucket rate limiting at AWS API Gateway; implement RDS Proxy connection pooling.
   * *Owner:* Lead SRE & Edge Security Lead | *Effort:* 4 Weeks.

### Medium-Term Initiatives (6–12 Months) – Posture Maturation
1. **INIT-MT-01: Dual-Custody Four-Eyes Enforcement in Back-Office OpsCenter**
   * *Business Risk Priority:* **Critical**
   * *Targeted STRIDE Threats:* Elevation of Privilege, Tampering, Repudiation
   * *NIST Gaps Addressed:* `PR.AA-05`, `GV.OC-01`
   * *CIA Impact:* Restricts unilateral customer data inspection (**Confidentiality**); guarantees no single insider can fabricate ledger credits (**Integrity**); maintains efficient queue SLAs (**Availability**); construct defense against insider collusion (**Resilience**).
   * *Action Plan:* Refactor OpsCenter backend microservices for cryptographic dual-authorization; enforce immutable audit journaling with AWS S3 Object Lock (WORM); alert on out-of-band administrative overrides.
   * *Owner:* Head of Core Banking Engineering | *Effort:* 16 Weeks.

2. **INIT-MT-02: DevSecOps Pipeline Integration: SAST, DAST & Container Image Signing**
   * *Business Risk Priority:* **High**
   * *Targeted STRIDE Threats:* Tampering, Elevation of Privilege
   * *NIST Gaps Addressed:* `PR.PS-06`, `ID.RA-03`
   * *CIA Impact:* Prevents hardcoded secret leakage in repositories (**Confidentiality**); ensures only vulnerability-scanned images run in EKS (**Integrity**); minimizes zero-day outages (**Availability**); maintains continuous audit readiness (**Resilience**).
   * *Action Plan:* Integrate Snyk and Semgrep into GitHub Actions to block PRs with CVSS >= 7.0; enforce Cosign container signing with Kyverno admission controllers; conduct bi-annual mobile/web penetration tests.
   * *Owner:* Lead Application Security Engineer | *Effort:* 12 Weeks.

### Long-Term Initiatives (12–24 Months) – Institutional Resilience
1. **INIT-LT-01: Active-Active Multi-Region Resilient Core Banking Architecture**
   * *Business Risk Priority:* **High**
   * *Targeted STRIDE Threats:* Denial of Service
   * *NIST Gaps Addressed:* `RC.RP-01`, `PR.IR-02`
   * *CIA Impact:* Maintains AES-256 envelope encryption across distributed regions (**Confidentiality**); eliminates split-brain ledger desynchronization (**Integrity**); achieves 99.999% availability with automated cross-region failover under 30 seconds (**Availability**); eliminates single-region cloud outage vulnerability (**Resilience**).
   * *Action Plan:* Migrate to Amazon Aurora Global Database with sub-second replication; configure Route 53 Application Recovery Controller (ARC); conduct quarterly chaos engineering drills with AWS Fault Injection Simulator.
   * *Owner:* Chief Technology Officer (CTO) | *Effort:* 24 Weeks.

2. **INIT-LT-02: AI-Powered Autonomous Threat Hunting & SOAR Integration**
   * *Business Risk Priority:* **Medium**
   * *Targeted STRIDE Threats:* Spoofing, Elevation of Privilege, Information Disclosure
   * *NIST Gaps Addressed:* `DE.AE-02`, `RS.AN-01`
   * *CIA Impact:* Rapidly terminates illicit data egress attempts (**Confidentiality**); preserves automated forensic evidence (**Integrity**); prevents collateral downtime through targeted micro-isolation (**Availability**); evolves the bank to autonomous threat containment (**Resilience**).
   * *Action Plan:* Deploy AWS Security Lake paired with machine learning behavioral anomaly detection; build automated SOAR playbooks in Cortex XSOAR; automate immediate token revocation on lateral movement indicators.
   * *Owner:* SOC Manager & Lead Data Scientist | *Effort:* 20 Weeks.

---

# 8. References
1. **National Institute of Standards and Technology (NIST)**. (2024). *The NIST Cybersecurity Framework (CSF) 2.0*. NIST CSWP 29. U.S. Department of Commerce. <https://doi.org/10.6028/NIST.CSWP.29>
2. **Microsoft**. *Threat Modeling Tool overview*. Microsoft Learn. <https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool>
3. **Payment Card Industry Security Standards Council (PCI SSC)**. (2022). *Payment Card Industry Data Security Standard (PCI-DSS) Requirements and Testing Procedures v4.0*.
4. **International Organization for Standardization**. (2022). *ISO/IEC 27001:2022 Information security, cybersecurity and privacy protection — Information security management systems — Requirements*.
5. **Open Web Application Security Project (OWASP)**. (2023). *OWASP Top 10 API Security Risks – 2023 Edition*.
6. **Central Bank Guidelines on Information and Communication Technology (ICT) Security for Banks and Financial Institutions**. (2022). Department of Off-Site Supervision.
