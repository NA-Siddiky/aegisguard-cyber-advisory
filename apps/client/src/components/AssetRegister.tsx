import React, { useState } from 'react';
import { Database, Search } from 'lucide-react';

export interface AssetItem {
  id: string;
  name: string;
  description: string;
  owner: string;
  confidentiality: 'High' | 'Medium' | 'Low';
  integrity: 'High' | 'Medium' | 'Low';
  availability: 'High' | 'Medium' | 'Low';
  ciaRating: string;
}

const STATIC_ASSETS: AssetItem[] = [
  {
    id: 'AST-01',
    name: 'Core Financial Ledger & Balance Database',
    description: 'Amazon Aurora PostgreSQL database holding double-entry general ledger, customer balance states, and transaction histories.',
    owner: 'Chief Financial Officer (CFO) / Head of Core Banking',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'High',
    ciaRating: 'C=High, I=High, A=High'
  },
  {
    id: 'AST-02',
    name: 'Customer PII & e-KYC Biometric Vault',
    description: 'Encrypted S3 object storage containing identity card scans, facial biometric feature vectors, and customer identity metadata.',
    owner: 'Chief Compliance Officer (CCO) / Head of Operations',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'Medium',
    ciaRating: 'C=High, I=High, A=Med'
  },
  {
    id: 'AST-03',
    name: 'CloudHSM Cryptographic Root Keys & PIN Blocks',
    description: 'Hardware Security Module (HSM) root encryption keys, Zone Master Keys (ZMK), and cardholder tokenization vaults.',
    owner: 'Chief Information Security Officer (CISO)',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'High',
    ciaRating: 'C=High, I=High, A=High'
  },
  {
    id: 'AST-04',
    name: 'Payment Switching & Routing Hub',
    description: 'Real-time payment gateway switch orchestrating external connectivity with VISA, Mastercard, and national clearing systems.',
    owner: 'Chief Technology Officer (CTO) / VP of Engineering',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'High',
    ciaRating: 'C=High, I=High, A=High'
  },
  {
    id: 'AST-05',
    name: 'Proprietary Banking Source Code & CI/CD Pipelines',
    description: 'GitHub Enterprise repositories, build scripts, container images (ECR), and production deployment pipelines (GitHub Actions).',
    owner: 'VP of Engineering / Lead DevOps Architect',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'Medium',
    ciaRating: 'C=High, I=High, A=Med'
  },
  {
    id: 'AST-06',
    name: 'Real-Time Fraud Analytics & ML Scoring Engine',
    description: 'Apache Kafka streaming data, inference models, and risk rules evaluating every payment transaction for fraudulent patterns.',
    owner: 'Chief Risk Officer (CRO) / Head of Fraud Analytics',
    confidentiality: 'Medium',
    integrity: 'High',
    availability: 'High',
    ciaRating: 'C=Med, I=High, A=High'
  },
  {
    id: 'AST-07',
    name: 'Omnichannel Mobile & Web API Gateway',
    description: 'Public-facing REST and GraphQL gateway endpoints orchestrating user authentication, session tokens, and request routing.',
    owner: 'Head of Digital Banking / Principal Architect',
    confidentiality: 'Medium',
    integrity: 'High',
    availability: 'High',
    ciaRating: 'C=Med, I=High, A=High'
  },
  {
    id: 'AST-08',
    name: 'AWS Cloud Infrastructure & IAM Access Control',
    description: 'AWS Organizations, IAM role policies, Terraform state files, and Kubernetes cluster control plane configurations.',
    owner: 'Head of Cloud Infrastructure / CISO',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'High',
    ciaRating: 'C=High, I=High, A=High'
  },
  {
    id: 'AST-09',
    name: 'Security Audit Logs & SIEM Telemetry Data',
    description: 'Centralized, append-only security event logs, AWS CloudTrail, VPC Flow logs, and SIEM incident audit repositories.',
    owner: 'Security Operations Center (SOC) Manager',
    confidentiality: 'High',
    integrity: 'High',
    availability: 'Medium',
    ciaRating: 'C=High, I=High, A=Med'
  },
  {
    id: 'AST-10',
    name: 'Executive & Corporate Communications Suite',
    description: 'Google Workspace / Corporate Microsoft 365 containing executive emails, board decks, legal contracts, and financial audits.',
    owner: 'General Counsel / Chief Operating Officer (COO)',
    confidentiality: 'High',
    integrity: 'Medium',
    availability: 'Medium',
    ciaRating: 'C=High, I=Med, A=Med'
  }
];

export const AssetRegister: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = STATIC_ASSETS.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCiaBadge = (val: 'High' | 'Medium' | 'Low') => {
    switch (val) {
      case 'High':
        return 'bg-red-950/60 text-red-300 border-red-800/60';
      case 'Medium':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      case 'Low':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Part 2 • Asset Register</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Information Asset Register</h1>
          </div>
        </div>
        <p className="text-slate-400 max-w-4xl text-sm leading-relaxed mt-2">
          Scenario register of 10 critical information assets for fictional <strong>Nexor Digital Bank</strong>.
          Proposed owners and classifications are assessed against the <strong>Confidentiality, Integrity, and Availability (CIA) Triad</strong>.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search information assets"
            placeholder="Search by asset name, owner, or ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-white">{filteredAssets.length}</strong> of {STATIC_ASSETS.length} Assets
        </div>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px] font-semibold">
            <tr>
              <th className="py-3.5 px-4">Asset ID & Name</th>
              <th className="py-3.5 px-4">Description & Scope</th>
              <th className="py-3.5 px-4">Asset Owner</th>
              <th className="py-3.5 px-3 text-center">C</th>
              <th className="py-3.5 px-3 text-center">I</th>
              <th className="py-3.5 px-3 text-center">A</th>
              <th className="py-3.5 px-4 text-right">CIA Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-mono text-[11px] text-blue-400 font-bold">{asset.id}</div>
                  <div className="font-bold text-white text-sm mt-0.5">{asset.name}</div>
                </td>
                <td className="py-4 px-4 text-slate-300 max-w-md leading-relaxed">
                  {asset.description}
                </td>
                <td className="py-4 px-4 text-slate-300 font-medium whitespace-nowrap">
                  {asset.owner}
                </td>
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCiaBadge(asset.confidentiality)}`}>
                    {asset.confidentiality}
                  </span>
                </td>
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCiaBadge(asset.integrity)}`}>
                    {asset.integrity}
                  </span>
                </td>
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCiaBadge(asset.availability)}`}>
                    {asset.availability}
                  </span>
                </td>
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <span className="font-mono text-[11px] text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                    {asset.ciaRating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
