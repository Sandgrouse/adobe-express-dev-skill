---
name: adobe-express-spectrum-ui-ux
description: Build add-on panel interfaces with Spectrum Web Components and Adobe Express UX patterns. Use when designing panel layouts, selecting UI components, managing theme and accessibility, or implementing user interactions.
---

# Adobe Express Spectrum UI and UX Skill

This skill guides you in building cohesive, accessible add-on panel interfaces using Spectrum Web Components and Adobe Express design patterns.

## When to Use This Skill

- Selecting Spectrum components for add-on panel interactions
- Designing panel layouts and information hierarchies
- Managing theme, color, scale, and accessibility
- Reviewing UI for UX anti-patterns and accessibility violations
- Querying community MCP for Spectrum component API details

## Quick Start

### Choose Components for Your Panel

Common Spectrum Web Components for add-on panels:

- `<sp-button>` for actions (primary, secondary, negative variants)
- `<sp-textfield>` for text input
- `<sp-checkbox>`, `<sp-radio>` for selection
- `<sp-dropdown>` for lists
- `<sp-divider>` for visual separation
- `<sp-progress-circle>` for loading states

### Set Theme for Consistency

```html
<sp-theme theme="express" scale="medium" color="light">
  <!-- Your panel content here -->
</sp-theme>
```

### Query Community MCP for Component Details

When you need API details, state behaviors, or accessibility patterns:

- Prompt: "What are the props and events for sp-button?"
- Prompt: "How do I make this dropdown accessible?"
- Prompt: "Show me keyboard navigation patterns in Spectrum"

## UX Best Practices for Add-on Panels

- **Consistent spacing**: Use Spectrum spacing tokens
- **Clear hierarchy**: Primary actions prominent, secondary subtle
- **Loading states**: Show progress-circle during async operations
- **Error handling**: Display validation messages near inputs
- **Keyboard navigation**: Test all interactions without mouse
- **Color contrast**: Verify against WCAG AA standards

## Skill Handoffs

Pass to other skills when:

- **Architecture questions** → adobe-express-core
- **Document manipulation triggered from button click** → adobe-express-document-manipulation
- **OAuth login flow** → adobe-express-oauth-authentication
- **Paywall or checkout UI** → adobe-express-monetization

## References

- [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)
- [Adobe Express UX Guidelines](https://developer.adobe.com/express/add-ons/docs/guides/build/design/ux_guidelines/)
- [Code Samples](../../references/code-samples.md)
