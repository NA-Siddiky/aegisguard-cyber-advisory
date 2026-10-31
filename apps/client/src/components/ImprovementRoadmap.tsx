import React, { useState } from 'react';
import {
  GitCommit,
  AlertOctagon,
  Clock,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  Layers,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';

export type RoadmapPhase = 'All' | 'Short-Term (0-6 Months)' | 'Medium-Term (6-12 Months)' | 'Long-Term (12-24 Months)';
export type RiskPriority = 'Critical' | 'High' | 'Medium';

export interface CIAResilienceImpact {
  confidentiality: string;
  integrity: string;
  availability: string;
  resilience: string;
}

export interface RoadmapInitiative {
  id: string;
  phase: 'Short-Term (0-6 Months)' | 'Medium-Term (6-12 Months)' | 'Long-Term (12-24 Months)';
  title: string;
  businessRiskPriority: RiskPriority;
  targetThreats: string[];
  nistGapsAddressed: string[];
  ciaImpact: CIAResilienceImpact;
  actionPlan: string[];
  estimatedEffort: string;
  owner: string;
}

const STATIC_ROADMAP: RoadmapInitiative[] = [
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
      availability: 'Prevents unauthorized administrative lockouts or catastrophic denial caused by compromised master credentials.',
      resilience: 'Dramatically reduces institutional exposure to automated credential stuffing, phishing, and session-replay attacks.'
    },
    actionPlan: [
      'Procure and provision FIDO2 YubiKey 5C NFC hardware security tokens to 100% of engineering and operations personnel.',
      'Enforce mandatory biometric step-up authentication via Mobile Secure Enclave on fund transfers exceeding $1,000.',
      'Deprecate SMS OTP and standard software TOTP fallbacks for all privileged AWS, GitHub, and production Kubernetes accounts.'
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
      availability: 'Ensures negligible latency overhead (< 2ms) via in-memory format-preserving tokenization.',
      resilience: 'Protects the bank against massive statutory fines under GDPR and Central Bank Data Protection acts.'
    },
    actionPlan: [
      'Deploy regex-based PII redaction filters across all Logstash and FluentBit ingestion daemons.',
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
      confidentiality: 'Neutral / indirect protection against telemetry harvesting during brute-force floods.',
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

export const ImprovementRoadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>('All');
  const [expandedId, setExpandedId] = useState<string | null>('INIT-ST-01');

  const filteredInitiatives = STATIC_ROADMAP.filter((item) => {
    if (selectedPhase === 'All') return true;
    return item.phase === selectedPhase;
  });

  const getPriorityBadgeClass = (priority: RiskPriority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-950/70 text-red-300 border-red-800/80';
      case 'High':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/80';
      case 'Medium':
        return 'bg-blue-950/70 text-blue-300 border-blue-800/80';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getPhaseBadgeColor = (phase: string) => {
    if (phase.includes('0-6')) return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50';
    if (phase.includes('6-12')) return 'text-blue-400 bg-blue-950/40 border-blue-800/50';
    return 'text-purple-400 bg-purple-950/40 border-purple-800/50';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-emerald-600/20 rounded-lg border border-emerald-500/30 text-emerald-400">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Part 6 • Strategic Execution</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Security Improvement Recommendations & Roadmap</h1>
          </div>
        </div>
        <p className="text-slate-400 max-w-4xl text-sm leading-relaxed mt-2">
          Prioritized scenario roadmap for <strong>Nexor Digital Bank</strong>. Recommendations are sequenced by business risk
          to address <strong>NIST CSF 2.0</strong> outcome gaps, respond to <strong>STRIDE</strong> threat scenarios, and reinforce the
          <strong> Confidentiality, Integrity, Availability, and Resilience (CIA-R)</strong> of critical core banking operations.
        </p>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{STATIC_ROADMAP.length}</div>
            <div className="text-xs text-slate-400 uppercase font-medium">Strategic Initiatives</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {STATIC_ROADMAP.filter((i) => i.businessRiskPriority === 'Critical').length}
            </div>
            <div className="text-xs text-slate-400 uppercase font-medium">Critical Priority</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {STATIC_ROADMAP.filter((i) => i.businessRiskPriority === 'High').length}
            </div>
            <div className="text-xs text-slate-400 uppercase font-medium">High Priority</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">24 Mos</div>
            <div className="text-xs text-slate-400 uppercase font-medium">Full Horizon</div>
          </div>
        </div>
      </div>

      {/* Phase Filter Bar */}
      <div className="flex items-center space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800 overflow-x-auto">
        {(
          [
            'All',
            'Short-Term (0-6 Months)',
            'Medium-Term (6-12 Months)',
            'Long-Term (12-24 Months)'
          ] as RoadmapPhase[]
        ).map((phase) => (
          <button
            key={phase}
            type="button"
            onClick={() => setSelectedPhase(phase)}
            aria-pressed={selectedPhase === phase}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPhase === phase
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Initiatives Timeline List */}
      <div className="space-y-4">
        {filteredInitiatives.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all shadow-md"
            >
              {/* Card Header Accordion Toggle */}
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggleExpand(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{item.id}</span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getPhaseBadgeColor(
                        item.phase
                      )}`}
                    >
                      {item.phase}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getPriorityBadgeClass(
                        item.businessRiskPriority
                      )}`}
                    >
                      Risk: {item.businessRiskPriority}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-6 text-xs text-slate-400">
                  <div className="hidden sm:flex items-center space-x-1.5">
                    <UserCheck className="w-4 h-4 text-slate-500" />
                    <span>{item.owner}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Content Area */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-6">
                  {/* Meta Mapping: Threats & NIST Gaps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 rounded-lg p-3.5 border border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                        <GitCommit className="w-3.5 h-3.5 text-blue-400" />
                        Targeted STRIDE Scenarios
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.targetThreats.map((threat) => (
                          <span
                            key={threat}
                            className="text-[11px] font-medium px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700"
                          >
                            {threat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 rounded-lg p-3.5 border border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-emerald-400" />
                        Addressed NIST CSF 2.0 Gaps
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.nistGapsAddressed.map((gap) => (
                          <span
                            key={gap}
                            className="text-[11px] font-medium px-2 py-0.5 bg-emerald-950/40 text-emerald-300 rounded border border-emerald-800/40"
                          >
                            {gap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CIA & Resilience Impact Breakdown */}
                  <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      CIA & Resilience Impact Analysis
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="font-bold text-blue-400 block mb-1">Confidentiality</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{item.ciaImpact.confidentiality}</p>
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="font-bold text-emerald-400 block mb-1">Integrity</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{item.ciaImpact.integrity}</p>
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="font-bold text-amber-400 block mb-1">Availability</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{item.ciaImpact.availability}</p>
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="font-bold text-purple-400 block mb-1">Systemic Resilience</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{item.ciaImpact.resilience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Plan Implementation Checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Actionable Engineering Milestones
                    </div>
                    <div className="space-y-1.5">
                      {item.actionPlan.map((action, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-2.5 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/60 text-xs text-slate-300"
                        >
                          <span className="font-mono text-emerald-400 font-bold mt-0.5">0{idx + 1}.</span>
                          <span className="leading-relaxed">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Estimated Effort: <strong className="text-slate-300">{item.estimatedEffort}</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>Project Sponsor: <strong className="text-slate-300">{item.owner}</strong></span>
                    </div>
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
