# State and Navigation Patterns

This guide captures practical panel patterns for multi-screen add-ons, including patterns observed in Bulk Designer-style flows.

## Multi-Screen Flow Pattern

Use one top-level navigation state for panel screens and keep transitions explicit.

Common screen groups:

- onboarding/import
- mapping/connection
- preview/apply
- settings
- status/completion

Pattern:

- Keep current location state at app root.
- Track previous location only when back navigation is required.
- Pass `setLocation` down as an explicit transition function.
- Keep transition side effects (save session, validation, cache preload) close to transition boundaries.

## State Ownership Pattern

Keep shared workflow state in the app shell:

- source data and filtered views
- mapping/binding state
- generation state and selected record
- flow origin/context flags
- update/notification modal state

Keep local component state for screen-specific concerns:

- modal open flags
- temporary form edits
- in-flight async state for that screen

## Required UI States Per Screen

Plan these states up front:

- idle
- loading
- empty
- error
- disabled/gated
- success/completed

Do not rely on a single global toast for all failures. Pair global feedback with local inline explanations.

## Async and Feedback Rules

- Mark long-running operations with progress indicators.
- Disable actions during in-flight operations when duplicate submits can break flow.
- Show completion state before redirecting users away from result screens.
- Preserve recoverable context after errors (user should retry, not restart whole flow).

## Navigation Checks

- Every forward transition should have preconditions.
- Every blocked action should explain why it is blocked.
- Every exit path should define what state is retained versus cleared.
- Back navigation should not silently discard expensive user input.

## Bulk Designer-Inspired Patterns to Reuse

- App-shell controlled page switching using a single location key.
- Session-backed recovery for partially completed flows.
- Explicit flow origin flags to branch completion behavior.
- Dedicated status screen for long operations with completion handoff.
- Optional update notification modal managed separately from page flow.

## Anti-Patterns

- Screen components mutating global state without clear ownership.
- Implicit transitions triggered deep inside utility helpers.
- Overloaded state objects with unrelated concerns and no transition discipline.
- Transitioning to next screen before required validation/data hydration finishes.
