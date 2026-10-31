# AegisGuard Cyber Advisory Portal
**Client Engagement:** Nexor Digital Bank | **Assessment:** MPMIS 516 (Information Systems Security)  
**Institution:** University of Dhaka, Department of Management Information Systems

---

## 1. System Architecture Overview
This project is an academic case study for **MPMIS 516: Information Systems Security**. The AegisGuard consultancy and Nexor Digital Bank are hypothetical; organization details and security practices are scenario assumptions, not independently verified facts. The static React portal is self-contained for GitHub Pages. A NestJS API is also available for local demonstration, but the published Pages site does not run that backend.

```
MIS/ (Monorepo Root)
├── apps/
│   ├── api/                           # NestJS Backend (REST API)
│   │   ├── src/
│   │   │   ├── profile/               # Part 1: Organization Profile & Crown Jewels
│   │   │   ├── assets/                # Part 2: Information Asset Register (CIA Triad)
│   │   │   ├── threats/               # Part 3: MTMT System DFD & STRIDE Threat Models
│   │   │   ├── nist/                  # Part 4: NIST Cybersecurity Framework (CSF) 2.0
│   │   │   ├── controls/              # Part 5: Administrative, Technical & Physical Controls
│   │   │   ├── roadmap/               # Part 6: Phased Strategic Security Roadmap
│   │   │   ├── app.module.ts
│   │   │   └── main.ts                # Port 3000 (CORS & Embed Enabled)
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── client/                        # React Frontend (Vite + Tailwind CSS + Lucide)
│       ├── src/
│       │   ├── components/
│       │   │   ├── FirmProfile.tsx    # Branding & Client Profile View
│       │   │   ├── AssetRegister.tsx  # Interactive Asset Register Table
│       │   │   ├── ThreatModeling.tsx # MTMT DFD & STRIDE Matrix
│       │   │   ├── NistAssessment.tsx # NIST CSF 2.0 Scorecard & Gaps
│       │   │   ├── SecurityControls.tsx# Tripartite Security Controls Matrix
│       │   │   └── ImprovementRoadmap.tsx# Strategic Roadmap (0-6m, 6-12m, 12-24m)
│       │   ├── App.tsx                # Master Container & Google Sites Embed Mode
│       │   ├── main.tsx
│       │   └── index.css
│       ├── package.json
│       └── vite.config.ts             # Port 5173
├── CONSULTANCY_REPORT_MPMIS516.md     # Case-study report and assessment evidence notes
├── GOOGLE_SITES_DEPLOYMENT_GUIDE.md   # Deployment & embedding walkthrough for submission
├── start.sh                           # Cluster bootstrapper
└── package.json                       # Root workspaces configuration
```

---

## 2. Local Execution Quickstart

### Step 1: Boot the Cluster
Make sure the bootstrap script has execution privileges and start the system:
```bash
chmod +x start.sh
./start.sh
```

### Step 2: Access Endpoints
* **Advisory Portal UI:** [http://localhost:5173](http://localhost:5173)
* **Backend API Root:** [http://localhost:3000](http://localhost:3000)
  * `GET /api/profile` - Firm branding & client organization profile
  * `GET /api/assets` - Information Asset Register with CIA Triad scores
  * `GET /api/threats` - MTMT STRIDE threat matrix & mitigations
  * `GET /api/threats/dfd` - Data Flow Diagram element decomposition
  * `GET /api/nist` - NIST CSF 2.0 evaluation across all 6 functions
  * `GET /api/controls` - Security control matrix (Admin, Tech, Physical)
  * `GET /api/roadmap` - Phased strategic improvement roadmap

---

## 3. GitHub Pages Deployment

The `aegisguard-cyber-advisory` repository is configured to build the React portal and publish it to GitHub Pages on pushes to `main`. The live portal is:

**https://na-siddiky.github.io/aegisguard-cyber-advisory/**

To build locally for the project-page URL:

```bash
VITE_BASE_PATH=/aegisguard-cyber-advisory/ npm run build --workspace=apps/client
```

GitHub Pages hosts the static frontend only. The site content is bundled at build time; it does not depend on the local NestJS server.

---

## 4. Google Sites Submission

The assessment instructions require a **published Google Sites website**. Use GitHub Pages as the interactive portal host, embed that portal in your Google Site, and submit the published **Google Sites URL** to Google Classroom—not the GitHub Pages URL alone.

**Published site:** https://sites.google.com/view/aegisguard-cyber-advisory

The site is publicly viewable and includes the six assessment sections plus the embedded advisory portal. The assignment group must still add its group number/member attribution and genuine MTMT model/report evidence, then submit the Google Sites URL to Google Classroom.

---

## 5. Assessment Modules Coverage Matrix

| MPMIS 516 Part | Assessment Requirement | Backend Route | React Component |
| :--- | :--- | :--- | :--- |
| **Firm Identity** | Consultancy Name, Tagline & Services | `GET /api/profile` | `FirmProfile.tsx` |
| **Part 1** | Client Org Profile & Crown Jewels | `GET /api/profile` | `FirmProfile.tsx` |
| **Part 2** | Information Asset Identification (CIA Triad) | `GET /api/assets` | `AssetRegister.tsx` |
| **Part 3** | Threat Modelling (MTMT & STRIDE) | `GET /api/threats` | `ThreatModeling.tsx` |
| **Part 4** | NIST Cybersecurity Framework (CSF) 2.0 | `GET /api/nist` | `NistAssessment.tsx` |
| **Part 5** | Security Controls (Admin, Tech, Physical) | `GET /api/controls` | `SecurityControls.tsx` |
| **Part 6** | Prioritized Strategic Improvement Roadmap | `GET /api/roadmap` | `ImprovementRoadmap.tsx` |

## 6. Evidence and Limitations

- The threat model on the portal is a **conceptual DFD and scenario-based STRIDE analysis**. It is not an MTMT export.
- No MTMT source model or generated-report screenshots were supplied. Add genuine evidence after creating and reviewing the model in Microsoft Threat Modeling Tool.
- The NIST scores use an internal 1–5 discussion scale. NIST CSF 2.0 does not prescribe these scores; they are not Implementation Tiers, certification, or an audit opinion.
- Add the group's number and member attribution where required by the course before final submission.
- The Google Site is published and publicly viewable. Classroom submission, group attribution, and authentic MTMT evidence remain manual assessment-group actions.
- The local-only API dependency graph currently reports 7 production dependency advisories (3 high, 4 moderate) with `npm audit --omit=dev`. The API is not deployed to GitHub Pages; do not expose it publicly until those dependencies are remediated.
