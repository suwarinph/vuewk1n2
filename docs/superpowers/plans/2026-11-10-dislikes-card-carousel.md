# Dislikes Card Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Present Things I Dislike as a responsive set of cards with optional carousel controls and an enlarged image that floats beyond its selected card.

**Architecture:** Keep the shared `ContentListSection` component and add a Dislikes-only rendering mode based on its existing `id` prop. Use a three-item page, derive controls from `items.length`, and keep card selection local to the component; add scoped CSS for the card layout and raised image.

**Tech Stack:** Vue 2.7 single-file components, existing CSS, Vue CLI.

**Spec:** `docs/superpowers/specs/2026-11-10-dislikes-card-carousel-design.md`

## Global Constraints

- Change only the Dislikes presentation; preserve the current Likes presentation.
- Show up to three cards at once. When there are more than three items, provide previous/next controls to browse the remaining cards.
- Let the selected card's image enlarge and float beyond the card with a layered, perspective-like effect while keeping the card's text visible.
- Keep the interaction usable on narrow screens and with keyboard focus.
- Respect reduced-motion preferences and preserve image fallback behavior.
- Card count and navigation should derive from the supplied items so future entries work without content-specific code.

## Review Focus

- Empty or short item lists should not show unnecessary navigation; card rendering remains data-driven.
- Item counts above three should navigate through every item, including wraparound from last page to first and vice versa.
- Narrow screens should preserve access to all items while showing one card at a time when three would not fit.
- Image load failures should retain the existing placeholder behavior, and selecting a placeholder should not break the layout.
- Reduced-motion settings should disable the card and image movement.

---

### Task 1: Add Dislikes card carousel behavior

**Files:**
- Modify: `src/components/ContentListSection.vue`

**Interfaces:**
- Consumes: existing `id`, `items`, and image error handling.
- Produces: a Dislikes-only carousel view, selected-card state, and previous/next navigation; Likes continues using the existing row layout.

- [x] **Step 1: Add computed state and navigation methods**

  In `src/components/ContentListSection.vue`, derive whether `id === 'dislikes'`, whether controls are needed (`items.length > 3`), the current page's items, and responsive-safe selected item state. Add previous/next methods that move by one page of three and wrap around. Keep image failure handling intact.

- [x] **Step 2: Render conditional card and control markup**

  Keep the current markup for Likes. For Dislikes, render cards in a three-column page, include labeled previous/next buttons only when more than three items exist, and make each card keyboard-focusable and selectable. Render item title, description, index, and image or existing placeholder. Apply a selected class and keep selected state valid when `items` changes.

- [x] **Step 3: Review behavior against data counts**

  Inspect the component logic for 0, 1, 3, 4, and 7 items. Confirm controls appear only above three items, page movement wraps, and item keys remain stable.

### Task 2: Style the cards and raised image

**Files:**
- Modify: `src/styles/main.css`

**Interfaces:**
- Consumes: the Dislikes-specific classes and selected state from Task 1.
- Produces: card layout and an image that visibly scales beyond its selected card.

- [x] **Step 1: Add desktop card and control styles**

  Add styles scoped to `.content-section--blue` and the Dislikes-specific classes. Show up to three cards in a row with clear card surfaces, consistent spacing, and accessible arrow controls. Ensure the selected card stacks above adjacent cards and its image can overflow the card bounds.

- [x] **Step 2: Add selected-image motion and mobile layout**

  Enlarge the selected card image with a raised z-index, drop shadow, and subtle perspective/translation so it appears to pop out. Keep text visible. At narrow widths, show one card per page when controls are active; when there are three or fewer items, keep all items visible. Under `prefers-reduced-motion: reduce`, remove transform and transition movement.

- [x] **Step 3: Review styles against existing section rules**

  Check specificity against the existing `.content-*` responsive rules, and confirm the new styles do not affect the orange Likes section.

## Execution notes

- Ruling: Keep all items visible when there are three or fewer, including on mobile — otherwise one-card mobile pages would hide items without controls — at the cost of a short vertical stack on narrow screens.
- Final review: read-only review found and fixed the mobile item-access issue; the author reviewed the full change after the fix.
- Tests and build were not run.
