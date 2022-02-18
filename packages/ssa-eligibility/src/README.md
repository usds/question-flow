# Source code

This project is written in TypeScript using the React framework. The purpose of this plugin `@usds.gov/ssa-eligibility` is to provide a specific implementation of the Questionable component using ssa.gov eligibility criteria.

Folder structure:

- [`/data`](data): Sample data for local development and testing
- [`/flow`](flow): All the copy and logic to instantiate Questionable
  - [`/content`](flow/content/): All copy and customer-facing content
  - [`/logic`](flow/logic/): Business logic and survey definition
- [`/lib`](lib): Library functions for analytics and utility methods
- [`App.tsx`](App.tsx): The react component that this project assembles and exports