import React, { useState } from 'react';
import { FirmProfile } from './components/FirmProfile';
import { AssetRegister } from './components/AssetRegister';
import { ThreatModeling } from './components/ThreatModeling';
import { NistAssessment } from './components/NistAssessment';
import { SecurityControls } from './components/SecurityControls';
import { ImprovementRoadmap } from './components/ImprovementRoadmap';
import {
  Shield,
  Database,
  Crosshair,
  Layers,
  ShieldCheck,
  TrendingUp,
  Maximize2,
  Minimize2
} from 'lucide-react';

const NAVIGATION_ITEMS = [
  { id: 'profile', label: 'Engagement', shortLabel: 'Overview', part: '01', icon: Shield },
  { id: 'assets', label: 'Asset register', shortLabel: 'Assets', part: '02', icon: Database },
  { id: 'threats', label: 'Threat model', shortLabel: 'Threats', part: '03', icon: Crosshair },
  { id: 'nist', label: 'NIST CSF 2.0', shortLabel: 'NIST', part: '04', icon: Layers },
  { id: 'controls', label: 'Security controls', shortLabel: 'Controls', part: '05', icon: ShieldCheck },
  { id: 'roadmap', label: 'Roadmap', shortLabel: 'Roadmap', part: '06', icon: TrendingUp }
] as const;

type NavigationTab = (typeof NAVIGATION_ITEMS)[number]['id'];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('profile');
  const [embedMode, setEmbedMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo & Identity */}
          <button
            type="button"
            className="flex items-center space-x-3 text-left"
            onClick={() => setActiveTab('profile')}
            aria-label="AegisGuard Advisory home"
          >
            <span className="rounded-lg bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30">
              <Shield className="w-5 h-5" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 font-extrabold text-sm tracking-tight text-white">
                AegisGuard <span className="text-blue-400">Advisory</span>
              </span>
              <span className="block text-[10px] text-slate-400">Cyber risk &amp; resilience</span>
            </span>
          </button>

          {/* Navigation Items */}
          <nav aria-label="Engagement sections" className="hidden xl:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map(({ id, label, part, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={activeTab === id ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[10px] font-mono opacity-70">{part}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Action / Embed Mode Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEmbedMode(!embedMode)}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 text-xs flex items-center gap-1.5 transition-all"
              title={embedMode ? 'Exit Iframe Embed Focus' : 'Enter Iframe Embed Focus'}
            >
              {embedMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{embedMode ? 'Normal View' : 'Embed Mode'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <nav aria-label="Engagement sections" className="xl:hidden flex items-center space-x-1 px-4 py-2 overflow-x-auto border-t border-slate-900 bg-slate-950">
          {NAVIGATION_ITEMS.map(({ id, shortLabel, part }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
                activeTab === id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="mr-1 font-mono opacity-70">{part}</span>
              {shortLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'profile' && <FirmProfile />}
        {activeTab === 'assets' && <AssetRegister />}
        {activeTab === 'threats' && <ThreatModeling />}
        {activeTab === 'nist' && <NistAssessment />}
        {activeTab === 'controls' && <SecurityControls />}
        {activeTab === 'roadmap' && <ImprovementRoadmap />}
      </main>

      {/* Footer */}
      {!embedMode && (
        <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>University of Dhaka</span>
            <span>•</span>
            <span>Department of Management Information Systems</span>
            <span>•</span>
            <span>MPMIS 516: Information Systems Security</span>
          </div>
          <p>Academic scenario prepared for MPMIS 516 at the University of Dhaka. Nexor Digital Bank is hypothetical; this is not an independent audit or assurance opinion.</p>
          <p>© 2026 AegisGuard Cyber Advisory</p>
        </footer>
      )}
    </div>
  );
};

export default App;
