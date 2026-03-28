# Request: Register a Single-Page Application in Azure Entra ID

Hi, I need an app registration in our Planet Entra ID tenant for a training course app (Solar DS Academy). Here's what I need:

## 1. Create an App Registration

- **Name:** Solar DS Academy
- **Supported account types:** Accounts in this organizational directory only (single tenant)
- **Platform:** Single-page application (SPA)
- **Redirect URI:** `https://friendly-adventure-3q7jm84.pages.github.io`

## 2. Values I need back

- **Application (client) ID** — the GUID from the app registration overview
- **Directory (tenant) ID** — the GUID of our Planet Entra ID tenant

## 3. API Permissions (should be set by default, but please verify)

- Microsoft Graph → `openid` (delegated)
- Microsoft Graph → `profile` (delegated)
- Microsoft Graph → `email` (delegated)

No client secret is needed — this is a public SPA that uses the authorization code flow with PKCE (handled by MSAL.js).

## 4. Optional but recommended

- Grant admin consent for the three permissions above so users aren't prompted individually.
- If access should be restricted to specific people, enable **"User assignment required"** under Enterprise Applications → Properties, and assign the relevant users or groups.

Once I have the Client ID and Tenant ID, I can configure the app and it should be ready to go.

Thanks!
