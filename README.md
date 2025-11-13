# newportfolio

## Deploy notes — injecting API URL for frontend (Render)

This repository serves a static frontend (in `client/`) and an Express backend.
When deploying the frontend as a separate static site (e.g. on Render), you
should inject the backend URL at build time so the frontend knows where to
send API requests.

We provide a small helper script: `scripts/generate-config.js`.

1. Add an environment variable in Render static site settings named `API_BASE_URL`.
	Example value: `https://friendly-backend.onrender.com` (no trailing slash).
2. Set the static site's Build Command to:

```
npm run generate-config
```

3. The script writes `client/config.js` containing `window.__API_BASE_URL__`.
	The frontend loads `client/config.js` before `api-client.js` and the client
	will post to the configured backend origin.

For single-service deployments (backend serves the frontend), you can skip
this step — the frontend will use a relative path to call `/api/submit-form`.

