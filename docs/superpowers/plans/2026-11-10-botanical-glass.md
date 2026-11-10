# Botanical Glass Implementation Plan

**Goal:** Redesign the existing Vue 2 / Vuetify portfolio directly using the user's detailed Botanical Glass specification and personalContent.js as the content source.

**Architecture:** Keep existing routes, data, music playback and grade calculation. Refine existing component markup and replace the visual stylesheet with a unified responsive design system. Use a visible-by-default, once-on-entry reveal.

**Constraints:** No dependency commands or manifest/lockfile changes. No new personal content or imagery. Work in the requested existing workspace; preserve its untracked files. The supplied specification authorizes direct implementation without a separate approval stage.

## Tasks
- [x] Reproduce reveal hiding and establish a regression check before changing behavior.
- [x] Define five-color tokens, accessible glass fallbacks, typography and responsive spacing.
- [x] Redesign floating navigation, integrated hero/education, symmetrical navigation cards, music, editorial likes, two dislike cards and footer.
- [x] Restyle calculator without changing its script or validation.
- [x] Implement once-on-entry reveal, reduced motion, observer cleanup and failure fallback.
- [x] Verify build/lint, desktop/mobile rendering, anchor/route/history navigation, music playback/seeking/exclusivity, grade boundaries/errors/reset and visibility failures.

## Review focus
- Full-page capture without scrolling must contain offscreen content.
- Observer unavailable or failing must leave content visible.
- Closed mobile menu must not receive keyboard focus.
- Thai titles must wrap and controls remain at least 44px.
- Manifest, lockfile, personal data and calculator script must remain unchanged.

## Decisions
- Use existing artwork only; botanical shapes are CSS decorations.
- No Drawing subsection exists; do not invent one.
- Keep existing selectable dislikes and pagination for larger data sets.
- Superdesign's npx bootstrap conflicts with the no-install requirement; use direct local implementation of the supplied design system.

## Validation and review
- Browser plugin was not available in this session. Used existing runtime Playwright with installed Chrome, without installing packages, against http://127.0.0.1:8081.
- Baseline: 19 of 28 reveal elements were opacity:0 before scrolling. New full-page capture: 0 hidden, including offscreen elements. Original observer re-hid content whenever it left the viewport; initial mount also hid all elements until intersection notifications arrived.
- New reveal uses a transient 700ms, 24px entry keyframe, with 100–150ms related-element delays. Offscreen/failed-observer content remains visible. Revealed elements are unobserved; teardown disconnects observers. Reduced motion disables animation.
- Tested observer absent, stalled, observe() throwing, constructor throwing, scroll-away persistence and route teardown. Constructor failure originally produced Vue console errors in Navbar; guarded setup removes those errors.
- Tested widths 320, 390, 640, 768, 1024 and 1440 on both routes; no horizontal overflow. Visually inspected desktop and mobile full-page captures and calculator screens.
- Tested navigation cards, active scroll spy, anchor heading clearance, mobile open/close/Escape/focus restoration, cross-page anchors, back-to-top and browser back/forward.
- Tested all three real MP3 files: playback, pause/resume, seek to 30 seconds and exclusive track switching. MusicCard.vue is byte-for-byte unchanged. Headless browser confirms media state/decoding; physical speaker output was not evaluated.
- Calculator script is byte-for-byte unchanged. Passed 13 valid input cases including 0/50/60/70/80/100, values just below boundaries, decimals and trimmed input; nine invalid/empty/out-of-range cases; Enter submission, result clearing and Reset.
- Every nonempty supplied personal name, introduction, education string, track title/artist, like/dislike title and description is present verbatim. Existing placeholder descriptions remain as supplied.
- package.json, package-lock.json, personalContent.js and MusicCard.vue SHA256 hashes are unchanged. No dependency commands were run.
- Read-only code review identified 44px target sizes, small-text contrast and observer error handling; all addressed and checked. An initial ARIA test exposed Vue 2 removing false-valued attributes; aria-expanded/pressed now use explicit strings and keyboard retest passed.
- npm.cmd run lint -- --no-fix: passed. npm.cmd run build: passed with seven warnings concerning bundle/asset sizes and large files excluded from PWA precaching. These existing assets/configuration were retained.
- Remaining limits: browser QA used Chrome only, with no Firefox/Safari, physical-device or offline verification. Glass fallback is implemented via @supports; an actual legacy browser without backdrop-filter was not available.

## Files changed
- src/styles/main.css
- src/components/AboutMe.vue
- src/components/Navbar.vue
- src/components/SectionNavigation.vue
- src/components/Hobbies.vue
- src/components/MusicCorner.vue
- src/components/ContentListSection.vue
- src/components/FooterSection.vue
- src/components/RevealOnScroll.vue
- src/views/HomeView.vue
- src/views/GradeCalculator.vue
- docs/superpowers/plans/2026-11-10-botanical-glass.md
