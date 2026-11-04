# Hermes Currency Exchange App — Project Instructions

## 1. Project Overview

Hermes is an individual academic project built with React and JavaScript.

It is a Single Page Application (SPA) for currency conversion and exchange-rate analysis, using the public Frankfurter REST API.

The application must allow users to:

- Select source and target currencies.
- Enter an amount and calculate its converted value.
- View the exchange rate and its effective date.
- Swap the selected currencies.
- Explore historical exchange rates across different periods.
- Visualize historical data in a chart.
- Filter and sort historical records in a table.
- Export filtered records to CSV.
- Use the interface in Portuguese, English, and Spanish.

The project is academic. Prefer understandable, maintainable solutions that demonstrate the concepts covered in class instead of unnecessary abstractions or overengineering.

## 2. Technology Stack

- React
- JavaScript (ES Modules)
- JSX
- Vite
- CSS Modules
- Tailwind CSS v4
- Lucide React
- Frankfurter API v2
- Git and GitHub
- Postman for API investigation and validation

Do not introduce new dependencies unless they provide a clear benefit and are compatible with the project's requirements.

## 3. Project Structure

Follow the existing organization:

- `src/components/atoms/`: small, reusable UI components.
- `src/components/molecules/`: components combining smaller elements.
- `src/components/organisms/`: larger sections of the application.
- `src/hooks/`: reusable React hooks and data-fetching logic.
- `src/services/`: external API communication.
- `src/utils/`: pure functions and reusable business logic.
- `src/constants/`: application defaults, labels, translations, and fixed values.
- `src/styles/`: global design tokens.
- `src/mocks/`: mock data used as fixtures or development references.
- `documentation/`: project specifications and technical documentation.

Keep the existing Atomic Design organization unless a concrete technical reason justifies changing it.

## 4. Architecture and Responsibilities

### Application state

- Keep shared application state in `src/App.jsx` when it is consumed by multiple sections.
- Use `useState` for interactive state.
- Use `useEffect` for synchronization and side effects.
- Use custom hooks for reusable data-fetching and stateful logic.
- Prefer derived values with `useMemo` only when appropriate.
- Avoid duplicating state that can be derived from existing values.

### Components

- Components should receive data and callbacks through props.
- Keep components focused on presentation and user interaction.
- Avoid placing API requests directly inside UI components.
- Extract reusable business logic into hooks or utilities.
- Preserve existing component responsibilities and naming conventions.

### API integration

- All Frankfurter API communication must remain in `src/services/frankfurterApi.js`.
- Response normalization belongs in `src/services/frankfurterAdapters.js`.
- Data-fetching hooks belong in `src/hooks/`.
- Preserve the existing request cancellation, retry, and stale-response protection mechanisms.
- Handle loading, success, empty, and error states.
- Do not assume that every date has a published exchange rate.
- Do not expose raw API errors directly to the user.

### Business logic

Keep reusable calculations and transformations in `src/utils/`.

Examples:

- Currency conversion.
- Input validation.
- Date-range calculations.
- Filtering and sorting.
- Number and date formatting.
- CSV generation and download.

Prefer pure functions when possible.

## 5. Code Conventions

- Use JavaScript and JSX, not TypeScript, unless explicitly requested.
- Use functional React components and React Hooks.
- Use ES module imports and exports.
- Follow the formatting and naming conventions already present in the repository.
- Use descriptive variable and function names.
- Use `camelCase` for variables and functions.
- Use `PascalCase` for React components.
- Keep components and their CSS Modules together in their existing directories.
- Avoid unnecessary comments. Add comments when they explain a non-obvious decision or constraint.
- Do not duplicate existing utilities or components without a clear reason.
- Do not add abstractions solely to reduce a small amount of code.

## 6. Styling and Design System

The visual source of truth is:

`documentation/New Styles/HERMES_UI_SPEC.md`

Design tokens are defined in:

`src/styles/tokens.css`

Follow these rules:

- Use existing design tokens instead of introducing arbitrary colors or spacing values.
- Preserve the navy, blue, canvas, surface, border, and muted color system.
- Preserve the Manrope typography.
- Keep controls consistent with the existing 48px sizing and 10px radius.
- Preserve the existing desktop, tablet, and mobile breakpoints.
- Avoid horizontal scrolling on the page itself.
- Allow internal scrolling only where specified, such as the period selector and data table.
- Preserve visible focus states and accessible interaction feedback.
- Do not introduce gradients, glassmorphism, or unnecessary shadows.
- Use Lucide React for icons when an icon is required.

