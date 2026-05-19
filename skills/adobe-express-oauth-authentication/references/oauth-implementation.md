# OAuth 2.0 Implementation Guide

Complete reference for implementing OAuth 2.0 authentication in Adobe Express add-ons.

## Quick Reference

- **Redirect URI**: `https://express.adobe.com/static/oauth-redirect.html`
- **Legacy Redirect URI**: `https://new.express.adobe.com/static/oauth-redirect.html` (also required)
- **Helper Module**: [OAuthUtils.js](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js)
- **Sample Project**: [import-images-using-oauth](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-using-oauth)

## Setup Steps

### 1. Configure OAuth Provider

1. Create application in OAuth provider's console (e.g., Dropbox, OneDrive, Google Drive)
2. Select **Web Application** or **SPA (Single Page Application)** type
3. Add **both** redirect URIs:
   - `https://express.adobe.com/static/oauth-redirect.html` (current)
   - `https://new.express.adobe.com/static/oauth-redirect.html` (legacy)
4. Note the Client ID / Application ID

### 2. Update manifest.json

Add OAuth provider hostnames to permissions:

```json
{
  "id": "<ADD_ON_ID>",
  "name": "<ADD_ON_NAME>",
  "version": "1.0.0",
  "manifestVersion": 1,
  "requirements": {
    "apps": ["Express"]
  },
  "entryPoints": [
    {
      "type": "panel",
      "id": "panel1",
      "label": {
        "default": "<ADD_ON_LABEL>"
      },
      "main": "index.html",
      "permissions": {
        "oauth": [
          "login.microsoftonline.com",  // OneDrive
          "www.dropbox.com",             // Dropbox
          "accounts.google.com",         // Google
          "www.box.com"                  // Box
        ]
      }
    }
  ]
}
```

**Important**: Include ALL OAuth provider hostnames you'll use.

## Implementation Pattern (PKCE Flow)

### Complete OAuth Flow Example

```javascript
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Provider configuration
const DROPBOX_AUTHORIZATION_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const DROPBOX_CLIENT_ID = "<DROPBOX_CLIENT_ID>";
const DROPBOX_SCOPE = "files.content.read files.metadata.read";

addOnUISdk.ready.then(async () => {
  // Step 1: Generate PKCE challenge
  const challenge = await oauthUtils.generateChallenge();
  
  // Step 2: Authorize with provider
  await authorize(challenge);
});

async function authorize(challenge) {
  // Step 3: Trigger OAuth authorization window
  const { id, code, redirectUri, result } = await addOnUISdk.app.oauth.authorize({
    authorizationUrl: DROPBOX_AUTHORIZATION_URL,
    clientId: DROPBOX_CLIENT_ID,
    scope: DROPBOX_SCOPE,
    codeChallenge: challenge.codeChallenge
  });
  
  // Step 4: Check authorization status
  const { status, description } = result;
  if (status !== "SUCCESS") {
    throw new Error(`OAuth failed: ${status} - ${description}`);
  }
  
  // Step 5: Exchange code for access token
  await oauthUtils.generateAccessToken({
    id,
    clientId: DROPBOX_CLIENT_ID,
    codeVerifier: challenge.codeVerifier,
    code,
    tokenUrl: DROPBOX_TOKEN_URL,
    redirectUri
  });
  
  // Step 6: Retrieve and use access token
  const accessToken = await oauthUtils.getAccessToken(id);
  
  // Now use accessToken to call provider APIs
  await fetchUserFiles(accessToken);
}
```

## OAuthUtils.js Helper Module

The Adobe team provides a helper module with essential utilities:

### Available Functions

#### 1. `generateChallenge()`
Generates PKCE code challenge and verifier.

```javascript
const challenge = await oauthUtils.generateChallenge();
// Returns: { codeChallenge: "...", codeVerifier: "..." }
```

#### 2. `generateAccessToken(options)`
Exchanges authorization code for access token.

```javascript
await oauthUtils.generateAccessToken({
  id,               // From authorize() response
  clientId,         // Your OAuth client ID
  codeVerifier,     // From generateChallenge()
  code,             // From authorize() response
  tokenUrl,         // Provider's token endpoint
  redirectUri       // From authorize() response
});
```

#### 3. `getAccessToken(id)`
Retrieves stored access token (always valid - handles refresh).

```javascript
const accessToken = await oauthUtils.getAccessToken(id);
```

### Download OAuthUtils.js

Get the helper module from the sample project:
```
https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js
```

## Token Storage & Persistence

### Store Tokens with Client Storage

Tokens should persist across sessions:

```javascript
import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";

// Store token
await addOnUISdk.instance.clientStorage.setItem("oauth_token", accessToken);

// Retrieve token
const token = await addOnUISdk.instance.clientStorage.getItem("oauth_token");

// Check if user is logged in
const isLoggedIn = !!token;
```

### Best Practices

