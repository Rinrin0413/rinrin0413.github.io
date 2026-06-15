# AGENTS.md Instructions

This project is Rinrin.rs' official website. Rinrin.rs is a Japanese university student.

This website supports only Japanese and English. Localization is managed via `ja.json` and `en.json` files located in the `src/lib/locales/` directory.

## Technical Stack

- Frontend: Svelte 4, SvelteKit 2, SCSS
- Language: TypeScript 5 (strict mode)
- Hosting: Cloudflare Pages
- Repository: https://github.com/Rinrin0413/rinrin0413.github.io

## Commands

- Clean install: `npm clean-install`
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Check & format & lint: `npm run check && npm run fmt && npm run lnt`

## Code Style

- Use TypeScript strict mode.
  - Use `===` and `!==` (Strict Equality).
  - No implicit booleans in conditionals (e.g., `if (0 < count)` or `if (user !== null)`).
- Use SCSS instead of Vanilla CSS.
  - `src/lib/stylesheets/variables/` directory contains utility SCSS files `_color.scss`, `_mixin.scss`, and `_dimension.scss`.
    To use them in SCSS files or `<style lang="scss">` blocks, import as `@use '$lib/stylesheets/variables/color' as *;`.
    - `_color.scss` defines color variables used throughout the project, including text colors, background colors, header colors, button colors, line color, and other project-wide colors.
    - `_mixin.scss` defines mixins and breakpoints for targeting specific screen widths, specifying fonts or their weights, using glassmorphism or button styles, and providing several general-purpose mixins.
    - `_dimension.scss` defines dimension variables used throughout the project, including header heights, realtime viewport heights, and other project-wide dimensions.
    - Only add variables or mixins to these files if they are shared across **multiple** components or files.
- Follow the Svelte 4 best practices.
- Write comments and documentation in English.

## Other Instructions

- When specifying fonts or their weights, use dedicated Sass mixins.
- When using the `z-index` property, ensure you update the Z-Index list in `docs/SPECIFICATION.md`.
- When adding new CSS variables (not Sass variables), ensure you update the CSS Variables list in `docs/SPECIFICATION.md`.

## Other Docs

- `docs/SPECIFICATION.md`:
	- Z-Index list
	- CSS Variable list (not Sass variables)
	- Font list
	- API Endpoint list
- `docs/blog.md`: Instructions for adding blog articles, including file naming rules and thumbnail image requirements.
- `docs/when-added-new-page.md`: Instructions for what to do when adding a new page.
