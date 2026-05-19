---
name: adobe-express-oauth-authentication
description: Implement OAuth 2.0 and authentication flows for Adobe Express add-ons. Use when connecting to cloud providers (Dropbox, OneDrive, Google Drive), managing tokens, storing credentials, or designing login surfaces.
---

# Adobe Express OAuth and Authentication Skill

This skill guides you through OAuth 2.0 implementation for add-ons, focusing on PKCE flow, token lifecycle, and secure credential storage.

## When to Use This Skill

- Implementing OAuth for cloud storage access (Dropbox, Google Drive, OneDrive)
- Designing PKCE flow for add-on iframe runtime
- Planning token storage and refresh strategy
- Validating manifest OAuth permission requirements
- Debugging OAuth callback failures or token expiration issues

## Quick Start

### Understand PKCE Flow for Add-ons

OAuth 2.0 with PKCE (Proof Key for Code Exchange) is the standard for add-ons:

1. User clicks "Connect to [Provider]" button (UI)
2. Add-on generates PKCE challenge and redirects user to provider
3. User authorizes add-on at provider
4. Provider redirects to Adobe's OAuth proxy with authorization code
5. Add-on exchanges code + verifier for access token
6. Token stored in Client Storage for future requests

### Add OAuth Permissions to Manifest

```json
{
  "permissions": {
    "oauth": [
      "www.dropbox.com",
      "login.microsoftonline.com",
      "accounts.google.com"
    ]
  }
}
```

Only list providers your add-on actually uses.

### Query Official MCP for APIs

- "What's the current signature for `addOnUISdk.app.oauth.authorize()`?"
- "What OAuth flows does Adobe Express support?"
- "How do I handle OAuth errors in add-ons?"

## Implementation Pattern

### 1. Generate PKCE Challenge

Use OAuthUtils.js helper (from code samples):
- Generates cryptographically secure challenge and verifier
- Ready for production use

### 2. Initiate Authorization

Call `addOnUISdk.app.oauth.authorize()` with:
- `authorizationUrl` (provider-specific)
- `clientId` (your app registration)
- `codeChallenge` (from PKCE)
- `scope` (request minimal scopes needed)

### 3. Exchange Code for Token

After user authorizes, exchange:
- Authorization code
- Code verifier
- Client ID

With provider's token endpoint.

### 4. Store Token Securely

```javascript
await addOnUISdk.instance.clientStorage.setItem("oauth_token", token);
```

Client Storage is encrypted and persists across sessions.

### 5. Refresh Before Expiry

Monitor token expiry. Refresh using refresh token:
- Prevent mid-operation token failures
- Handle refresh token rotation

## Token Lifecycle

- **Acquire**: User authorizes at provider
- **Store**: Client Storage (encrypted, persistent)
- **Use**: Include in API requests (Bearer token)
- **Refresh**: Before expiry using refresh token
- **Revoke**: Logout or provider deauthorization

## Provider-Specific Notes

See `references/oauth-implementation.md` for:
- Dropbox setup (basic auth, scope requirements)
- OneDrive/Microsoft setup
- Google Drive setup
- Box.com setup

## Security Checklist

- [ ] PKCE verifier never sent to provider (only challenge)
- [ ] Refresh token stored securely (Client Storage)
- [ ] Manifest lists only used OAuth providers
- [ ] Logout clears stored tokens
- [ ] Scope requests are minimal (principle of least privilege)
- [ ] Error messages don't leak sensitive information

## Skill Handoffs

Pass to other skills when:

- **Login button and UI flow** → adobe-express-spectrum-ui-ux
- **Using auth token to fetch and insert images** → adobe-express-document-manipulation
- **Subscription tied to OAuth user** → adobe-express-monetization
- **Manifest validation** → adobe-express-core

## References

- [Official OAuth Docs](https://developer.adobe.com/express/add-ons/docs/guides/develop/oauth/)

