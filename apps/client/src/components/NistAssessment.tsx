import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';

export interface NistFunctionItem {
  functionCode: 'GV' | 'ID' | 'PR' | 'DE' | 'RS' | 'RC';
  functionName: string;
  description: string;
  score: number;
  currentPractices: string[];
  strengths: string[];
  weaknesses: string[];
  gaps: string[];
  justification: string;
}

const STATIC_NIST: NistFunctionItem[] = [
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
      'Crown Jewels cataloged and mapped to the conceptual data-flow model.'
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

export const NistAssessment: React.FC = () => {
  const [expandedCode, setExpandedCode] = useState<string | null>('GV');

  const toggleExpand = (code: string) => {
    setExpandedCode(expandedCode === code ? null : code);
  };

  const getFunctionColor = (code: string) => {
    switch (code) {
      case 'GV':
        return 'text-blue-400 bg-blue-950/40 border-blue-800/60';
      case 'ID':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60';
      case 'PR':
        return 'text-purple-400 bg-purple-950/40 border-purple-800/60';
      case 'DE':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      case 'RS':
        return 'text-rose-400 bg-rose-950/40 border-rose-800/60';
      case 'RC':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const averageScore = (STATIC_NIST.reduce((acc, curr) => acc + curr.score, 0) / STATIC_NIST.length).toFixed(2);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-cyan-600/20 rounded-lg border border-cyan-500/30 text-cyan-400">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">Part 4 • Security Assessment</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">NIST Cybersecurity Framework (CSF) 2.0</h1>
          </div>
        </div>
        <p className="text-slate-400 max-w-4xl text-sm leading-relaxed mt-2">
          Scenario-based assessment of <strong>Nexor Digital Bank</strong> across the six core functions of NIST CSF 2.0:
          <strong> Govern (GV), Identify (ID), Protect (PR), Detect (DE), Respond (RS), and Recover (RC)</strong>.
        </p>
      </div>

      <aside className="rounded-xl border border-cyan-900/60 bg-cyan-950/20 p-4 text-xs leading-relaxed text-slate-300">
        Scores use an internal 1–5 discussion scale (1 = ad hoc; 5 = continuously improving). NIST CSF 2.0 does not
        prescribe this numeric scoring method, and these scenario assumptions have not been independently verified.
        The scores are not NIST Implementation Tiers, a certification, or an audit opinion.
      </aside>

      {/* Function Radar Scorecard */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {STATIC_NIST.map((f) => (
          <button
            key={f.functionCode}
            type="button"
            onClick={() => toggleExpand(f.functionCode)}
            aria-expanded={expandedCode === f.functionCode}
            className={`text-left p-4 rounded-xl border transition-all ${
              expandedCode === f.functionCode
                ? 'bg-slate-900 border-cyan-500/50 shadow-lg'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-slate-400">{f.functionCode}</span>
              <span className="text-xs font-bold text-white">{f.score} / 5.0</span>
            </span>
            <span className="my-2 block text-sm font-bold text-white">{f.functionName}</span>
            <span className="block h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <span
                className="block h-full rounded-full bg-cyan-500"
                style={{ width: `${(f.score / 5) * 100}%` }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Average Score Banner */}
      <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-300">
          Composite scenario score: <strong className="text-white text-sm">{averageScore} / 5.0</strong>
        </div>
        <span className="text-xs px-2.5 py-1 bg-cyan-950/40 text-cyan-300 border border-cyan-800/50 rounded-full font-semibold">
          Scenario analysis
        </span>
      </div>

      {/* Detailed Accordion Cards */}
      <div className="space-y-4">
        {STATIC_NIST.map((f) => {
          const isExpanded = expandedCode === f.functionCode;
          return (
            <div
              key={f.functionCode}
              className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleExpand(f.functionCode)}
                aria-expanded={isExpanded}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
              >
                <span className="flex min-w-0 items-center space-x-3">
                  <span className={`shrink-0 px-2.5 py-1 rounded font-mono font-bold text-xs border ${getFunctionColor(f.functionCode)}`}>
                    {f.functionCode}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-bold text-white">{f.functionName} Function</span>
                    <span className="mt-0.5 block max-w-2xl text-xs text-slate-400">{f.description}</span>
                  </span>
                </span>
                <span className="ml-4 flex shrink-0 items-center space-x-4">
                  <span className="text-sm font-bold text-white">{f.score} / 5.0</span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </span>
              </button>

              {isExpanded && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-6">
                  {/* Current Practices */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Current Security Practices</h3>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {f.currentPractices.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">Strengths</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {f.strengths.map((s, idx) => (
                          <li key={idx}>✓ {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-rose-950/20 border border-rose-900/30 rounded-lg">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">Weaknesses</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {f.weaknesses.map((w, idx) => (
                          <li key={idx}>✗ {w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Gaps */}
                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Identified CSF Outcome Gaps
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {f.gaps.map((g, idx) => (
                        <li key={idx} className="font-mono text-[11px] text-amber-200">
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Justification */}
                  <div className="text-xs text-slate-400 italic bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <strong className="text-slate-300 not-italic">Assessment Justification:</strong> {f.justification}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
