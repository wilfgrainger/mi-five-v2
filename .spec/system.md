# The Soul

## Architecture
The system consists of a Vite React SPA frontend calling a Cloudflare Workers/Hono backend. Data is stored in Cloudflare D1. The application acts as a "Secret Agent Training" puzzle game. Puzzles are either statically defined in the frontend (`src/data/puzzles.ts`) or generated on-the-fly via `src/puzzleGenerator.ts`. Authentication uses simulated magic links (no real email sending, link printed to console) and UUIDs. The database records user progress, tokens, and sessions.

## Intent
Provide a fun, engaging platform for users to solve spy-themed puzzles, track their scores, and rank up on a leaderboard.

## Vibe
"Vibe-to-Cloud", Cyberpunk, Secret Agent. UI uses monospace fonts, terminal styling, and glitch effects to simulate a secure operative console.

## Domain Boundaries
- Frontend: Responsible for presentation, handling local puzzle logic (like Mastermind), and requesting server-side generated puzzles.
- Backend: Responsible for authentication (magic links), tracking user scores/ranks, maintaining the leaderboard, and generating/verifying dynamic puzzles.
- Database: Source of truth for users, sessions, generated puzzles, and solved puzzles.

## Invariants
- `node:crypto` CSPRNGs MUST be used instead of `Math.random` for all unpredictability.
- Code-first payload changes are strictly forbidden. The `.spec/interface.json` dictates the data contracts.
- Puzzle generation scripts must append to `src/data/puzzles.ts` safely without overwriting.

## Quality Bar
- No console.log debugging left in production paths (except simulated email links).
- Strict adherence to TypeScript interfaces.
- Elegant, simple implementations with root-cause analysis for any bugs.
