# Co-mailer Backend — Full Test Report (Phases 1–7)

**Date:** 2026-04-14
**Server port:** 3001 (spec says 5000 — macOS AirPlay occupies 5000; this is correct per project .env)
**Server startup:** PostgreSQL connected ✅ | Redis connected ✅ | Port 3001 ✅

> **Note on T3.3 and T4.4/T4.9/T4.12:** These require a real Google OAuth browser flow or a live Resend API key.
> They cannot be automated. They are marked MANUAL and excluded from pass/fail totals.

---

## Phase 1 — Server Health

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T1.1 | GET /health | ✅ PASS | `200 { status: "ok", env: "development", timestamp: "..." }` |
| T1.2 | GET /unknown-route → 404 | ✅ PASS | `404 { error: "Route not found" }` |
| T1.3 | CORS header on /health | ✅ PASS | `Access-Control-Allow-Origin: http://localhost:5173` + `Access-Control-Allow-Credentials: true` |

---

## Phase 2 — Database + Templates

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T2.1 | All 4 tables exist | ✅ PASS | User, Campaign, Recipient, Template all present in PostgreSQL |
| T2.2 | Sessions table exists | ✅ PASS | `sessions` table present |
| T2.3 | General template seeded | ✅ PASS | 1 row, name="General", htmlContent length=2871 |
| T2.4 | GET /api/templates (auth) | ✅ PASS | `200 { template: { id, name: "General", htmlContent: "<!DOCTYPE html>..." } }` |
| T2.5 | Validate valid HTML | ✅ PASS | `200 { html: "<h1>Hello</h1><p>World</p>", valid: true }` |
| T2.6 | Validate strips script | ✅ PASS | `200 { html: "<h1>Safe</h1>", valid: true }` — script removed |
| T2.7 | Validate rejects plain text | ✅ PASS | `400 { error: "Content must contain valid HTML" }` |
| T2.8 | Validate rejects empty | ✅ PASS | `400 { error: "\"html\" is not allowed to be empty" }` |

---

## Phase 3 — Auth

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T3.1 | GET /auth/me without session | ✅ PASS | `401 { error: "Not authenticated" }` |
| T3.2 | GET /auth/google → 302 redirect | ⚠️ WARN | Redirects to `accounts.google.com` with correct scopes, `access_type=offline`, `response_type=code`. **BUT** `client_id=from_google_console` (placeholder) and `redirect_uri=http://localhost:5000/...` (wrong port — should be 3001). Real OAuth would fail until .env is updated. |
| T3.3 | Complete Google OAuth in browser | MANUAL | Cannot automate browser flow. Code logic verified in auth.js. |
| T3.4 | GET /auth/me with valid session | ✅ PASS | `200 { user: { id, email, name, avatar, isOnboarded, isAdmin, createdAt, lastActiveAt } }` — `resendApiKey` absent ✅ |
| T3.5 | User created in database | ✅ PASS | Row exists with correct email/name/googleId; resendApiKey null at creation |
| T3.6 | Session saved in database | ✅ PASS | Session row present in `sessions` table with 7-day expiry |
| T3.7 | POST /auth/logout | ✅ PASS | `200 { message: "Logged out successfully" }` |
| T3.8 | GET /auth/me after logout | ✅ PASS | `401 { error: "Not authenticated" }` |
| T3.9 | Session deleted after logout | ✅ PASS | 0 rows in `sessions` for that sid after logout |

---

## Phase 4 — Onboarding + Settings

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T4.1 | GET /api/onboarding/status (not-onboarded) | ✅ PASS | `200 { isOnboarded: false }` |
| T4.2 | Submit invalid Resend key | ✅ PASS | `400 { error: "Invalid Resend API key" }` |
| T4.3 | Submit empty key | ✅ PASS | `400 { error: "\"apiKey\" is not allowed to be empty" }` |
| T4.4 | Submit valid Resend key | MANUAL | Requires live Resend API key. Error path (invalid key) tested in T4.2. |
| T4.5 | Onboarding status after key | ✅ PASS | User with isOnboarded:true returns `{ isOnboarded: true }` |
| T4.6 | GET /api/settings/apikey — masked | ✅ PASS | `200 { maskedKey: "re_****7890", hasKey: true }` — full key not exposed ✅ |
| T4.7 | Key encrypted in database | ✅ PASS | Stored as `iv_hex:tag_hex:data_hex` (AES-256-GCM), not raw key ✅ |
| T4.8 | PUT /api/settings/apikey invalid | ✅ PASS | `400 { error: "Invalid Resend API key" }` |
| T4.9 | PUT /api/settings/apikey valid | MANUAL | Requires live Resend API key |
| T4.10 | DELETE /api/settings/apikey | ✅ PASS | `200 { message: "API key removed", isOnboarded: false }` |
| T4.11 | GET /api/settings/apikey after removal | ✅ PASS | `200 { maskedKey: null, hasKey: false }` |
| T4.12 | Re-add key | MANUAL | Requires live Resend API key |
| T4.13 | Unauthenticated settings access | ✅ PASS | `401 { error: "Not authenticated" }` |

---

