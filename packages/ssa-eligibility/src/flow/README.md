# SSA Eligibility Flow

This flow represents the SSA eligibility logic for determining for which benefits a customer may be eligible. This is organized as follows:

- [`content`](content): Customer facing copy
- [`json`](json): Stub for testing data
- [`lib`](lib): Utility methods for flow content
- [`logic`](logic): All business logic for wizard

All of this code comes together in [`eligibility.flow.ts`](eligibility.flow.ts), which is responsible for joining together the copy and logic for actions, pages, questions and results. In addition to defining the data input to the wizard control, this controller specifies events for analytics and some minimal configuration.