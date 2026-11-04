# Hermes — Implementation and Finalization Plan

## 1. Objective

Prepare the Hermes Currency Exchange App for final academic delivery.

The objective is to correct identified functional problems, improve automated verification, complete technical documentation, and organize the remaining manual validation tasks.

The implementation must follow:

- The original assignment in Notion: `[Projeto 01] Currency Exchange App`.
- `AGENTS.md`.
- `documentation/REQUIREMENTS.md`.
- `documentation/COMPONENTS.md`.
- `documentation/New Styles/HERMES_UI_SPEC.md`.

The existing architecture and visual design should be preserved whenever possible.

## 2. Execution Rules

Before starting:

1. Inspect the Git status and preserve existing uncommitted changes.
2. Read `AGENTS.md` and the relevant project documentation.
3. Inspect the current implementation instead of relying exclusively on previous audit findings.
4. Check whether missing files exist elsewhere in the local workspace before creating replacements.
5. Present the proposed changes if they involve architectural decisions or additional dependencies.

During implementation:

- Make small, focused changes.
- Avoid unrelated refactoring.
- Do not redesign the interface.
- Do not replace the current API integration with mock data.
- Do not invent academic evidence or personal contributions.
- Do not commit or push changes without explicit authorization.

After each phase, report modified files, verification results, and remaining issues.

---

## Phase 0 — Baseline Inspection

### Objective

Confirm the current state before modifying anything.

### Tasks

- [ ] Inspect Git status and current branch.
- [ ] Inspect the current `package.json`.
- [ ] Inspect the application entry point and main components.
- [ ] Review the currency converter implementation.
- [ ] Review the filtering, sorting, and CSV utilities.
- [ ] Review existing API hooks and error states.
- [ ] Check existing documentation and referenced files.
- [ ] Identify whether any automated JavaScript tests already exist.
- [ ] Confirm whether the Postman Collection exists elsewhere in the local workspace.

### Expected result

A short baseline report identifying:

- Confirmed bugs.
- Existing functionality that already works.
- Missing files.
- Dependencies and available scripts.
- Potential risks before implementation.

Do not modify application files during this phase.

---

## Phase 1 — Functional Corrections

### 1.1 Currency Converter

**Problem:** The Converter button currently has no `onClick` handler.

The amount is already recalculated automatically using the latest exchange rate, but the button is visually presented as the primary conversion action.

Tasks:

- [ ] Review the current conversion flow and original acceptance criteria.
- [ ] Decide on the smallest consistent solution that gives the Converter button a meaningful behavior.
- [ ] Preserve the current API request strategy. Changing the amount must not trigger an unnecessary exchange-rate request.
- [ ] Ensure the amount validation is respected.
- [ ] Preserve the existing currency-swap behavior.
- [ ] Verify that invalid amounts and identical currencies never produce misleading results.

Do not add a second API request merely to make the button functional.

**Acceptance criteria:**

- The primary action performs a meaningful operation.
- Conversion continues to use the selected pair's actual exchange rate.
- Invalid inputs are rejected.
- The entered amount is preserved when currencies are swapped.
- No unnecessary API requests are introduced.

### 1.2 Filter Validation

**Problem:** Invalid filter ranges are detected, but the filtering function can still apply them and display an empty result.

Tasks:

- [ ] Review `src/utils/filterRates.js`.
- [ ] Review `src/hooks/useRateFilters.js`.
- [ ] Ensure invalid date ranges are not silently applied.
- [ ] Ensure invalid rate ranges are not silently applied.
- [ ] Preserve valid individual filters.
- [ ] Preserve inclusive date and rate boundaries.
- [ ] Preserve combined filters using AND logic.
- [ ] Ensure clearing filters restores the original dataset.

**Acceptance criteria:**

- Invalid ranges display the appropriate validation message.
- Invalid filters do not produce misleading table results.
- Valid filters continue to work individually and together.
- Clearing filters restores all records.

### 1.3 Date Input Internationalization

**Problem:** The English interface displays `mm/dd/yyyy`, but the current parser accepts Brazilian `dd/mm/yyyy` and ISO dates.

