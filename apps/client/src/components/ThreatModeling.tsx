import React, { useState } from 'react';
import {
  Crosshair,
  Layers
} from 'lucide-react';

export interface ThreatItem {
  category: 'Spoofing' | 'Tampering' | 'Repudiation' | 'Information Disclosure' | 'Denial of Service' | 'Elevation of Privilege';
  title: string;
  threatDescription: string;
  affectedComponent: string;
  severity: 'High' | 'Medium' | 'Low';
  initialMitigation: string;
}

const STATIC_THREATS: ThreatItem[] = [
  {
    category: 'Spoofing',
    title: 'API Token Forgery & Device Impersonation',
    threatDescription: 'An adversary intercepts or reconstructs an OAuth2/JWT bearer token or clones device fingerprints to impersonate an authorized customer and submit fraudulent payment authorizations.',
    affectedComponent: 'Omnichannel API Gateway (P-01)',
    severity: 'High',
    initialMitigation: 'Enforce mTLS with hardware-backed device keys (Secure Enclave / StrongBox Keystore), short-lived RS256 JWTs (5-min expiry), rotating refresh tokens, and DPoP (Demonstrating Proof-of-Possession).'
  },
  {
    category: 'Tampering',
    title: 'Transaction Parameter & In-Transit Payload Manipulation',
    threatDescription: 'An attacker alters the beneficiary account number or modifies the transfer amount in the HTTP payload between the client device and the backend API during network transit.',
    affectedComponent: 'Payment Authorization Engine (P-02) & Data Flow DF-01',
    severity: 'High',
    initialMitigation: 'Enforce strict TLS 1.3 with Certificate Pinning in mobile apps; enforce client-side HMAC-SHA256 request signing with hardware nonces; server-side re-validation of account limits and balance constraints.'
  },
  {
    category: 'Repudiation',
    title: 'Disputed High-Value Fund Transfer without Non-Repudiation Proof',
    threatDescription: 'A compromised or malicious account holder executes a high-value wire transfer and later claims the transaction was unauthorized, exploiting weak audit logs that lack digital signatures.',
    affectedComponent: 'Core Banking Ledger Engine (P-04) & Audit Subsystem (D-01)',
    severity: 'Medium',
    initialMitigation: 'Enforce mandatory step-up biometric authentication (FIDO2/WebAuthn) for transfers > $1,000; cryptographically signed receipts; ingest logs into AWS CloudTrail and S3 Object Lock in WORM compliance mode.'
  },
  {
    category: 'Information Disclosure',
    title: 'Leakage of Cardholder Data & Customer PII in Application Logs',
    threatDescription: 'Verbose microservice error handling or unmasked log streams write unencrypted Primary Account Numbers (PAN), CVVs, and national identity numbers into centralized log repositories.',
    affectedComponent: 'Application Logging Stream & S3 Data Vault (D-03, DF-04)',
    severity: 'High',
    initialMitigation: 'Format-Preserving Encryption (FPE) and field-level tokenization via AWS CloudHSM; automated CI/CD secret/PII scanning rules; regex sanitization in FluentBit agents; AWS KMS SSE-KMS envelope encryption.'
  },
  {
    category: 'Denial of Service',
    title: 'Distributed Layer-7 API Flood & Database Connection Pool Exhaustion',
    threatDescription: 'An adversary uses botnets to flood the /api/v1/payments/transfer endpoint with malformed requests, saturating API gateway worker threads and causing database connection starvation for legitimate customers.',
    affectedComponent: 'API Gateway (P-01) & Core Ledger DB (D-01)',
    severity: 'High',
    initialMitigation: 'Cloudflare Magic Transit & Edge WAF managed Layer-7 DDoS rulesets; token-bucket rate limiting (10 req/min/user); AWS RDS Proxy connection pooling; asynchronous Kafka queuing.'
  },
  {
    category: 'Elevation of Privilege',
    title: 'Broken Object-Level Authorization (BOLA/IDOR) in Back-Office Portal',
    threatDescription: 'A Tier-1 Customer Support agent tampers with HTTP request parameters in the OpsCenter console (/api/admin/accounts/{id}/override) to grant themselves super-admin privileges or bypass credit limits.',
    affectedComponent: 'Nexor OpsCenter (Internal Admin Suite) & IAM Mapping (P-02)',
    severity: 'High',
    initialMitigation: 'Strict server-side Attribute-Based Access Control (ABAC); Four-Eyes Principle (dual-custody sign-off) for financial overrides; hardware-token MFA (FIDO2 YubiKey) and isolated VPN access.'
  }
];

