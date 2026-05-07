# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Serve the production build locally
```

No test runner or linter is configured yet.

## Architecture

This is a single-file React app. All logic lives in `src/BlenzNetwork.jsx`, which is mounted by `src/main.jsx`.

### Component structure

`BlenzNetwork` (default export) is the shell — it owns the active tab state and renders the fixed header and bottom tab bar. It delegates to four tab components, each fully self-contained with their own local state:

| Component | Purpose |
|---|---|
| `ProspectsTab` | Pipeline view grouped by stage; add/edit/advance/delete prospects |
| `IBOsTab` | Team members grouped by speed (Run/Jog/Walk); check-in overdue alerts |
| `CustomersTab` | Customer records with preferences, order history, and auto-suggested products |
| `CalendarTab` | Chronologically sorted events with title, date/time, location, notes |

### Data patterns

- All data is in-memory React state initialized from `SAMPLE_*` constants at the top of the file. There is no persistence layer.
- The detail view pattern is consistent: a `selected` state variable holds the current record; when set, the tab renders a detail form instead of the list. Inline `upd(field, val)` functions write back to both `selected` and the parent array simultaneously.
- `getSuggested(customer)` cross-references a customer's `preferences` array against the `PRODUCTS` catalog, filtering out items already in `orders`.
- `daysSince(dateString)` drives the IBO check-in overdue indicator (≥7 days triggers a warning).

### Styles

All styles are defined in a single `S` object as plain JS style objects — no CSS files or CSS-in-JS library. Reuse `S.*` keys rather than writing inline styles for new UI.
