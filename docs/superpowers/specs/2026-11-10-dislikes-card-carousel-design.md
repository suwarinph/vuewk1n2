# Dislikes Card Carousel Design

## Intent

Make the Things I Dislike section easier to browse and more visually playful by presenting each dislike as a card and letting its image pop beyond the card when selected.

## Goals

- Change only the Dislikes section; preserve the current Likes presentation.
- Show up to three cards at once. When there are more than three items, provide previous/next controls to browse the remaining cards.
- Let the selected card's image enlarge and float beyond the card with a layered, perspective-like effect while keeping the card's text visible.
- Keep the interaction usable on narrow screens and with keyboard focus.

## Non-goals

- A modal or lightbox for images.
- Changing the dislike content or other page sections.

## Approaches

- **Three-card carousel with a floating selected image (chosen):** shows up to three items and adds previous/next controls only when needed; selected image scales beyond its card. This matches the requested browsing and 3D-like effect.
- **Single-card carousel with a lightbox:** focuses on one item and opens its image separately. This uses more steps and does not keep the image visibly popping from its card.

## Constraints and implementation choices

- The page uses Vue 2 and a shared `ContentListSection` for Likes and Dislikes. Add a Dislikes-specific variant through the existing section props or an equivalent scoped condition, leaving Likes unchanged.
- Respect reduced-motion preferences and preserve image fallback behavior.
- Card count and navigation should derive from the supplied items so future entries work without content-specific code.

## Open to implementation

- Exact card spacing, colors, and animation timing should follow the current site styles.
- Navigation should wrap between the first and last card set, with controls labeled for assistive technology.