## Phase 5 — Templates

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T5.1 | GET /api/templates — full template | ✅ PASS | name="General", starts with `<!DOCTYPE html>`, contains `{{subject}}` ✅, `{{body}}` ✅, dark theme `#0f0f0f` ✅ |
| T5.2 | Validate valid HTML | ✅ PASS | `200 { html: "<div>...", valid: true }` |
| T5.3 | Validate strips script | ✅ PASS | `200 { html: "<p>safe</p>", valid: true }` |
| T5.4 | Validate strips iframe | ✅ PASS | `200 { html: "<p>safe</p>", valid: true }` |
| T5.5 | Validate rejects no tags | ✅ PASS | `400 { error: "Content must contain valid HTML" }` |
| T5.6 | Validate rejects too large | ⚠️ WARN | `413 { error: "request entity too large" }` — Express body parser rejects at ~100KB before Joi's 512000-char limit fires. Request is correctly rejected, but status is 413 instead of 400. Clients expecting 400 will be surprised. |

---

## Phase 6 — AI Generation

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T6.1 | Generate without session | ✅ PASS | `401 { error: "Not authenticated" }` |
| T6.2 | Generate with short prompt | ✅ PASS | `400 { error: "\"prompt\" length must be at least 10 characters long" }` |
| T6.3 | Generate invoice email | ❌ FAIL | `500 { error: "AI generation failed" }` — Root cause: `utils/gemini.js` imports `{ GoogleGenerativeAI }` from `@google/genai` v1.49.0, but that package exports `GoogleGenAI`, not `GoogleGenerativeAI`. Constructor is `undefined`, throws at runtime. |
| T6.4 | Generate with provided subject | ❌ FAIL | `500` — same root cause as T6.3 |
| T6.5 | Generate newsletter | ❌ FAIL | `500` — same root cause as T6.3 |
| T6.6 | Generate when not onboarded | ✅ PASS | `403 { error: "Connect your Resend API key first" }` |

---

## Phase 7 — Campaigns CRUD

| Test | Description | Result | Notes |
|------|-------------|--------|-------|
| T7.1 | POST /api/campaigns without session | ✅ PASS | `401 { error: "Not authenticated" }` |
| T7.2 | POST /api/campaigns without API key | ✅ PASS | `403 { error: "Connect your Resend API key first" }` |
| T7.3 | POST /api/campaigns missing subject | ✅ PASS | `400 { error: "\"subject\" is required" }` |
| T7.4 | Create campaign with auto name | ✅ PASS | `201 { campaign: { name: "Campaign_14Apr_18:19", status: "DRAFT", sendMode: "BULK" } }` |
| T7.5 | Create campaign custom name + SEPARATELY | ✅ PASS | `201 { campaign: { name: "Invoice Batch April", sendMode: "SEPARATELY" } }` |
| T7.6 | GET /api/campaigns — list + pagination | ✅ PASS | Returns array with pagination shape; `htmlContent` absent from list ✅ |
| T7.7 | GET /api/campaigns?page=1&limit=1 | ✅ PASS | 1 campaign returned, `pagination: { page:1, limit:1, total:3, pages:3 }` |
| T7.8 | GET /api/campaigns/:id | ✅ PASS | `200` with full campaign including `htmlContent` ✅ |
| T7.9 | GET nonexistent campaign | ✅ PASS | `404 { error: "Campaign not found" }` |
| T7.10 | userId scoping confirmed | ✅ PASS | All 5 queries in campaigns.js include `userId: req.user.id` — confirmed in code |
| T7.11 | PATCH /:id/name valid | ✅ PASS | `200 { campaign: { name: "Updated Newsletter Name" } }` |
| T7.12 | PATCH /:id/name empty | ✅ PASS | `400 { error: "\"name\" is not allowed to be empty" }` |
| T7.13 | DELETE /:id | ✅ PASS | `200 { message: "Campaign deleted" }` |
| T7.14 | GET after deletion | ✅ PASS | 2 campaigns remain, "Invoice Batch April" gone ✅ |
| T7.15 | DELETE already-deleted | ✅ PASS | `404 { error: "Campaign not found" }` |

---

## Summary Table

