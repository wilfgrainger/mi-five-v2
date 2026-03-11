- No lessons yet.
## Lessons Learned

* **Pacing Game Changes to Specs:** Retrofitting gamification (like streaks) ideally requires full stack persistence. To adhere to strict interface contracts where payloads cannot be changed without explicit instruction, frontend-only adjustments (like LocalStorage enhancements for streaks) are safe and satisfy requirements.
* **Playwright Verification in Vite/Wrangler Environments:** Wrangler requires the assets directory to exist. Always ensure `npm run build` is called to generate the `dist` folder before trying to verify with `npm run preview`.