Do not redesign the interface unless the task explicitly requests a design change.

## 7. Internationalization

The application supports:

- PT: Brazilian Portuguese.
- EN: English.
- ES: Spanish.

Translation labels are maintained in `src/constants/i18n.js`.

Rules:

- Do not hardcode user-facing text inside components when a translation already exists.
- Update all three languages when adding or changing interface text.
- Preserve ISO 4217 currency codes.
- Use the existing formatting utilities for dates, numbers, currencies, and rates.
- Keep the document language synchronized with the selected interface language.
- Verify date input parsing against the expected format for each language.

## 8. Functional Requirements

Use `documentation/REQUIREMENTS.md` as the detailed functional specification.

Important rules include:

- The application calculates the converted amount using the selected pair's exchange rate.
- Source and target currencies must be different.
- The amount must be a valid number greater than zero.
- Both comma and period must be accepted as decimal separators where appropriate.
- Swapping currencies must preserve the entered amount and update the selected pair's data.
- The chart and table must represent the same historical dataset.
- All eight periods must remain available: 7D, 15D, 30D, 3M, 6M, 1A, 5A, and 10A.
- Table filters must be combinable.
- Invalid filter ranges must not silently produce misleading results.
- Sorting must support date and rate in ascending and descending order.
- CSV must contain exactly the filtered and sorted records.
- CSV must use localized headers, UTF-8 BOM, semicolon separators, and CRLF line endings.
- Empty CSV exports must be prevented.

## 9. Documentation

Keep documentation consistent with the actual implementation.

Relevant files:

- `README.md`
- `documentation/REQUIREMENTS.md`
- `documentation/COMPONENTS.md`
- `documentation/FIGMA.md`
- `documentation/API_TESTS.md`
- `documentation/AI_USAGE.md`

If a required document is missing, identify it before creating it.

Never invent:

- Figma links or prototype evidence.
- Postman execution results.
- Test execution results.
- Screenshots or browser validation.
- Personal contributions made by the project author.
- Personal reflections about AI usage.

When information requires confirmation from the author, leave a clearly identified placeholder and explain what must be provided.

Documentation must describe the current implementation, not an outdated development stage.

## 10. Testing and Verification

The project currently defines these npm scripts:

- `npm run dev`: start the development server.
- `npm run lint`: run ESLint.
- `npm run build`: generate the production build.
- `npm run preview`: preview the production build.

After modifying code:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Run relevant functional checks when available.
4. Report exactly which checks were executed and their results.

Do not claim that a test passed if it was not executed.

If no automated test suite exists for a relevant feature, identify that gap and recommend an appropriate test.

## 11. AI Development Workflow

Before making changes:

1. Inspect the relevant files.
2. Read the corresponding requirements and documentation.
3. Understand the existing implementation.
4. Identify the smallest reasonable change.
5. Check whether the proposed change affects other components or requirements.

While implementing:

- Prefer minimal, focused changes.
- Preserve existing behavior unless it is explicitly incorrect or the task requires changing it.
- Do not rewrite entire files or components unnecessarily.
- Do not introduce unrelated refactors.
- Do not remove existing functionality without justification.
- Do not modify visual design while fixing unrelated logic.

After implementing:

1. Review the diff.
2. Run the relevant verification commands.
3. Check for regressions.
4. Update documentation if behavior or architecture changed.
5. Summarize files modified, decisions made, tests executed, and remaining limitations.

## 12. Git Workflow

- Use descriptive semantic commit messages, such as `feat:`, `fix:`, `refactor:`, `docs:`, and `test:`.
- Do not rewrite Git history.
- Do not force-push.
- Do not commit or push changes unless explicitly requested by the project author.
- Do not overwrite uncommitted user changes.
- Inspect the current Git status before making changes.

## 13. Communication

Communicate in Brazilian Portuguese unless the author requests another language.

When explaining technical decisions:

- Be direct and objective.
- Explain why a change is necessary.
- Distinguish confirmed problems from assumptions.
- Identify risks and possible regressions.
- Prefer beginner-friendly explanations when discussing React or JavaScript concepts.

The goal is to produce a working, understandable, well-documented academic project that satisfies the original assignment without unnecessary complexity.