Tasks:

- [ ] Review date placeholders in `src/constants/i18n.js`.
- [ ] Review the date parser in `src/utils/filterRates.js`.
- [ ] Implement locale-aware date parsing or adopt a single consistent input format.
- [ ] Keep ISO dates as the internal representation.
- [ ] Ensure Portuguese, English, and Spanish interfaces use consistent validation messages.
- [ ] Test invalid dates, leap years, and impossible calendar dates.

**Acceptance criteria:**

- A valid date in the displayed format is accepted.
- Invalid dates are rejected.
- Date filtering behaves consistently across all supported languages.

---

## Phase 2 — Automated Functional Tests

### Objective

Create reproducible tests for the application's most important business logic.

First inspect the repository to confirm whether a test framework already exists.

If none exists, evaluate adding Vitest with the minimum required configuration.

Do not introduce a large testing framework or unnecessary dependencies.

### Functions to cover

| Functionality | Suggested tests |
|---|---|
| Currency conversion | Positive values, decimals, invalid amounts, missing rates |
| Amount validation | Empty, zero, negative, text, comma and period decimals |
| Date parsing | Brazilian, English, ISO, invalid and leap-year dates |
| Rate filtering | Individual filters, combined filters and inclusive boundaries |
| Filter validation | Invalid dates and invalid rate ranges |
| Sorting | Date and rate, ascending and descending |
| CSV generation | Headers, separators, escaping, BOM compatibility and line endings |
| CSV export | Filtered records, sorted records and empty datasets |

### Tasks

- [ ] Define the test framework and configuration.
- [ ] Add a `test` script to `package.json` if necessary.
- [ ] Create tests for pure utility functions.
- [ ] Cover edge cases and invalid inputs.
- [ ] Ensure tests do not depend on live API availability.
- [ ] Document how to run the tests.

### Expected files

- Test configuration, if needed.
- Test files organized by utility or functionality.
- `documentation/FUNCTION_TESTS.md`.

**Acceptance criteria:**

- Automated tests execute successfully.
- The most important business rules have reproducible tests.
- Tests use controlled data and do not depend on live exchange rates.
- `npm run lint` and `npm run build` remain successful.

---

## Phase 3 — Technical Documentation

### 3.1 README.md

**Problem:** The current README is still the default React + Vite template.

Tasks:

- [ ] Replace the default content with a Hermes project introduction.
- [ ] Explain the application's purpose.
- [ ] Describe its main features.
- [ ] List technologies and dependencies.
- [ ] Explain installation and execution.
- [ ] Explain the project structure.
- [ ] Describe the Frankfurter integration.
- [ ] Add screenshots only if real images are available.
- [ ] Add the repository and Figma links only when verified.

Suggested sections:

1. Project overview.
2. Features.
3. Technologies.
4. Installation.
5. Running locally.
6. Project structure.
7. API integration.
8. Documentation and references.
9. Screenshots.

### 3.2 COMPONENTS.md

Tasks:

- [ ] Compare the document with the current source code.
- [ ] Correct outdated descriptions.
- [ ] Ensure component props and responsibilities match the implementation.
- [ ] Ensure hooks and utilities are documented accurately.

Do not rewrite sections that are already correct.

### 3.3 REQUIREMENTS.md

Tasks:

- [ ] Compare the document against the original Notion assignment.
- [ ] Verify that functional and non-functional requirements are represented.
- [ ] Ensure the acceptance criteria match the actual application.
- [ ] Keep implementation status separate from desired behavior.
- [ ] Identify any requirements that remain unverified.

### 3.4 FIGMA.md

Tasks:

- [ ] Review the existing design documentation.
- [ ] Confirm that it matches the current design system.
- [ ] Identify whether the actual Figma prototype URL is missing.
- [ ] Leave a clearly marked placeholder if the URL cannot be recovered.

Do not invent a Figma URL or claim that a prototype was delivered without evidence.

### 3.5 API_TESTS.md

Tasks:

