# Codebase Remediation Plan (Retrofit)

- [x] Audit existing codebase
- [x] Determine drift
- [x] Establish initial Spec
- [x] Output Genesis bootstrap message and confirm Vibe

## Daystem Retrofit Targets
- [ ] Investigate legacy script `generate.cjs` vs `puzzleGenerator.ts` and quarantine/remove obsolete or duplicated generation logic. (REMOVE/REPAIR)
- [ ] Review `worker/index.ts` to ensure `node:crypto` / `crypto.getRandomValues` is strictly enforced everywhere for CSPRNG (e.g., when making random magic link tokens, `uuidv4` handles this but we need to ensure it's cryptographically secure). (KEEP/REPAIR)
- [x] Evaluate `src/App.tsx` and UI for a "Kids to Adults" scalable gameplay feel. Ensure proper onboarding flow and no missing states. Added: Leaderboard view, puzzle yield badges, RECOMMENDED specialization badges, Next Mission CTA.
- [ ] Verify there is no rogue legacy Google AI (`@google/genai`) code left. Wait, checked already and didn't find any. (VERIFIED CLEAR)
- [ ] Ensure that `puzzles.ts` generated puzzles don't overwrite manual ones. (REPAIR `generate.cjs` to append robustly).
