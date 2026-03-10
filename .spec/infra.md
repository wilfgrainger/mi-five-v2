# The Reality

## Runtime Constraints
- Backend runs on Cloudflare Workers using the Hono framework.
- Uses Cloudflare D1 for SQLite relational database functionality.
- Uses standard Web Crypto APIs or Node.js `node:crypto` depending on environment context (e.g. `crypto.getRandomValues` in worker vs `node:crypto` in scripts).
- Frontend runs in browser, built via Vite.

## Deployment Rules
- Built with Vite (`npm run build`).
- Deployed via Wrangler to Cloudflare Pages (`wrangler pages dev dist` / `wrangler pages deploy`).
- D1 Database schema maintained in `schema.sql`.
- Migration of legacy Google AI stack to native/local equivalents is an ongoing directive.

## Anti Gravity Operational Notes
- Enforces strict "Vibe-to-Cloud" protocol.
- Follows the Apex Trinity (Soul, Contract, Reality).

## Observability
- No formal telemetry defined yet. Simulated email logs are written to `console.log`.
