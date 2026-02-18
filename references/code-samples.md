# Code Samples Index

Complete list of official Adobe Express add-on code samples with descriptions and key features.

**Repository**: [express-add-on-samples](https://github.com/AdobeDocs/express-add-on-samples)

## UI Building with Spectrum Web Components

For all UI-building samples, the **community MCP server** provides live Spectrum Web Components documentation. Query it using:

```
Query: "sp-button documentation"
Tool: mcp_adobeexpressd_queryDocumentation
Target: spectrum_web_components
```

This gives you real-time component props, events, and examples while implementing samples.

---

## How to Use Samples

```bash
# Clone the repository
git clone https://github.com/AdobeDocs/express-add-on-samples.git

# Navigate to a sample
cd express-add-on-samples/samples/<sample-name>

# Install dependencies
npm install

# Build the sample
npm run build

# Start development server
npm run start

# Load in Adobe Express via Add-on Development Mode
```

**Prerequisite**: Run `npx @adobe/create-ccweb-add-on` at least once to initialize the add-on package.

---

## Sample Projects

### 1. get-started
**Path**: `samples/get-started`  
**Difficulty**: Beginner  
**Purpose**: Introduction to add-on development

**Description**: Simple greeting app demonstrating basic HTML/CSS/JavaScript running in the add-on panel.

**Technologies**:
- HTML
- JavaScript
- CSS

**Features**:
- Basic add-on structure
- No SDK features (pure JavaScript app)
- Great starting point for learning

**Use When**: Learning add-on basics without SDK complexity.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Enter a name and confirm the greeting updates in the panel UI.

---

### 2. import-images-from-local
**Path**: `samples/import-images-from-local`  
**Difficulty**: Beginner  
**Purpose**: Local image import and drag-and-drop

**Description**: Add local images to documents via click and drag-and-drop.

**Technologies**:
- JavaScript
- CSS

**Features**:
- **Import Content API** - Add images on click
- **Drag and Drop API** - Drag images to document
- Local file handling

**Use When**: Implementing basic image import functionality.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Click an image to insert it, and drag an image into the document to confirm drag-and-drop works.

---

### 3. import-images-using-oauth ⭐
**Path**: `samples/import-images-using-oauth`  
**Difficulty**: Advanced  
**Purpose**: OAuth authentication and cloud storage integration

**Description**: Connect to Dropbox using OAuth 2.0 and import images from cloud storage. **Most comprehensive OAuth example.**

**Technologies**:
- React
- React Spectrum
- CSS
- Webpack

**Features**:
- **OAuth API** - Dropbox authentication
- **Import Content API** - Add cloud images to document
- **Drag and Drop API** - Drag cloud images
- **Client Storage** - Persist access tokens in IndexedDB
- **OAuthUtils.js** - Reusable OAuth helper module

**Key Files**:
- `src/utils/OAuthUtils.js` - OAuth PKCE helper (COPY THIS!)
- `src/components/DropboxBrowser.jsx` - Cloud file browser UI

**Use When**: Implementing OAuth, cloud storage, or user authentication.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Authenticate with Dropbox, browse images, and click/drag one into the document.

**GitHub**: [View Source](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-using-oauth)

---

### 4. use-client-storage
**Path**: `samples/use-client-storage`  
**Difficulty**: Intermediate  
**Purpose**: Data persistence

**Description**: Todo list app demonstrating persistent storage using Client Storage API.

**Technologies**:
- TypeScript
- CSS
- Webpack

**Features**:
- **Client Storage API** - Persist data across sessions
- IndexedDB usage
- TypeScript implementation

**Use When**: Need to save user data, preferences, or app state.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Add a todo item, reload the add-on, and confirm the item persists.

---

### 5. export-sample
**Path**: `samples/export-sample`  
**Difficulty**: Intermediate  
**Purpose**: Export renditions

**Description**: Export document content in various formats (JPEG, PNG, PDF, MP4).

**Technologies**:
- JavaScript
- Spectrum Web Components
- Webpack

**Features**:
- **Export Content API** - Generate renditions
- **Import Content API** - Re-import exported content
- Multiple export formats

**Use When**: Implementing export/download functionality.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Trigger export and confirm renditions are generated in the supported formats (JPEG, PNG, PDF, MP4).

---

### 6. dialog-add-on
**Path**: `samples/dialog-add-on`  
**Difficulty**: Intermediate  
**Purpose**: Modal dialogs

**Description**: Demonstrate various modal dialog patterns.

**Technologies**:
- React
- React Spectrum
- Webpack

**Features**:
- **Modal Dialog API** - Pop-up modals from add-on panel
- Multiple dialog variations
- React-based UI

**Use When**: Need confirmation dialogs, forms, or additional UI panels.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Open each dialog variation and confirm modal behavior works as expected.

---

### 7. licensed-addon
**Path**: `samples/licensed-addon`  
**Difficulty**: Advanced  
**Purpose**: Monetization and licensing

**Description**: Integrate with licensing/payment services using hashed user IDs.

**Technologies**:
- React
- React Spectrum
- Webpack

**Features**:
- **Current User API** - Validate user IDs
- **Modal Dialogs** - Premium upgrade prompts
- User ID hashing for licensing

**Use When**: Building paid or freemium add-ons.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Trigger the licensing flow and confirm the modal appears using Current User data.

---

### 8. audio-recording-addon
**Path**: `samples/audio-recording-add-on`  
**Difficulty**: Intermediate  
**Purpose**: Audio recording and insertion

**Description**: Record audio using browser Media Recorder API and add to document.

**Technologies**:
- JavaScript

**Features**:
- **Browser Media Recorder API** - Capture audio
- **Add Audio API** - Insert audio into document
- WAV Blob conversion with HPC codec

**Use When**: Implementing audio recording or audio file handling.

**Important**: Audio `title` parameter is **MANDATORY**.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Record audio and confirm it gets added to the current document page.

---

### 9. pix
**Path**: `contributed/pix`  
**Difficulty**: Advanced  
**Purpose**: Canvas-based pixel art editor

**Description**: 16x16 pixel editor with drag-to-document and page-to-pixel-art conversion.

**Technologies**:
- HTML Canvas
- React
- Spectrum Web Components
- Webpack

**Features**:
- **Drag and Drop** - Drag pixel art to canvas
- **Export Content** - Convert current page to pixel art (16x16 downsampling)
- **Client Storage** - Save pixel art creations
- Canvas rendering

**Use When**: Building canvas-based tools or image editors.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Draw pixel art, drag it into the document, and try importing the current page as pixel art.

---

### 10. swc
**Path**: `contributed/swc`  
**Difficulty**: Beginner  
**Purpose**: Spectrum Web Components without frameworks

**Description**: Pure JavaScript (no React/Vue) using Spectrum Web Components.

**Technologies**:
- HTML
- CSS
- JavaScript
- Spectrum Web Components
- Webpack

**Features**:
- **Application UI Theme** - Set and respond to theme changes
- Vanilla JavaScript approach
- No framework dependencies

**Use When**: Want Spectrum UI without React overhead.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Change the app theme and confirm the UI updates accordingly.

---

### 11. swc-react-theme-sampler
**Path**: `contributed/swc-react-theme-sampler`  
**Difficulty**: Intermediate  
**Purpose**: SWC-React and theming

**Description**: Demonstrate SWC-React library and Spectrum theme properties (theme, scale, color).

**Technologies**:
- React
- SWC-React
- Webpack

**Features**:
- **SWC-React** - React wrappers for Spectrum Web Components
- **Application UI Theme** - Theme, scale, color variations
- Theme switching demo

**Use When**: Using React with Spectrum components or implementing theme switching.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Switch theme, scale, or color and confirm the UI updates.

---

### 12. vue-starter
**Path**: `contributed/vue-starter`  
**Difficulty**: Intermediate  
**Purpose**: Vue.js integration

**Description**: Vue.js-based add-on with Spectrum Web Components.

**Technologies**:
- Vue.js
- HTML
- JavaScript
- Webpack
- CSS

**Features**:
- **Add-on SDK Ready** - Proper SDK initialization in Vue
- Vue.js framework integration
- Spectrum Web Components in Vue

**Use When**: Building add-ons with Vue.js framework.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Confirm the UI waits for the SDK Ready state, then enables the UI actions.

---

### 13. Giphy (Marketplace)
**Path**: `marketplace/giphy`  
**Difficulty**: Intermediate  
**Purpose**: Third-party API integration

**Description**: Search and import GIFs from Giphy API.

**Technologies**:
- JavaScript
- Spectrum Web Components

**Features**:
- **Drag and Drop** - Drag GIFs to document
- **Import Content** - Click to add GIFs
- Third-party API integration (Giphy)

**Use When**: Integrating external APIs or content services.

**Quickstart & Verify**:
1. Run the sample (clone → install → build → start).
2. Load the add-on in Adobe Express via Add-on Development Mode.
3. **Verify**: Search for a GIF and click/drag it into the document.

---

## Quick Reference by Feature

### OAuth & Authentication
- ⭐ **import-images-using-oauth** - Complete OAuth 2.0 PKCE implementation
- **licensed-addon** - User ID hashing for licensing

### Import/Export
- **import-images-from-local** - Local image import
- **import-images-using-oauth** - Cloud image import
- **export-sample** - Export renditions (JPEG, PNG, PDF, MP4)

### Drag and Drop
- **import-images-from-local** - Basic drag-and-drop
- **import-images-using-oauth** - Cloud file drag-and-drop
- **pix** - Pixel art drag-and-drop
- **Giphy** - GIF drag-and-drop

### Storage & Persistence
- **use-client-storage** - Client Storage API (todo list)
- **import-images-using-oauth** - Token storage in IndexedDB
- **pix** - Save creations

### UI & Design
- **swc** - Vanilla JS with Spectrum Web Components
- **swc-react-theme-sampler** - SWC-React and theming
- **dialog-add-on** - Modal dialogs

### Media Handling
- **audio-recording-addon** - Audio recording and insertion
- **Giphy** - GIF search and import

### Frameworks
- **React**: import-images-using-oauth, dialog-add-on, licensed-addon, pix, swc-react-theme-sampler
- **Vue.js**: vue-starter
- **Vanilla JS**: get-started, import-images-from-local, swc, Giphy

### Advanced Patterns
- **pix** - Canvas rendering, bi-directional content flow (page ↔ pixel art)
- **import-images-using-oauth** - OAuth + React + Storage + Drag-and-drop
- **licensed-addon** - Monetization integration

---

## Recommended Learning Path

1. **Start**: `get-started` - Understand basic structure
2. **Add SDK**: `import-images-from-local` - Learn Import and Drag APIs
3. **Storage**: `use-client-storage` - Persist data
4. **UI**: `swc` or `swc-react-theme-sampler` - Spectrum components
5. **OAuth**: `import-images-using-oauth` - Authentication (copy OAuthUtils.js!)
6. **Export**: `export-sample` - Renditions
7. **Advanced**: `pix` or `licensed-addon` - Complex features

---

## Essential Files to Copy

### OAuthUtils.js (OAuth Helper)
**Source**: [import-images-using-oauth/src/utils/OAuthUtils.js](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js)

**Functions**:
- `generateChallenge()` - PKCE code challenge/verifier
- `generateAccessToken()` - Token exchange
- `getAccessToken()` - Retrieve valid token (handles refresh)

**Use**: Copy this into any project using OAuth.

---

## Links

- **Main Repository**: https://github.com/AdobeDocs/express-add-on-samples
- **Sample Documentation**: https://developer.adobe.com/express/add-ons/docs/guides/learn/samples
- **Getting Started Tutorial**: https://developer.adobe.com/express/add-ons/docs/guides/getting_started/
