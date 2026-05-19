# Sample Walkthroughs

Use these walkthroughs to copy proven UI structure and state behavior instead of inventing patterns from scratch.

## Table of Contents

- dialog-add-on sample
- import-images-using-oauth sample
- communication iframe/document sandbox sample
- Bulk Designer implementation cues

## dialog-add-on sample

Source:

- https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/dialog-add-on

What it demonstrates:

- compact panel layout with clear primary actions
- explicit SDK-driven dialog invocation
- visible busy/idle state around dialog actions

What to copy:

- keep action labels short and task-oriented
- expose operation status while async work runs
- prefer SDK primitives over ad hoc modal behavior

## import-images-using-oauth sample

Source:

- https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-using-oauth/src/components

What it demonstrates:

- component separation by responsibility (connection, asset list, shell)
- auth-gated UX before primary workspace
- swc-react-first component usage in React

What to copy:

- split panel into auth gate, work area, and shared frame
- keep top-level state where multiple subviews depend on it
- avoid mixing unrelated UI libraries in the same flow

## communication iframe/document sandbox sample

Source:

- https://github.com/AdobeDocs/express-add-on-samples/tree/main/document-sandbox-samples/communication-iframe-documentSandbox

What it demonstrates:

- strict runtime ownership boundaries
- explicit bridge methods for panel-triggered document operations

What to copy:

- keep UI concerns in iframe and document edits in sandbox
- pass serializable payloads and handle failure visibly

## Bulk Designer implementation cues

Reference implementation cues from Bulk Designer-style panels:

- app-shell location state controlling multi-page panel flow
- explicit page transitions (`home -> connect/map -> apply -> status -> complete`)
- flow context flags influencing next-screen behavior
- progress/status screen for long-running generation
- mixed feedback channels: toasts for global notices plus inline/action-level feedback

Suggested reuse strategy:

1. Start with explicit screen map and transition rules.
2. Define state ownership at app shell versus per-screen.
3. Add loading/empty/error states before polishing visuals.
4. Validate keyboard and focus behavior after each new screen.
