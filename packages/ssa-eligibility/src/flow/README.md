# SSA Eligibility Flow

This flow represents the SSA eligibility logic for determining for which benefits a customer may be eligible. This is organized as follows:

- [`content`](content/README.md): Customer facing copy
- [`json`](json/README.md): Stub for testing data
- [`lib`](lib/README.md): Utility methods for flow content
- [`logic`](logic/README.md): All business logic for wizard

All of this code comes together in [`eligibility.flow.ts`](eligibility.flow.ts), which is responsible for joining together the copy and logic for actions, pages, questions and results. In addition to defining the data input to the wizard control, this controller specifies events for analytics and some minimal configuration.