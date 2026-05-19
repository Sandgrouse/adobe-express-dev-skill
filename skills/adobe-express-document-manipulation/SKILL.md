---
name: adobe-express-document-manipulation
description: Create and modify document content in Adobe Express add-ons using Document SDK. Use when planning document operations, inserting shapes/text/media, sequencing sandbox commands, or troubleshooting document edits.
---

# Adobe Express Document Manipulation Skill

This skill guides you in planning and executing document operations in the document sandbox, from simple text insertion to complex multi-element layouts.

## When to Use This Skill

- Planning what content to insert (shapes, text, images, audio, video)
- Sequencing multiple document operations safely
- Understanding Document SDK APIs and type signatures
- Designing insertion workflows triggered from UI actions
- Troubleshooting document operation failures

## Quick Start

### Common Document Operations

All operations run in document sandbox using Document SDK:

**Text insertion**:
- Query: "How do I create text with custom font size and color?"
- Relevant: `text.createText()`, `editor.context.insertionParent`

**Shape insertion**:
- Query: "Create a filled rectangle at specific position"
- Relevant: `editor.createRectangle()`, dimension and fill APIs

**Image insertion** (from iframe runtime):
- Query: "Insert image blob into current page"
- Relevant: `addOnUISdk.app.document.addImage(blob)`

**Audio/Video insertion** (from iframe runtime):
- Query: "How do I add audio or video to the document?"
- Relevant: `addAudio()` (title mandatory), `addVideo()` (title optional)

### Sequence Operations Safely

1. **Identify insertion parent**: Are you adding to current page or current selection?
2. **Plan async operations**: Fetch resources before document edits
3. **Handle errors**: Wrap in try-catch, provide user feedback
4. **Test ordering**: Some operations depend on prior state

### Query Official MCP for Details

When implementing, ask MCP:
- "What's the current signature for `editor.createRectangle()`?"
- "What properties does `RectangleNode` expose?"
- "What's the type of `editor.context.insertionParent`?"

## Document Operation Patterns

### Insert Text

1. Get insertion context: `editor.context.insertionParent`
2. Create text node with `text.createText()`
3. Set properties (fontSize, fill, transform, etc.)
4. Append to parent with `children.append()`

### Insert Shape

1. Create shape with `editor.createRectangle()` (or other shape)
2. Set dimensions and position
3. Set fill and stroke properties
4. Append to parent

### Insert Media

1. (From iframe) Fetch blob from URL or user input
2. Call `addOnUISdk.app.document.addImage/Audio/Video(blob, options)`
3. For audio: title is mandatory
4. For video: title is optional

## Common Pitfalls

- **No insertion parent**: Check `editor.context.insertionParent` exists
- **DOM access in sandbox**: All DOM operations fail in sandbox; use iframe runtime instead
- **Missing title on audio**: Audio requires title parameter; video does not
- **Async before append**: Fetch data before editing to avoid race conditions

## Skill Handoffs

Pass to other skills when:

- **UI button that triggers insertion** → adobe-express-spectrum-ui-ux
- **Fetching media from OAuth provider** → adobe-express-oauth-authentication
- **Paid feature gating** → adobe-express-monetization
- **Manifest and runtime questions** → adobe-express-core

## References

- [Document SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/)
- [Code Samples](../../references/code-samples.md)
