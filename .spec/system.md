# The Soul

## Architecture
The system consists of a Vite React SPA frontend calling a Cloudflare Workers/Hono backend. Data is stored in Cloudflare D1. The application acts as a "Secret Agent Training" puzzle game. Puzzles are either statically defined in the frontend (`src/data/puzzles.ts`) or generated on-the-fly via `src/puzzleGenerator.ts`. Authentication uses simulated magic links (no real email sending, link printed to console) and UUIDs. The database records user progress, tokens, and sessions.

## Intent
Build a top-tier, highly engaging, and profitable "Spy Game" appealing to a broad demographic: kids through to adults. It must balance accessible onboarding (for younger/casual players) with deep, challenging mechanics (for adults/hardcore puzzle solvers) to maximize user retention and potential monetization.

## Vibe
"Vibe-to-Cloud", Cyberpunk, Secret Agent. The UI balances a secure operative console feel (monospace fonts, terminal styling) with polished, gamified interactions to ensure approachability for kids while retaining the edge expected by older users. It must look and feel premium.

## Domain Boundaries
- Frontend: Responsible for presentation, handling local puzzle logic, managing user session state cleanly, and requesting server-side puzzles. Must gracefully handle varying screen sizes and provide clear visual feedback.
- Backend: Responsible for authentication (magic links), tracking user progression, rank updates, and generating/verifying dynamic puzzles.
- Database: Source of truth for users, sessions, generated puzzles, and solved puzzles.

## Invariants
- `node:crypto` CSPRNGs MUST be used instead of `Math.random` for all unpredictability.
- Code-first payload changes are strictly forbidden. The `.spec/interface.json` dictates the data contracts.
- Puzzle generation scripts must append to `src/data/puzzles.ts` safely without overwriting.

## Quality Bar
- No console.log debugging left in production paths (except simulated email links).
- Strict adherence to TypeScript interfaces.
- Elegant, simple implementations with root-cause analysis for any bugs.
- Production-ready error handling and user feedback loops.
