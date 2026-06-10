---
  name: Daszz green palette & design system
  description: Color system, font setup, and green palette rules for the Daszz launch website
  ---

  ## Rule
  Green colors MUST use CSS custom properties or inline styles — never Tailwind `green-*` utilities.

  **Why:** The Daszz palette (#07110D, #8FCFB0, #F4F1E8, #9DAEA4, #6FAF91, #2F6B55) does not map to Tailwind's default green scale. Using `green-*` utilities produces wrong colors.

  **How to apply:**
  - Use `style={{ color: "#8FCFB0" }}` or `style={{ background: "#07110D" }}` for inline overrides
  - Use `var(--primary)`, `var(--background-deep)`, `var(--cream)` etc. for CSS-level references
  - Tailwind utility classes `text-primary`, `bg-background`, `text-muted-foreground` are fine — they map to the CSS vars defined in `src/index.css`
  - Border: `rgba(183,228,199,0.08-0.20)` for green-tinted borders
  - Surface: `rgba(143,207,176,0.02-0.06)` for green-tinted card backgrounds
  - Fonts: `font-display` → Cormorant Garamond (loaded in index.html), `font-sans` → DM Sans
  