1. **Never store tokens in plain text** in client-side code
2. **Use Client Storage API** for secure persistence
3. **Handle token refresh** automatically (OAuthUtils does this)
4. **Check token validity** before making API calls
5. **Provide logout functionality** to clear tokens

## Common OAuth Providers

### Dropbox

```javascript
const DROPBOX_CONFIG = {
  authorizationUrl: "https://www.dropbox.com/oauth2/authorize",
  tokenUrl: "https://api.dropboxapi.com/oauth2/token",
  manifestHost: "www.dropbox.com",
  scope: "files.content.read files.metadata.read"
};
```

### OneDrive (Microsoft)

```javascript
const ONEDRIVE_CONFIG = {
  authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  manifestHost: "login.microsoftonline.com",
  scope: "Files.Read Files.Read.All User.Read offline_access"
};
```

### Google Drive

```javascript
const GOOGLE_DRIVE_CONFIG = {
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  manifestHost: "accounts.google.com",
  scope: "https://www.googleapis.com/auth/drive.readonly"
};
```

### Box

```javascript
const BOX_CONFIG = {
  authorizationUrl: "https://account.box.com/api/oauth2/authorize",
  tokenUrl: "https://api.box.com/oauth2/token",
  manifestHost: "account.box.com",
  scope: "" // Box doesn't use scope in authorization URL
};
```

## Login/Logout UI Pattern

### Login Button

```javascript
async function handleLogin() {
  try {
    const challenge = await oauthUtils.generateChallenge();
    const { id, code, redirectUri, result } = await addOnUISdk.app.oauth.authorize({
      authorizationUrl: PROVIDER_AUTH_URL,
      clientId: CLIENT_ID,
      scope: SCOPE,
      codeChallenge: challenge.codeChallenge
    });
    
    if (result.status === "SUCCESS") {
      await oauthUtils.generateAccessToken({
        id, clientId: CLIENT_ID, codeVerifier: challenge.codeVerifier,
        code, tokenUrl: PROVIDER_TOKEN_URL, redirectUri
      });
      
      // Update UI to show logged-in state
      updateUIAfterLogin();
    }
  } catch (error) {
    console.error("Login failed:", error);
    showErrorMessage("Failed to connect to provider");
  }
}
```

### Logout Button

```javascript
async function handleLogout() {
  try {
    // Clear stored tokens
    await addOnUISdk.instance.clientStorage.removeItem("oauth_token");
    await addOnUISdk.instance.clientStorage.removeItem("oauth_id");
    
    // Update UI to show logged-out state
    updateUIAfterLogout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
```

## Error Handling

### Common OAuth Errors

```javascript
async function authorize(challenge) {
  const { id, code, redirectUri, result } = await addOnUISdk.app.oauth.authorize({
    authorizationUrl: AUTH_URL,
    clientId: CLIENT_ID,
    scope: SCOPE,
    codeChallenge: challenge.codeChallenge
  });
  
  switch (result.status) {
    case "SUCCESS":
      // Proceed with token exchange
      break;
      
    case "USER_CANCELLED":
      console.log("User cancelled authorization");
      break;
      
    case "AUTHORIZATION_FAILED":
      console.error("Authorization failed:", result.description);
      showErrorMessage("Failed to authorize. Please try again.");
      break;
      
    default:
      console.error("Unknown error:", result);
  }
}
```

## Use Cases

1. **Cloud Storage Access**
   - Import files from Dropbox, OneDrive, Google Drive
   - Browse user's cloud files
   - Download and insert into document

2. **User Authentication**
   - Verify user identity
   - Access user profile information
   - Personalize add-on experience

3. **Premium Features**
   - Validate subscription status
   - Gate premium functionality
   - Sync user preferences

4. **Data Synchronization**
   - Save user-generated content to cloud
   - Sync settings across devices
   - Backup user data

## Testing OAuth Flow

### Development Checklist

- [ ] OAuth app created in provider console
- [ ] Both redirect URIs configured
- [ ] Client ID stored securely (not in source code)
- [ ] manifest.json includes provider hostname
- [ ] PKCE flow implemented correctly
- [ ] Tokens persist across sessions
- [ ] Logout functionality clears all tokens
- [ ] Error handling for failed authorization
- [ ] Token refresh handled automatically (via OAuthUtils)

### Debug Tips

1. **Check Network Tab**: Verify OAuth requests and responses
2. **Console Logging**: Log authorization result and token responses
3. **Client Storage Inspector**: Verify tokens are stored correctly
4. **Provider Dashboard**: Check app settings and permissions
5. **CORS Issues**: Ensure provider allows Adobe Express domain

## Related Documentation

- [OAuth 2.0 SDK Reference](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/app-oauth/)
- [Client Storage API](https://developer.adobe.com/express/add-ons/docs/references/addonsdk/instance-clientStorage)
- [import-images-using-oauth Sample](https://github.com/AdobeDocs/express-add-on-samples/tree/main/samples/import-images-using-oauth)
- [OAuthUtils.js Source Code](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js)