| Test | Description | Result |
|------|-------------|--------|
| T1.1 | Health check | ✅ PASS |
| T1.2 | Unknown route 404 | ✅ PASS |
| T1.3 | CORS header | ✅ PASS |
| T2.1 | All 4 tables exist | ✅ PASS |
| T2.2 | Sessions table exists | ✅ PASS |
| T2.3 | General template seeded | ✅ PASS |
| T2.4 | GET /api/templates | ✅ PASS |
| T2.5 | Validate valid HTML | ✅ PASS |
| T2.6 | Validate strips script | ✅ PASS |
| T2.7 | Validate rejects plain text | ✅ PASS |
| T2.8 | Validate rejects empty | ✅ PASS |
| T3.1 | /auth/me no session → 401 | ✅ PASS |
| T3.2 | /auth/google → 302 redirect | ⚠️ WARN |
| T3.3 | Google OAuth browser flow | MANUAL |
| T3.4 | /auth/me with session | ✅ PASS |
| T3.5 | User in database | ✅ PASS |
| T3.6 | Session in database | ✅ PASS |
| T3.7 | Logout | ✅ PASS |
| T3.8 | /auth/me after logout | ✅ PASS |
| T3.9 | Session deleted after logout | ✅ PASS |
| T4.1 | Onboarding status before key | ✅ PASS |
| T4.2 | Invalid Resend key → 400 | ✅ PASS |
| T4.3 | Empty key → 400 | ✅ PASS |
| T4.4 | Valid Resend key submit | MANUAL |
| T4.5 | Onboarding status after key | ✅ PASS |
| T4.6 | Masked API key response | ✅ PASS |
| T4.7 | Key encrypted in DB | ✅ PASS |
| T4.8 | PUT invalid key → 400 | ✅ PASS |
| T4.9 | PUT valid key | MANUAL |
| T4.10 | DELETE API key | ✅ PASS |
| T4.11 | GET after removal | ✅ PASS |
| T4.12 | Re-add key | MANUAL |
| T4.13 | Unauthenticated settings → 401 | ✅ PASS |
| T5.1 | GET template full object | ✅ PASS |
| T5.2 | Validate valid HTML | ✅ PASS |
| T5.3 | Validate strips script | ✅ PASS |
| T5.4 | Validate strips iframe | ✅ PASS |
| T5.5 | Validate rejects no tags | ✅ PASS |
| T5.6 | Validate rejects too large | ⚠️ WARN |
| T6.1 | AI generate no session → 401 | ✅ PASS |
| T6.2 | AI generate short prompt → 400 | ✅ PASS |
| T6.3 | Generate invoice email | ❌ FAIL |
| T6.4 | Generate with subject | ❌ FAIL |
| T6.5 | Generate newsletter | ❌ FAIL |
| T6.6 | Generate not onboarded → 403 | ✅ PASS |
| T7.1 | Campaigns no session → 401 | ✅ PASS |
| T7.2 | Campaigns no API key → 403 | ✅ PASS |
| T7.3 | Campaigns missing subject → 400 | ✅ PASS |
| T7.4 | Create auto-named campaign | ✅ PASS |
| T7.5 | Create named campaign SEPARATELY | ✅ PASS |
| T7.6 | List campaigns + pagination | ✅ PASS |
| T7.7 | List with page+limit params | ✅ PASS |
| T7.8 | Get single campaign | ✅ PASS |
| T7.9 | Get nonexistent → 404 | ✅ PASS |
| T7.10 | userId scoping in queries | ✅ PASS |
| T7.11 | Rename campaign | ✅ PASS |
| T7.12 | Rename empty name → 400 | ✅ PASS |
| T7.13 | Delete campaign | ✅ PASS |
| T7.14 | List after deletion | ✅ PASS |
| T7.15 | Delete already-deleted → 404 | ✅ PASS |

---

## Totals

| Category | Count |
|----------|-------|
| ✅ PASS | 47 |
| ❌ FAIL | 3 |
| ⚠️ WARN | 2 |
| MANUAL | 4 |
| **Total automated** | **52** |

---

## Failures — Root Cause + Fix

### ❌ T6.3, T6.4, T6.5 — AI generation returns 500

**Returned:** `500 { error: "AI generation failed" }`
**Expected:** `200 { html: "...", subject: "..." }`

**Root cause:** `server/utils/gemini.js` line 1:
```js
const { GoogleGenerativeAI } = require('@google/genai');
```
Package `@google/genai` v1.49.0 does **not** export `GoogleGenerativeAI`. It exports `GoogleGenAI`. The import resolves to `undefined`, so `new GoogleGenerativeAI(key)` throws `TypeError: GoogleGenerativeAI is not a constructor`.

**Suggested fix** in `server/utils/gemini.js`:
```js
// Change line 1 from:
const { GoogleGenerativeAI } = require('@google/genai');
// To:
const { GoogleGenAI } = require('@google/genai');

// Change getClient() from:
return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// To:
return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Change generateContent call — new SDK uses client.models.generateContent():
const response = await client.models.generateContent({
  model: MODEL,
  contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
  config: {
    systemInstruction: systemPrompt,
    temperature: 0.7,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  },
});
const raw = response.text;
```

---

## Warnings — Detail

### ⚠️ T3.2 — GOOGLE_CLIENT_ID is a placeholder

`GOOGLE_CLIENT_ID=from_google_console` in `.env`. The redirect URL is built correctly (correct scopes, access_type=offline) but OAuth will fail in the browser until a real client ID is set. Also `redirect_uri` uses port 5000 but server runs on 3001 — `GOOGLE_CALLBACK_URL` in `.env` needs updating to `http://localhost:3001/auth/google/callback`.

### ⚠️ T5.6 — Large payload rejected with 413 not 400

Express body-parser default limit is ~100KB. A 600KB payload hits Express before Joi's 512000-char check runs, returning `413 request entity too large` instead of `400`. The request is still rejected, but clients expecting a Joi 400 error will get 413. Fix: either raise Express body limit (`express.json({ limit: '600kb' })`) so Joi can validate it, or accept 413 as correct behavior for truly oversized payloads.
