# Getting Started with the Eligibility Wizard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Organization

The project is intended to be a generic wizard suitable for testing eligibility workflows and perhaps other point of entry flows that rely on simple state machine mechanics and can be expressed as a set of linear steps with rules governing their sequence according to branching logic.

Since this is an early prototype, the data input for this version are stored in the `flows` directory. The prototype is architected to make no assumptions about the data in this directory except for (1) its location and (2) that the format complies with the survey interfaces. Future iterations will make (1) configurable so the protype can load data from arbitry resources.

- `flows`: A collection of discrete workflows
- `state`: React reducer for the aggregation of survey data
- `steps`: UI components used for rendering each question in the survey
- `survey`: Core interfaces and classes for the data structure of the question/anwer/results
- `util`: Generic helper utilities
- `wizard`: UI components used to create the wizard container

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn deploy`

Builds and deploys the app to GitHub Pages.