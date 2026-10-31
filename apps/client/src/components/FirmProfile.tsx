import React from 'react';
import {
  Shield,
  Award,
  Globe,
  Database,
  Users,
  CheckCircle,
  Key,
  TrendingUp,
  Crosshair,
  ExternalLink
} from 'lucide-react';

export const FirmProfile: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-10 bg-slate-950 text-slate-100">
      {/* Firm Branding Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Academic case study · Cyber risk advisory
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            AegisGuard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Cyber Advisory</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium italic">
            "Securing Digital Trust, Engineering Cyber Resilience."
          </p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            AegisGuard Cyber Advisory is a hypothetical consultancy created for the MPMIS 516 case study. This engagement
            presents a risk-led assessment and practical security recommendations for a fictional, cloud-native banking
            organization, using NIST CSF 2.0, STRIDE, and established security-control guidance.
          </p>
        </div>
      </div>

      <section aria-labelledby="executive-brief-heading" className="space-y-5">
        <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Executive brief</span>
            <h2 id="executive-brief-heading" className="mt-1 text-2xl font-bold text-white">Resilience starts with identity, data, and recovery</h2>
          </div>
          <a
            href="https://github.com/NA-Siddiky/aegisguard-cyber-advisory/blob/main/CONSULTANCY_REPORT_MPMIS516.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-white"
          >
            Read the full engagement report <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { value: '10', label: 'Priority information assets', icon: Database, color: 'text-blue-300' },
            { value: '6', label: 'STRIDE threat scenarios', icon: Crosshair, color: 'text-rose-300' },
            { value: '3.65', label: 'Internal scenario score / 5', icon: Shield, color: 'text-cyan-300' },
            { value: '7', label: 'Phased improvement initiatives', icon: TrendingUp, color: 'text-emerald-300' }
          ].map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <Icon className={`mb-3 h-4 w-4 ${color}`} aria-hidden="true" />
              <div className="text-2xl font-bold tracking-tight text-white">{value}</div>
              <div className="mt-1 text-[11px] leading-relaxed text-slate-400">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-5 lg:col-span-3">
            <h3 className="text-sm font-bold text-white">Management priorities</h3>
            <ul className="space-y-3 text-xs leading-relaxed text-slate-300">
              <li><strong className="text-blue-300">Harden privileged access:</strong> Require phishing-resistant MFA, time-bound elevation, and independent approval for high-risk actions.</li>
              <li><strong className="text-cyan-300">Protect sensitive data:</strong> Minimize and redact PII in logs; tighten access to customer identity records and cryptographic keys.</li>
              <li><strong className="text-emerald-300">Prove recovery capability:</strong> Exercise incident containment and regional recovery against agreed business-impact objectives.</li>
            </ul>
          </div>
          <div className="space-y-3 rounded-xl border border-amber-900/50 bg-amber-950/20 p-5 lg:col-span-2">
            <h3 className="text-sm font-bold text-amber-100">Scope and evidence note</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Nexor is fictional; organization details and control statements are scenario assumptions, not verified facts.
              The DFD is conceptual. Genuine Microsoft Threat Modeling Tool source files and generated-report screenshots
              still need to be added by the assessment group.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Capabilities */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-400" />
          Core Consultancy Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-blue-400 font-bold text-sm">NIST CSF 2.0 Audits</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maturity gap analyses across Govern, Identify, Protect, Detect, Respond, and Recover functions.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-cyan-400 font-bold text-sm">MTMT & STRIDE Modeling</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decomposition of payment architectures into trust boundaries, data flows, and threat mitigations.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-purple-400 font-bold text-sm">Asset & Crown Jewel Defense</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Granular CIA Triad classification and hardware-backed cryptographic protection strategy.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">Strategic Roadmapping</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Risk-prioritized, board-level improvement roadmaps segmented into 0-6m, 6-12m, and 12-24m horizons.
            </p>
          </div>
        </div>
      </div>

      {/* Client Overview (Part 1) */}
      <div className="border border-slate-800 rounded-2xl bg-slate-900/50 p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Part 1 • Engagement Scope</span>
          <h2 className="text-2xl font-bold text-white mt-1">Client Profile: Nexor Digital Bank</h2>
          <p className="text-xs text-slate-400 mt-1">
            Nexor Financial Technologies Ltd. · Fictional case-study organization
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" /> Industry Sector
            </div>
            <div className="text-slate-200 font-medium">FinTech / Digital Retail Banking & Payments</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Organizational Scale
            </div>
            <div className="text-slate-200 font-medium">480 Full-time Employees | 1.4M Active Accounts</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-400" /> Core Infrastructure
            </div>
            <div className="text-slate-200 font-medium">Cloud-Native AWS (Multi-AZ EKS, Aurora, CloudHSM)</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Major Information Systems</h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ['Core banking platform', 'EKS microservices, Aurora PostgreSQL ledger, and double-entry transaction services.'],
              ['Mobile and web channels', 'Customer applications routed through an edge WAF and API gateway.'],
              ['Payment switch and key services', 'Payment-network connectivity, card processing, tokenization, and CloudHSM-backed key operations.'],
              ['Fraud analytics pipeline', 'Kafka event streams and risk-scoring services supporting payment decisions.'],
              ['Operations and security monitoring', 'OpsCenter workflows, cloud audit telemetry, and centralized incident monitoring.']
            ].map(([name, description]) => (
              <article key={name} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <h4 className="text-xs font-bold text-white">{name}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Core Operations & Critical Processes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              Core Business Operations
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5" />
                <span>Mobile digital deposit accounts, multi-currency wallets, and automated debit provisioning.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5" />
                <span>Instant payment switching, merchant QR checkouts, and national clearinghouse (RTGS) integration.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5" />
                <span>Algorithmic credit underwriting delivering automated micro-loans within seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5" />
                <span>Continuous AML transaction screening and automated daily central bank reconciliation.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              Critical Business Processes
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span><strong>Customer Onboarding & e-KYC:</strong> Real-time biometric and national ID verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span><strong>Payment Authorization:</strong> Sub-second ledger deduction and card payment routing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span><strong>Fraud Scoring Inference:</strong> Streaming Kafka transaction anomaly detection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span><strong>Statutory Audit & Reporting:</strong> Continuous append-only immutable financial journals.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Crown Jewels Callout */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            Identification of Institutional "Crown Jewels"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/40">
              <div className="font-bold text-amber-300 mb-1">1. Double-Entry Core Ledger</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Critical financial record; unauthorized changes could cause loss, reconciliation failures, and regulatory impact.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/40">
              <div className="font-bold text-amber-300 mb-1">2. CloudHSM Root Keys</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Secures cardholder PIN blocks, tokenization vaults, and payment switch encryption keys.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/40">
              <div className="font-bold text-amber-300 mb-1">3. Customer PII & Biometric Vault</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Identity documents and biometric data warrant strict access, retention, and privacy safeguards.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/40">
              <div className="font-bold text-amber-300 mb-1">4. Payment Switch Engine</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Transaction routing core; extended disruption could interrupt customer and merchant payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
