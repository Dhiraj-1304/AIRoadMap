# Futuristic AI Generator Page Implementation Plan

This document outlines the plan to build the core AI Roadmap Generator page, following a premium, glassmorphism-heavy, dark futuristic design.

## Goal Description
Create a responsive, highly polished AI Roadmap Generator page (`/generate`). The page will feature a 2-column layout on desktop:
1. **Left Panel (35%)**: A sticky AI configuration form with modern inputs (chips, custom cards, sliders) for the user to input their learning preferences.
2. **Right Panel (65%)**: An interactive AI-generated roadmap preview panel. It will feature an empty state, a simulated "AI generating" loading state, and a final vertical timeline displaying the generated roadmap phases.

## Open Questions
- Is there any specific mock data you'd like to use for the generated roadmap, or should I construct a realistic frontend developer roadmap for the preview?
- Do you want the "DashboardNavbar" to replace the main `Navbar` across the whole app, or only appear on the `/generate` route?

## Proposed Changes

### Routing & Setup
#### [MODIFY] `src/App.jsx`
- Add the `/generate` route pointing to the new `AIGenerator` page.
- Add an `AppLayout` wrapper to ensure the new minimalist topbar is used on dashboard pages.

### Components
#### [NEW] `src/components/AIGenerator/DashboardNavbar.jsx`
- Minimal top navigation (Logo, Dashboard, My Roadmaps, Profile Avatar) using glassmorphism.

#### [NEW] `src/pages/AIGenerator.jsx`
- The main page container.
- Implements the animated grid background and floating glowing elements.
- Handles the state management (form data, `isGenerating`, `isGenerated`) and passes data between the left and right panels.

#### [NEW] `src/components/AIGenerator/ConfigForm.jsx`
- Left panel form using glassmorphism.
- Custom styled inputs:
  - Career Goal (Dropdown).
  - Skill Level (Selectable cards).
  - Duration/Hours (Styled range inputs).
  - Interests (Clickable chips).
  - Learning Style (Selectable cards).
- Glowing gradient CTA button with disabled/loading states.

#### [NEW] `src/components/AIGenerator/RoadmapPreview.jsx`
- Right panel logic.
- Empty State: Clean placeholder illustration and text.
- Loading State: Framer Motion sequence showing AI typing/analyzing text ("Analyzing goals...", "Generating roadmap...").
- Generated State: Vertical timeline mapping out the phases.

#### [NEW] `src/components/AIGenerator/PhaseCard.jsx`
- Individual roadmap nodes.
- Includes phase title, topics, suggested project, resource chips, and progress indicator.
- Reveal animations on load.

## Verification Plan
### Automated Tests
- Run `npm run build` to ensure no TypeScript or Vite build errors exist.

### Manual Verification
- Review the `/generate` route in the browser.
- Test responsiveness (stacking vertically on mobile).
- Ensure all form controls are interactive and visually clear.
- Click the "Generate AI Roadmap" button and verify the loading sequence and timeline animations trigger smoothly.
