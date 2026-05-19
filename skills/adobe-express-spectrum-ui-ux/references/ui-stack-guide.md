# UI Stack Guide

Choose one Spectrum strategy per panel and keep it consistent.

## Preferred Order

1. Spectrum Web Components (raw)
2. swc-react for React repos
3. React Spectrum only when already established in the repo

## Stack Selection Rules

- Use raw SWC for small or framework-light panels.
- Use swc-react when React state management is already in place.
- Keep React Spectrum only when migration cost outweighs benefit.
- Avoid blending SWC and React Spectrum in one feature unless explicitly migrating.

## Theme Essentials

Apply Express theme before UI tuning:

- Import typography and Express theme modules.
- Wrap panel content in an Express theme container.
- Keep `scale` and `color` consistent unless accessibility requirements demand change.

Example patterns:

```html
<sp-theme system="express" color="light" scale="medium">
  <!-- panel content -->
</sp-theme>
```

```tsx
<Theme theme="express" color="light" scale="medium">
  {/* panel content */}
</Theme>
```

## Component Selection Baseline

- Actions: buttons/action buttons
- Inputs: textfield/textarea/checkbox/switch/radio
- Selection lists: menu/dropdown/action-menu
- Status: progress-circle, inline error text, toast for global feedback
- Layout: clear sections with headings/dividers instead of dense control clusters

## Accessibility Guardrails

- Ensure primary actions are keyboard reachable.
- Keep focus order consistent when screens change.
- Show error text near invalid inputs.
- Avoid color-only status signals.

## Read These Sources

- https://developer.adobe.com/express/add-ons/docs/guides/build/design/implementation-guide/
- https://developer.adobe.com/express/add-ons/docs/guides/build/design/ux_guidelines/
- https://opensource.adobe.com/spectrum-web-components/
