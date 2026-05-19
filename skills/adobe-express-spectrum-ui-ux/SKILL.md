---
name: adobe-express-spectrum-ui-ux
description: Build or review Adobe Express add-on panel UI with Spectrum patterns, stack selection guidance (raw SWC, swc-react, React Spectrum), Express theme setup, state and navigation design, and actionable UX quality checks. Use when implementing or auditing panel layouts, interaction states, multi-screen flows, and accessibility.
---

# Adobe Express Spectrum UI and UX Skill

Build or review panel UI with Adobe Express-native Spectrum patterns, predictable state handling, and clear user feedback.

## When to Use This Skill

- Choosing between raw Spectrum Web Components, swc-react, and React Spectrum
- Setting up or fixing Express theme usage (`theme`, `scale`, `color`)
- Designing or refactoring multi-screen panel flows and UI state transitions
- Reviewing loading, empty, disabled, error, and success states
- Auditing UI consistency and accessibility before release

## What to Inspect First

- Current UI stack in the repo (raw SWC, swc-react, or React Spectrum)
- Theme imports and panel wrapper (`sp-theme` or `Theme` from swc-react)
- Existing navigation model (single `location` state, step state, router, or conditional rendering)
- Existing feedback patterns (toasts, progress, inline validation, disabled explanations)

## Decision Guide

- Prefer **raw Spectrum Web Components** for non-React or minimal panel surfaces.
- Prefer **swc-react** for React repos using Spectrum Web Components through React wrappers.
- Use **React Spectrum** only when the repo already depends on it or there is a strong reason.
- Do not mix multiple Spectrum approaches in one panel unless migration is intentional and scoped.

## Workflow

1. Confirm the active UI stack and keep consistency with the existing codebase.
2. Verify Express theming is applied correctly before changing components.
3. Map screen flow and transitions first (home/import/map/apply/settings/status, or equivalent).
4. Implement or refine state handling for `idle`, `loading`, `empty`, `error`, `disabled`, and `success`.
5. Ensure each long-running action provides clear feedback (progress, busy state, completion, error path).
6. Query MCP for component APIs and accessibility behavior before introducing new primitives.

## MCP Prompt Patterns

Use explicit prompts so agents fetch official guidance before coding:

- "Use `mcp_adobe-express_get_relevant_documentations` to retrieve Adobe Express UX and implementation guidance for panel UI."
- "Use `mcp_adobe-express_get_relevant_documentations` to find Spectrum accessibility guidance for dropdown and keyboard interactions."
- "Use `mcp_adobe-express_get_typedefinitions` with `api_type=iframe-ui` before generating panel-side TypeScript code."

If your host supports tagged tool invocation:

- `#mcp_adobe-express_get_relevant_documentations Spectrum Web Components theme and panel UX guidance`
- `#mcp_adobe-express_get_typedefinitions api_type=iframe-ui`

## Checks

- Do not change UI stack unless there is a clear migration plan.
- Do not ship screens without loading, empty, and failure feedback.
- Do not hide blocked actions without explaining why users cannot proceed.
- Do not couple navigation state to unrelated side effects.

## Common Pitfalls

- Mixing React Spectrum and swc-react in the same panel with no clear boundary.
- Missing Express theme imports, resulting in inconsistent typography and component appearance.
- Building multi-step flows without explicit transition rules, causing stale or broken state.
- Showing only toast-level errors for field-level validation problems.

## Validation Checklist

- Does the panel follow one clear Spectrum stack strategy?
- Is Express theme configured and visible across screens?
- Are navigation transitions deterministic and reversible where needed?
- Are loading, empty, disabled, and error states visible and actionable?
- Is keyboard and focus behavior acceptable for core actions?

## Progressive References

- [UI Stack Guide](./references/ui-stack-guide.md) - Raw SWC vs swc-react vs React Spectrum, plus theme rules.
- [State and Navigation Patterns](./references/state-and-navigation-patterns.md) - Multi-screen flow and state design patterns (including Bulk Designer style).
- [Sample Walkthroughs](./references/sample-walkthroughs.md) - Official sample patterns to copy for real panel implementations.

## Expected Output

- stack choice rationale
- theme verification notes
- state and navigation plan
- feedback/accessibility checklist
- minimal implementation change plan

## Skill Handoffs

Pass to other skills when:

- **Architecture questions** → adobe-express-core
- **Document manipulation triggered from button click** → adobe-express-document-manipulation
- **OAuth login flow** → adobe-express-oauth-authentication
- **Paywall or checkout UI** → adobe-express-monetization

## References

- [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)
- [Adobe Express UX Guidelines](https://developer.adobe.com/express/add-ons/docs/guides/build/design/ux_guidelines/)
- [Adobe Express Code Samples](https://github.com/AdobeDocs/express-add-on-samples)
