# @usds.gov/questionable

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

If you have questions, you have questionable content. Questionable is a USDS React component that transforms complex workflows into a simple, linear wizard.

![q](https://user-images.githubusercontent.com/73488661/120005468-d9d42480-bfa5-11eb-9fc2-c940bfd473ea.gif)

## Install

Install this package with npm or yarn:

```sh
yarn add @usds.gov/questionable
```

or

```sh
npm i @usds.gov/questionable
```

## Usage

It is strongly suggested applications use the same version of [USWDS](https://designsystem.digital.gov/) that is used by [@trussworks/react-uswds](https://github.com/trussworks/react-uswds). A version mismatch may result in unexpected markup & CSS combinations. This project will stay current with @trussworks/react-uswds, which is often behind the USWDS by a point release or two.

You can import Questionable components using ES6 syntax:

```ts
import { Questionable } from '@usds.gov/questionable';
```

## Organization

The project is intended to be a generic wizard suitable for testing eligibility workflows and perhaps other point of entry flows that rely on simple state machine mechanics and can be expressed as a set of linear steps with rules governing their sequence according to branching logic.

- `flows`: A collection of example workflows ranging from simple to complex
- `state`: React reducer for the aggregation of survey data
- `components`: UI components used for rendering each question in the survey
- `survey`: Core interfaces and classes for the data structure of the question/anwer/results
- `lib`: Generic helper utilities

## Background

The primary deliverable is a published npm package that can be included as a dependency in other projects that use USWDS with React. In order for these components to be useful, they should follow best practices for accessible, semantic, markup; be well-tested across browsers and devices; and allow for an appropriate level of customization. We adhere to a set of [development guidelines](./github/CONTRIBUTING.md) as much as possible and use automation to enforce tests, linting, and other standards.

### Non-Goals

This is not meant to be a one-size-fits-all front end solution, We are starting off with the opinionated decision to cater towards projects that use the U.S. Design System 2.0, and encapsulate these specific styles and markup in React components.

## Development

In the project directory, you can run:

### `yarn start`

Runs the storybook for the components.\
Open [http://localhost:9009](http://localhost:9009) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn deploy`

Builds and deploys the app to GitHub Pages.

## Maintainers

- [@froehlichcr](https://github.com/froehlichcr)
- [@TomNUSDS](https://github.com/TomNUSDS)

## Contributing

Interested in contributing? See our [guidelines and dev setup here](./github/contributing.md).

This repository is governed by the [Contributor Covenant](./github/CODE_OF_CONDUCT.md)

## Acknowledgements

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- This project uses the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/) and the [@trussworks](https://github.com/trussworks) [React USWDS](https://github.com/trussworks/react-uswds) component library.
- This project uses [Luxon](https://github.com/moment/luxon) for date/time validation.
- The React [use-wizard](https://github.com/use-wizard/use-wizard) provides essential hooks for navigation
- JSON Schema is generated thanks to [ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator)
- JSON to Form edit mode is powered by [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/froehlichcr/"><img src="https://avatars.githubusercontent.com/u/73488661?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Christopher Froehlich</b></sub></a><br /><a href="https://github.com/usds/questionable/issues?q=author%3Afroehlichcr" title="Bug reports">🐛</a> <a href="https://github.com/usds/questionable/commits?author=froehlichcr" title="Code">💻</a> <a href="#design-froehlichcr" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/TomNUSDS"><img src="https://avatars.githubusercontent.com/u/74203452?v=4?s=100" width="100px;" alt=""/><br /><sub><b>TomNUSDS</b></sub></a><br /><a href="#question-TomNUSDS" title="Answering Questions">💬</a> <a href="https://github.com/usds/questionable/issues?q=author%3ATomNUSDS" title="Bug reports">🐛</a> <a href="https://github.com/usds/questionable/commits?author=TomNUSDS" title="Code">💻</a> <a href="https://github.com/usds/questionable/pulls?q=is%3Apr+reviewed-by%3ATomNUSDS" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/usds/questionable/commits?author=TomNUSDS" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