- [ ] Compare documented endpoint behavior with the current service implementation.
- [ ] Verify endpoint names and parameters.
- [ ] Verify documented response structures.
- [ ] Ensure the documentation does not claim that tests were executed unless evidence exists.
- [ ] Correct references to missing evidence files.

### Acceptance criteria

The technical documentation must describe the current repository accurately, with no outdated implementation claims.

---

## Phase 4 — Postman Collection and AI Usage Record

### 4.1 Postman Collection

**Problem:** `API_TESTS.md` references a Collection that was not found in the repository tree.

Tasks:

- [ ] Search the local workspace for an existing Postman Collection.
- [ ] If found, inspect it and verify that it matches the documented endpoints.
- [ ] If it is not found, report the missing artifact to the author.
- [ ] Do not recreate a Collection and claim it is the original.
- [ ] If explicitly authorized, prepare a new Collection based on the verified API tests.

Expected location:

`postman/Currency-Exchange-Frankfurter.postman_collection.json`

The author must import and execute the Collection in Postman to confirm its results before submission.

### 4.2 AI_USAGE.md

**Problem:** Several fields remain placeholders.

The AI can improve the structure and consistency of the document, but it cannot invent the author's personal history.

Tasks:

- [ ] Remove outdated descriptions of the API integration.
- [ ] Update the implementation status to match the current code.
- [ ] Correct descriptions of the chart and data flow.
- [ ] Identify all remaining placeholders.
- [ ] Separate confirmed information from information requiring author confirmation.
- [ ] Preserve the existing records unless there is evidence supporting a correction.

The following items require the author's input:

- Actual AI usage before the OpenCode implementation.
- What the author personally reviewed or changed.
- What was completed without AI.
- Personal reflection about the learning process.
- Confirmation about whether personal data or credentials were shared.

Do not fill these sections by guessing.

---

## Phase 5 — Final Verification

### Automated verification

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run test`, if the test script is configured.

### Manual verification

These tasks require the author to inspect the application in a browser or external tool.

- [ ] Currency conversion.
- [ ] Currency swapping.
- [ ] All eight historical periods.
- [ ] Graph and table consistency.
- [ ] Individual and combined filters.
- [ ] Sorting.
- [ ] CSV download and contents.
- [ ] Invalid inputs.
- [ ] API loading state.
- [ ] API error and retry.
- [ ] Empty historical data.
- [ ] PT, EN, and ES.
- [ ] Responsive layout at mobile, tablet, and desktop widths.
- [ ] Keyboard navigation and visible focus.
- [ ] Installation and execution from the README.

### Final repository review

- [ ] No accidental generated files.
- [ ] No uncommitted changes overwritten.
- [ ] No obsolete documentation references.
- [ ] All required documents present.
- [ ] Postman Collection included.
- [ ] Figma URL confirmed.
- [ ] Screenshots and evidence included where required.
- [ ] Git history preserved.

---

## 3. Work That Requires Author Participation

The AI may prepare the work, but the following cannot be considered complete without the author's confirmation:

| Task | AI contribution | Author responsibility |
|---|---|---|
| Figma | Update documentation structure | Provide and verify the actual prototype URL |
| Postman | Inspect or prepare the Collection | Execute and validate the requests |
| AI usage | Organize and correct technical descriptions | Confirm personal history and reflection |
| Visual validation | Identify layout risks and inspect CSS | Confirm actual browser appearance |
| Final submission | Check repository completeness | Confirm links and submit the deliverables |

## 4. Final Definition of Done

The project can be considered ready for delivery when:

1. All identified functional issues are corrected.
2. Automated tests cover the core business logic.
3. Lint and production build pass.
4. The application passes the manual verification checklist.
5. Documentation matches the current implementation.
6. The Postman Collection is included and validated.
7. The Figma prototype link and required evidence are available.
8. The AI usage declaration is complete and accurate.
9. The GitHub repository is public and preserves the development history.

The AI must produce a final report with:

- Completed tasks.
- Files created or modified.
- Tests executed and their actual results.
- Tasks requiring author participation.
- Remaining risks or limitations.

Do not declare the project ready if any mandatory delivery requirement remains unverified.