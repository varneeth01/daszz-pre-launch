---
  name: Daszz shadcn/ui typecheck noise
  description: Pre-existing typecheck errors in unused shadcn/ui boilerplate components
  ---

  ## Rule
  Ignore typecheck errors from `artifacts/daszz/src/components/ui/` — they are pre-existing shadcn/ui boilerplate that was never imported by the actual app.

  **Why:** The project was scaffolded with a full shadcn/ui component set whose peer dependencies are not installed. None of these components are imported by any page or component in the Daszz app.

  **How to apply:** When running `pnpm --filter @workspace/daszz run typecheck`, filter out errors from `src/components/ui/` — any errors outside that directory are real and need fixing.
  