export const ThreatModeling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dfd' | 'stride'>('stride');

  const getThreatBadgeClass = (threat: string) => {
    switch (threat) {
      case 'Spoofing':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      case 'Tampering':
        return 'bg-rose-950/60 text-rose-300 border-rose-800/60';
      case 'Repudiation':
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60';
      case 'Information Disclosure':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60';
      case 'Denial of Service':
        return 'bg-red-950/60 text-red-300 border-red-800/60';
      case 'Elevation of Privilege':
        return 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-rose-600/20 rounded-lg border border-rose-500/30 text-rose-400">
            <Crosshair className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">Part 3 • MTMT Analysis</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Threat Modelling (MTMT & STRIDE)</h1>
          </div>
        </div>
        <p className="text-slate-400 max-w-4xl text-sm leading-relaxed mt-2">
          Conceptual data-flow diagram and scenario-based STRIDE analysis for the
          <strong> Mobile Banking App to Core Ledger Payment Pipeline</strong>. The model is structured for recreation in
          <strong> Microsoft Threat Modeling Tool (MTMT)</strong>; no MTMT source file or export was supplied.
        </p>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Threat model views" className="flex items-center space-x-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 w-fit">
        <button
          id="stride-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === 'stride'}
          aria-controls="stride-panel"
          onClick={() => setActiveTab('stride')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'stride'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          STRIDE Threat Matrix (Step 2 & 3)
        </button>
        <button
          id="dfd-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === 'dfd'}
          aria-controls="dfd-panel"
          onClick={() => setActiveTab('dfd')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dfd'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          System Architecture & DFD (Step 1)
        </button>
      </div>

      {activeTab === 'stride' ? (
        /* STRIDE Threat Table */
        <div id="stride-panel" role="tabpanel" aria-labelledby="stride-tab" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATIC_THREATS.map((t) => (
              <div
                key={t.category}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getThreatBadgeClass(t.category)}`}>
                      {t.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/60 text-red-300 border border-red-800/60 rounded">
                      Severity: {t.severity}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-white mb-2">{t.title}</h2>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{t.threatDescription}</p>

                  <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800 mb-4 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Affected Component:</span>
                    <span className="text-slate-200 font-mono text-[11px]">{t.affectedComponent}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-3 text-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    Initial Mitigation Controls:
                  </span>
                  <span className="text-slate-300 leading-relaxed">{t.initialMitigation}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 rounded-xl border border-amber-800/50 bg-amber-950/20 p-5 md:grid-cols-[auto_1fr] md:items-start">
            <span className="rounded-full border border-amber-700/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Evidence required
            </span>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">MTMT source model and generated report have not been supplied</h3>
              <p className="text-xs leading-relaxed text-slate-300">
                This STRIDE matrix is an academic scenario analysis, not an export from Microsoft Threat Modeling Tool.
                Before submission, create and review the model in MTMT, then add genuine screenshots of its diagram and
                generated threat report. Do not present this conceptual analysis as verified MTMT output.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* DFD Architecture View */
        <div id="dfd-panel" role="tabpanel" aria-labelledby="dfd-tab" className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-400" />
              Mobile Banking App to Core Ledger Payment Flow (Data Flow Diagram)
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3 md:p-5">
              <svg
                viewBox="0 0 1220 510"
                role="img"
                aria-labelledby="dfd-title dfd-description"
                className="min-w-[960px] w-full"
              >
                <title id="dfd-title">Conceptual payment-system data-flow diagram</title>
                <desc id="dfd-description">
                  A customer and clearinghouse exchange payment instructions with a cloud edge and API gateway.
                  A private payment service connects to fraud analytics, an operations console, an HSM, a core ledger,
                  a customer identity store, and centralized security monitoring across four trust boundaries.
                </desc>
                <defs>
                  <marker id="dfd-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 z" fill="#94a3b8" />
                  </marker>
                </defs>
                <rect x="14" y="46" width="184" height="424" rx="14" fill="#0f172a" stroke="#3b82f6" strokeDasharray="7 6" />
                <rect x="212" y="46" width="248" height="424" rx="14" fill="#0f172a" stroke="#06b6d4" strokeDasharray="7 6" />
                <rect x="474" y="46" width="354" height="424" rx="14" fill="#0f172a" stroke="#a855f7" strokeDasharray="7 6" />
                <rect x="842" y="46" width="364" height="424" rx="14" fill="#0f172a" stroke="#10b981" strokeDasharray="7 6" />

                <g fill="#cbd5e1" fontFamily="ui-sans-serif, system-ui" fontSize="12" fontWeight="700">
                  <text x="30" y="72" fill="#60a5fa">TB-01 · PUBLIC / EXTERNAL</text>
                  <text x="228" y="72" fill="#22d3ee">TB-02 · EDGE / DMZ</text>
                  <text x="490" y="72" fill="#c084fc">TB-03 · PRIVATE APPLICATION VPC</text>
                  <text x="858" y="72" fill="#34d399">TB-04 · DATA &amp; SECURITY SERVICES</text>
                </g>

                <g fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#dfd-arrow)">
                  <path d="M184 174 H242" />
                  <path d="M442 174 H536" />
                  <path d="M774 174 C810 174 825 250 872 250" />
                  <path d="M1022 242 C1045 230 1042 190 1037 170" />
                  <path d="M650 226 C650 268 584 278 584 320" />
                  <path d="M728 215 C786 248 817 307 872 337" />
                  <path d="M774 198 C860 248 948 285 1037 337" />
                  <path d="M774 220 C850 280 879 390 946 420" />
                  <path d="M184 347 C314 422 430 279 536 218" />
                  <path d="M674 349 H648" />
                </g>
                <g fill="#cbd5e1" fontFamily="ui-sans-serif, system-ui" fontSize="10">
                  <text x="187" y="160">DF-01 · HTTPS</text>
                  <text x="445" y="160">DF-02 · Auth request</text>
                  <text x="784" y="236">DF-03 · Ledger request</text>
                  <text x="1021" y="226">DF-04 · Ledger commit</text>
                  <text x="590" y="276">DF-05 · Risk event</text>
                  <text x="786" y="292">DF-06 · Key operation</text>
                  <text x="893" y="287">DF-07 · e-KYC</text>
                  <text x="865" y="386">DF-08 · Audit events</text>
                  <text x="309" y="398">DF-09 · Clearing response</text>
                </g>

                <g fontFamily="ui-sans-serif, system-ui">
                  <rect x="42" y="132" width="142" height="84" rx="10" fill="#172554" stroke="#3b82f6" />
                  <text x="56" y="158" fill="#93c5fd" fontSize="11" fontWeight="700">EXTERNAL ENTITY · E-01</text>
                  <text x="56" y="182" fill="#f8fafc" fontSize="14" fontWeight="700">Mobile customer</text>
                  <text x="56" y="202" fill="#94a3b8" fontSize="11">iOS / Android app</text>

                  <rect x="42" y="318" width="142" height="62" rx="10" fill="#172554" stroke="#3b82f6" />
                  <text x="54" y="342" fill="#93c5fd" fontSize="10" fontWeight="700">EXTERNAL ENTITY · E-02</text>
                  <text x="54" y="363" fill="#f8fafc" fontSize="12" fontWeight="700">Payment network</text>

                  <rect x="242" y="132" width="200" height="84" rx="10" fill="#083344" stroke="#06b6d4" />
                  <text x="256" y="158" fill="#67e8f9" fontSize="11" fontWeight="700">PROCESS · P-01</text>
                  <text x="256" y="182" fill="#f8fafc" fontSize="14" fontWeight="700">Edge WAF + API gateway</text>
                  <text x="256" y="202" fill="#94a3b8" fontSize="11">Auth · validation · rate limits</text>

                  <rect x="536" y="132" width="238" height="94" rx="10" fill="#3b0764" stroke="#a855f7" />
                  <text x="552" y="158" fill="#d8b4fe" fontSize="11" fontWeight="700">PROCESS · P-02</text>
                  <text x="552" y="182" fill="#f8fafc" fontSize="14" fontWeight="700">Payment authorization</text>
                  <text x="552" y="203" fill="#cbd5e1" fontSize="11">Policy checks · balance · routing</text>

                  <rect x="512" y="320" width="136" height="62" rx="10" fill="#3b0764" stroke="#a855f7" />
                  <text x="524" y="342" fill="#d8b4fe" fontSize="10" fontWeight="700">PROCESS · P-03</text>
                  <text x="524" y="364" fill="#f8fafc" fontSize="12" fontWeight="700">Fraud analytics</text>

                  <rect x="674" y="320" width="134" height="62" rx="10" fill="#3b0764" stroke="#a855f7" />
                  <text x="686" y="342" fill="#d8b4fe" fontSize="10" fontWeight="700">PROCESS · P-05</text>
                  <text x="686" y="364" fill="#f8fafc" fontSize="12" fontWeight="700">OpsCenter</text>

                  <rect x="872" y="220" width="150" height="76" rx="10" fill="#3b0764" stroke="#a855f7" />
                  <text x="884" y="243" fill="#d8b4fe" fontSize="10" fontWeight="700">PROCESS · P-04</text>
                  <text x="884" y="266" fill="#f8fafc" fontSize="12" fontWeight="700">Core ledger engine</text>
                  <text x="884" y="284" fill="#cbd5e1" fontSize="10">ACID posting</text>

                  <rect x="1037" y="132" width="143" height="76" rx="10" fill="#064e3b" stroke="#10b981" />
                  <text x="1049" y="155" fill="#6ee7b7" fontSize="10" fontWeight="700">DATA STORE · D-01</text>
                  <text x="1049" y="178" fill="#f8fafc" fontSize="12" fontWeight="700">Aurora ledger</text>
                  <text x="1049" y="196" fill="#94a3b8" fontSize="10">Double-entry records</text>

                  <rect x="872" y="306" width="150" height="62" rx="10" fill="#064e3b" stroke="#10b981" />
                  <text x="884" y="328" fill="#6ee7b7" fontSize="10" fontWeight="700">DATA STORE · D-02</text>
                  <text x="884" y="350" fill="#f8fafc" fontSize="12" fontWeight="700">CloudHSM key vault</text>

                  <rect x="1037" y="306" width="143" height="62" rx="10" fill="#064e3b" stroke="#10b981" />
                  <text x="1049" y="328" fill="#6ee7b7" fontSize="10" fontWeight="700">DATA STORE · D-03</text>
                  <text x="1049" y="350" fill="#f8fafc" fontSize="12" fontWeight="700">PII / e-KYC vault</text>
                  <text x="1049" y="363" fill="#94a3b8" fontSize="9">Encrypted object store</text>

                  <rect x="946" y="390" width="220" height="58" rx="10" fill="#164e63" stroke="#06b6d4" />
                  <text x="960" y="413" fill="#67e8f9" fontSize="10" fontWeight="700">SECURITY MONITORING</text>
                  <text x="960" y="435" fill="#f8fafc" fontSize="12" fontWeight="700">SIEM / immutable audit logs</text>
                </g>
              </svg>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              <strong className="text-slate-300">Conceptual DFD for scenario analysis.</strong> Process, data-store,
              external-entity, flow, and trust-boundary identifiers are provided to support recreation and review in MTMT;
              this illustration is not an MTMT export or a verified production architecture.
            </p>
            <div className="grid gap-3 text-xs md:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <h3 className="mb-2 font-bold text-white">External entities</h3>
                <p className="text-slate-400">E-01 Mobile customer · E-02 Payment network</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <h3 className="mb-2 font-bold text-white">Processes</h3>
                <p className="text-slate-400">P-01 API gateway · P-02 Authorization · P-03 Fraud · P-04 HSM · P-05 OpsCenter</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <h3 className="mb-2 font-bold text-white">Data stores</h3>
                <p className="text-slate-400">D-01 Ledger · D-02 Cryptographic keys · D-03 Customer identity vault</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-amber-800/50 bg-amber-950/20 p-5">
            <h3 className="text-sm font-bold text-amber-200">Submission evidence still required</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              Recreate and validate this proposed model in Microsoft Threat Modeling Tool, then add authentic screenshots
              of the model and its generated threat report. No MTMT screenshots were provided for this project.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
