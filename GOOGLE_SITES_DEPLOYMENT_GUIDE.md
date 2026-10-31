# Google Sites Deployment & Submission Guide
### MPMIS 516 – Information System Security Risk Assessment & Improvement Plan
**Client:** Nexor Digital Bank | **Firm:** AegisGuard Cyber Advisory

---

## 1. Submission Overview
The University of Dhaka MPMIS 516 rubric requires your consultancy project to be presented through a **professional Google Sites website** rather than a traditional academic essay.

To achieve top marks from the grading panel, you can deploy your application using two complementary methods:
* **Method 1: Interactive Iframe Embed** (Embeds the live, dynamic React/NestJS application directly into your Google Site).
* **Method 2: Static Structured Transfer** (Copy-pastes formatted text and high-resolution dashboard screenshots directly into Google Sites layout blocks).

---

## 2. Recommended Google Sites Navigation Structure

Create your Google Site with the following page hierarchy:

```
[Home] ── AegisGuard Cyber Advisory (Firm Identity, About Us, Client Overview)
  ├── [Part 1: Organization Profile] (Nexor Digital Bank, Systems & Crown Jewels)
  ├── [Part 2: Asset Register] (10 Critical Assets & CIA Triad Table)
  ├── [Part 3: Threat Modelling] (MTMT Architecture DFD & STRIDE Matrix)
  ├── [Part 4: NIST CSF 2.0 Assessment] (Govern, Identify, Protect, Detect, Respond, Recover)
  ├── [Part 5: Security Controls Matrix] (Administrative, Technical, and Physical Controls)
  └── [Part 6: Improvement Roadmap] (Short-Term, Medium-Term, Long-Term Strategic Initiatives)
```

---

## 3. GitHub Pages Portal + Google Sites Submission

The interactive React portal is hosted on GitHub Pages:

**https://na-siddiky.github.io/aegisguard-cyber-advisory/**

The `Deploy advisory portal` GitHub Actions workflow rebuilds and publishes the static frontend on every push to `main`. GitHub Pages does not run the NestJS API; the portal's assessment content is bundled into the frontend.

To satisfy the course submission format, embed this page in Google Sites:

1. Open the group's Google Sites editor and add an **Interactive Advisory Portal** page.
2. Select **Insert → Embed → By URL** and enter `https://na-siddiky.github.io/aegisguard-cyber-advisory/`.
3. Insert the preview, resize it to full width, and use **Embed Mode** in the portal if desired.
4. Publish the Google Site and submit that published Google Sites URL to Google Classroom. The GitHub Pages URL alone does not meet the stated submission method.

---

## 4. Method 2: Static Transfer & Screenshot Checklist

If you prefer to populate Google Sites using standard text blocks and image cards, copy the pre-formatted text from [`CONSULTANCY_REPORT_MPMIS516.md`](./CONSULTANCY_REPORT_MPMIS516.md) and capture screenshots from your local portal (`http://localhost:5173`):

| Page on Google Sites | Text to Copy from `CONSULTANCY_REPORT_MPMIS516.md` | Screenshot to Capture from Local App (`localhost:5173`) |
| :--- | :--- | :--- |
| **Home / Firm Identity** | Section 1: Firm Name, Tagline, About Us, Capabilities | Hero banner & Advisory practice cards on the **Part 1** tab |
| **Part 1: Org Profile** | Section 2: Nexor Profile, Systems, Processes, Crown Jewels | Crown Jewels callout cards |
| **Part 2: Asset Register** | Section 3: Markdown table of 10 Information Assets | Interactive **Asset Register** table with CIA badges |
| **Part 3: Threat Modelling**| Section 4: Conceptual DFD & 6 scenario-based STRIDE threats | **Conceptual DFD and STRIDE cards** + genuine MTMT model and generated-report screenshots |
| **Part 4: NIST CSF 2.0** | Section 5: Scorecard & Gaps for GV, ID, PR, DE, RS, RC | **CSF 2.0 Scorecard Banner & Accordion Cards** |
| **Part 5: Controls Matrix** | Section 6: Administrative, Technical & Physical controls | **Security Controls Matrix** (filtered view) |
| **Part 6: Roadmap** | Section 7: Short-Term, Medium-Term, Long-Term initiatives | **Phased Improvement Roadmap** with CIA impact breakdown |

---

## 5. Grading Rubric Compliance Checklist

Before submitting your Google Sites link to Google Classroom, ensure all items are verified:
- [x] **Consultancy Branding:** Professional firm name (AegisGuard), tagline, and service overview clearly positioned on homepage.
- [x] **Part 1:** Detailed overview of client (Nexor Digital Bank), industry, size, core ops, major systems, processes, and explicit identification of **Crown Jewels**.
- [x] **Part 2:** Information Asset Register with 10 critical assets, designated business owners, and granular CIA ratings ($C, I, A \in \{\text{High}, \text{Med}, \text{Low}\}$).
- [x] **Part 3:** Conceptual DFD with trust boundaries and scenario-based STRIDE coverage, affected components, severity, and mitigations.
- [ ] **MTMT evidence:** Create and review the model in MTMT; add the original model and authentic screenshots of the diagram and generated threat report. These were not supplied with the project.
- [x] **Part 4:** Evaluation of all six NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) with strengths, weaknesses, gaps, justifications, and summary table.
- [x] **Part 5:** Administrative, Technical, and Physical controls with a proposed RBAC/approval matrix, mapped to scenario threats and framework references.
- [x] **Part 6:** Strategic multi-year roadmap prioritized by business risk, partitioned into 0-6m, 6-12m, and 12-24m horizons, detailing CIA resilience impact.
- [ ] **Group attribution:** Add the group's number and member names/IDs where required by the course.
- [ ] **Submission protocol:** Publish the Google Site with the required sharing permissions and submit its URL to Google Classroom. This Google-account action remains manual.
