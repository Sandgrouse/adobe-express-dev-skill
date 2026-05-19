---
name: adobe-express-monetization
description: Monetize Adobe Express add-ons with subscriptions and payments. Use when designing checkout flows, defining subscription tiers, implementing webhook verification, managing entitlements, or securing backend billing logic.
---

# Adobe Express Monetization Skill

This skill guides you through designing and implementing monetization for Adobe Express add-ons, from checkout architecture through entitlement enforcement.

## When to Use This Skill

- Designing checkout and payment flows
- Planning subscription tiers and pricing
- Setting up backend webhook handling
- Validating manifest popup permissions for checkout
- Designing entitlement checks (who has access to paid features)
- Auditing payment flow for CORS and security gaps

## Quick Start

### Monetization Architecture Overview

Six-step loop:

1. **User triggers purchase** (UI button in add-on)
2. **Add-on calls your backend** with user ID and plan
3. **Backend requests checkout session** from payment provider (Stripe, Lemon Squeezy, etc.)
4. **Add-on opens checkout** in popup (not iframe)
5. **User pays**, provider sends webhook to your backend
6. **Backend updates database**, add-on queries status endpoint

### Add Popup Permissions to Manifest

Checkout runs in popup, not iframe:

```json
{
  "permissions": {
    "sandbox": ["allow-popups", "allow-popups-to-escape-sandbox"]
  }
}
```

### Backend Requirements

You need three endpoints:

1. **POST /api/create-checkout**
   - Input: user ID, plan
   - Output: checkout URL
   - Your server talks to payment provider

2. **POST /api/webhook**
   - Input: provider webhook (signed)
   - Verify signature, update database
   - Ensure idempotency (same event twice = no duplicates)

3. **GET /api/status**
   - Input: user ID
   - Output: subscription status, plan, expiry
   - Source of truth from database

### Query Official MCP for Details

- "What manifest permissions are needed for checkout popups?"
- "What host behaviors affect popup timing in add-ons?"
- "Does Adobe Express have built-in subscription support?"

## Checkout Flow Pattern

### Step 1: Open Popup Before Async Work

Important: Open popup on user click, before async:

```javascript
const popup = window.open("about:blank", "billing");
// THEN make async call
const res = await fetch("https://api.yourdomain.com/api/create-checkout");
const data = await res.json();
popup.location.href = data.checkoutUrl; // Navigate existing popup
```

If you await first, browsers block popup as "not user-initiated".

### Step 2: Create Checkout Session

Backend receives checkout request:
- Validate user ID from your auth system
- Map plan parameter to provider product ID
- Call provider API (Stripe, Lemon Squeezy, etc.)
- Get checkout URL, return to add-on
- Set return URL to your domain (not iframe)

### Step 3: User Pays

User completes payment on provider's hosted page.

### Step 4: Webhook Verification

Provider sends webhook to your endpoint:
- Verify signature using provider's secret key
- Confirm event hasn't been processed (idempotency)
- Update database: user → subscription, plan, expiry
- Return 200 OK

### Step 5: Poll Status or Refresh

Add-on needs to know payment succeeded:
- Poll GET /api/status every few seconds, or
- User clicks "I've paid" to trigger refresh, or
- Use postMessage from return URL to notify add-on

## Security Checklist

- [ ] API keys never in add-on (server-side only)
- [ ] Webhook signatures verified every time
- [ ] Event IDs tracked for idempotency
- [ ] CORS allows only your add-on origin (not wildcard)
- [ ] Database is truth for entitlements (never trust UI)
- [ ] Refresh tokens handled securely
- [ ] Sensitive errors logged, generic messages to users

## Entitlement Design

When user tries paid feature:

1. Frontend asks backend: "Does user X have plan Y?"
2. Backend checks database (not UI state)
3. Backend returns signed entitlement or 403 Forbidden
4. Frontend displays feature or lock screen

Never trust UI state for paid features.

## Provider-Agnostic Design

Choose any provider (Stripe, Lemon Squeezy, Paddle, Dodo):
- API differs per provider
- Architecture stays same (checkout → webhook → status)
- Swap provider by changing endpoint names and secret keys

## Common Mistakes

- **Await before popup**: Browser blocks non-user-initiated popups
- **No webhook verification**: Attackers send fake payment events
- **No idempotency**: Same webhook processed twice = duplicate charges
- **Trust frontend**: User can cheat by editing localStorage
- **Wildcard CORS**: Exposes API to any origin
- **Relative URLs**: Iframe context breaks relative paths

## Skill Handoffs

Pass to other skills when:

- **Paywall UI composition** → adobe-express-spectrum-ui-ux
- **Paid feature that alters document** → adobe-express-document-manipulation
- **User auth before showing paywall** → adobe-express-oauth-authentication
- **Manifest and popup permission validation** → adobe-express-core

## References

- [Monetization Guidelines](https://developer.adobe.com/express/add-ons/docs/guides/monetization/)
- [Manifest Reference](https://developer.adobe.com/express/add-ons/docs/references/manifest/)
