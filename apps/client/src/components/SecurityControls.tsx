import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Building,
  CheckCircle2,
  Search,
  Filter,
  AlertCircle,
  Cpu,
  Lock
} from 'lucide-react';

export type ControlCategory = 'All' | 'Administrative' | 'Technical' | 'Physical';

export interface SecurityControl {
  id: string;
  category: 'Administrative' | 'Technical' | 'Physical';
  title: string;
  description: string;
  implementationDetails: string;
  mappedThreats: string[];
  mitigationJustification: string;
  frameworkRef: string;
}

const STATIC_CONTROLS: SecurityControl[] = [
  // Administrative
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

  // Technical
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

  // Physical
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

const ACCESS_ROLES = [
  { role: 'Customer', data: 'Own account only', initiate: 'Own transfers', approve: '—', iam: '—', audit: 'Own activity' },
  { role: 'Support agent', data: 'Assigned cases; masked', initiate: '—', approve: '—', iam: '—', audit: 'Assigned activity' },
  { role: 'Fraud analyst', data: 'Risk cases; masked', initiate: '—', approve: 'Recommend hold', iam: '—', audit: 'Case activity' },
  { role: 'Payment maker', data: 'Assigned transaction', initiate: 'Payment exception', approve: '—', iam: '—', audit: 'Own activity' },
  { role: 'Payment checker', data: 'Minimum necessary', initiate: '—', approve: 'Independent co-approval', iam: '—', audit: 'Approval trail' },
  { role: 'Security administrator', data: 'No default access', initiate: '—', approve: '—', iam: 'Time-bound + peer approval', audit: 'Security logs' },
  { role: 'Auditor', data: 'Approved read-only', initiate: '—', approve: '—', iam: '—', audit: 'Read-only evidence' },
  { role: 'Workload identity', data: 'Service-scoped', initiate: 'Policy-bound API', approve: 'Never human approval', iam: 'Workload identity only', audit: 'Service telemetry' }
];

export const SecurityControls: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ControlCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredControls = STATIC_CONTROLS.filter((control) => {
    const matchesCategory = selectedCategory === 'All' || control.category === selectedCategory;
    const matchesSearch =
      control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      control.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      control.frameworkRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      control.mappedThreats.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Administrative':
        return 'bg-purple-900/40 text-purple-300 border-purple-700/50';
      case 'Technical':
        return 'bg-blue-900/40 text-blue-300 border-blue-700/50';
      case 'Physical':
        return 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

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
      {/* Header Section */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Part 5 • Assessment Matrix</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Information System Security Controls</h1>
          </div>
        </div>
        <p className="text-slate-400 max-w-4xl text-sm leading-relaxed mt-2">
          Proposed defense-in-depth baseline for <strong>Nexor Digital Bank</strong>. Controls are mapped to the scenario STRIDE
          analysis and reference <strong>NIST CSF 2.0</strong>, <strong>PCI DSS 4.0</strong>, and <strong>ISO/IEC 27001:2022</strong>;
          these mappings do not constitute an independent compliance validation.
        </p>
      </div>

      <section aria-labelledby="access-model-heading" className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 md:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border border-blue-500/30 bg-blue-600/15 p-2 text-blue-300">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 id="access-model-heading" className="text-lg font-bold text-white">Proposed access-control model</h2>
            <p className="mt-1 max-w-4xl text-xs leading-relaxed text-slate-400">
              Role-based access control (RBAC) with case, ownership, risk, and transaction attributes. Access is deny-by-default
              and least-privilege; a separate checker must approve high-risk actions and cannot approve their own request.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[860px] text-left text-xs">
            <caption className="sr-only">Proposed role-to-permission matrix for Nexor Digital Bank</caption>
            <thead className="bg-slate-950 text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3">Role</th>
                <th scope="col" className="px-4 py-3">Sensitive data</th>
                <th scope="col" className="px-4 py-3">Initiate payment</th>
                <th scope="col" className="px-4 py-3">Approve exception</th>
                <th scope="col" className="px-4 py-3">Manage IAM</th>
                <th scope="col" className="px-4 py-3">Audit evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60">
              {ACCESS_ROLES.map((row) => (
                <tr key={row.role}>
                  <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-slate-200">{row.role}</th>
                  <td className="px-4 py-3 text-slate-300">{row.data}</td>
                  <td className="px-4 py-3 text-slate-300">{row.initiate}</td>
                  <td className="px-4 py-3 text-slate-300">{row.approve}</td>
                  <td className="px-4 py-3 text-slate-300">{row.iam}</td>
                  <td className="px-4 py-3 text-slate-300">{row.audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Enforce just-in-time privileged elevation with expiry, phishing-resistant MFA, immutable approval logs, periodic
          access recertification, and audited break-glass access. This is a recommended design, not a description of a
          verified production configuration.
        </p>
      </section>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{STATIC_CONTROLS.length}</div>
            <div className="text-xs text-slate-400 uppercase font-medium">Total Controls</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {STATIC_CONTROLS.filter((c) => c.category === 'Administrative').length}
            </div>
            <div className="text-xs text-slate-400 uppercase font-medium">Administrative</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {STATIC_CONTROLS.filter((c) => c.category === 'Technical').length}
            </div>
            <div className="text-xs text-slate-400 uppercase font-medium">Technical</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {STATIC_CONTROLS.filter((c) => c.category === 'Physical').length}
            </div>
            <div className="text-xs text-slate-400 uppercase font-medium">Physical</div>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {(['All', 'Administrative', 'Technical', 'Physical'] as ControlCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search security controls"
            placeholder="Search by title, threat, or framework..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Control Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredControls.map((control) => (
          <div
            key={control.id}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
          >
            <div>
              {/* Card Meta Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">{control.id}</span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                    control.category
                  )}`}
                >
                  {control.category} Control
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {control.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{control.description}</p>

              {/* Implementation Details */}
              <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 mb-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  Engineering Implementation
                </div>
                <div className="text-xs text-slate-300 leading-normal">{control.implementationDetails}</div>
              </div>

              {/* Threat Mitigation Justification */}
              <div className="bg-slate-950/40 rounded-lg p-3 border border-slate-800/50 mb-4">
                <div className="text-[11px] font-bold text-amber-400/90 uppercase mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Threat mitigation rationale
                </div>
                <div className="text-xs text-slate-400 italic leading-normal">{control.mitigationJustification}</div>
              </div>
            </div>

            {/* Card Footer: Mapped Threats & Framework */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-semibold uppercase mr-1">STRIDE:</span>
                {control.mappedThreats.map((threat) => (
                  <span
                    key={threat}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getThreatBadgeClass(threat)}`}
                  >
                    {threat}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span className="text-slate-500 font-semibold">REF:</span> {control.frameworkRef}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredControls.length === 0 && (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">No controls matched the filter criteria.</p>
        </div>
      )}
    </div>
  );
};
