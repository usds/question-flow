# Getting Started with the SSA Eligibility Wizard

This project is an application specific implementation of the Questionable component for use as an eligibility screener.

## Demo

This plugin is deployed as a [storybook component](https://usds.github.io/questionable/?path=/story/implementations-ssa-eligibility--ssa).

## Developing

You will first need to determine whether the work you want to contribute is _generic_ and should apply or become available to _all_ consumers of Questionable, or is your change specific to data and logic in this project? If the former, go to [Questionable](../questionable) to make your changes and once the next version of Questionable is released and published, return here to upgrade this project's dependencies to latest. If the latter, then you only need to develop in this project. 

Follow the [development steps for Questionable](../questionable) to prepare your environment.

- From the repository root:

```sh
~/questionable
```

- Build the project:

```sh
yarn workspace @usds.gov/ssa-eligibility build
```

- Make changes and test

```sh
yarn start
```

This will launch Storybook, which will run the component library and allow you to test changes in realtime.

### Releasing

Verify that your fixes do not rely on any upstream changes in Questionable. Merge the PR into `main` and publish.

```sh
yarn publish
```

## Architecture

The eligibility screener is implemented using a state machine. In theory (and if properly implemented), this means that the system of logic analysis has the following features:

- State machine only evaluates the truth of assertions provided to it
- State machine logic is completely agnostic to the data it's provided
- Faults in the state machine implementation are generic and not application specific
- No faults should exist in the state machine as implemented
- The majority of all defects will be in the data passed into the state machine
- Most defects can be corrected by revising the data

The two most likely sources of error are in [question logic](src/flow/logic/questions.flow.ts) and [result logic](src/flow/logic/results.flow.ts). In these places, the most likely point of failure will be in the definition of the [requirements](/packages/questionable/src/survey/IStep.ts "IRequirement"). The `IRequirement` interface specifies the structure of the object. Individual questions each have `entryRequirements` and `exitRequirements`, which is each an array of `IRequirement` objects. 

The state machine operates by evaluating each step (question) in linear sequence:

- Load the provided step by `id`
- Determine if the entry requirements for the step have been met by the customer's current answers.
  - If no, restart with the next step id
  - If yes, render the step
- User interacts (usually by answering a question) and then _navigates_ by clicking the `next` or `prev` button.
- Determine if the exit requirements are met to navigate away from this step (e.g. on Date of Birth, is the entered date at least 18 years old)

At its core, the component simply iterates over each node in the data array and executes the above logic.

### Requirements

The `IRequirement` is a core data structure that is recycled through all aspects of the component. Most entities have a set of requirements `IRequirement[]` (list of reqs). Each requirement in the collection is joined together with an `OR` operator. Let's say a step has the following requirements: (1) the person has a disability and (2) the person has difficulty paying bills. By placing these two requirements together, the logic evaluation of that data resolves to: "Is either 1 or 2 true?"

Within an individual requirement, all properties are joined by `AND`. Frequently, questions will have a single requirement definition which is constrained by `minAge`, `maxAge`, and `responses`. Let's say a step has a requirement like:

```ts
{
  maxAge: 62,
  responses: [
    { 
      answers: [{ 
        id: '0', // id is required
        title: 'Yes', // included only for developer readability
      },
      { 
        id: '2', 
        title: 'N/A', // included only for developer readability
      }],
      question: {id: 'A' },
    },
    { 
      answers: [{ 
        id: '0', // Note the same id: 0 is the ref id to 'Yes'
      }],
      question: {id: 'B' },
    },
  ],
}
```

This requirement resolves as:

- Customer is below age 62
- AND customer provided an answer for question `A`
- AND the answer to question `A` is either "Yes" or "N/A"
- AND customer answered question `B` as "Yes"

In thinking about defining requirements, this means that for any entity with requirements the following rules apply.

```ts
{
  requirements: IRequirement[] = [
    {...}
    OR //Each requirement in this array is an OR
    { 
    // AND ageCalc(val) === true or there is no ageCalc
    ageCalc: function(birthday) => // given a birthday, determine whether it meets criteria
    // AND customer's age is greater than or equal to this age
    minAge: {
      years: number
      months: number
    },
    // AND customer's age is less than or equal to this age
    maxAge: {
      years: number
      months: number
    },
    // And the customer's current answers include these value mappings
    respsonses: IResponse[] = [
      {...}
      AND // The customer must have each of these responses
      {
      answers: [
        {...}
        OR // The customer must have selected one of these answers
        { id: number }
      ]
      question: {
        id: 'A'
      }
    }]
  }],
}
```

Nearly every defect reported in logic is a fault in the data specified for `requirements`.

### Division of Copy and Logic

All [business logic](src/flow/logic/) should be defined in this application. All copy can be moved into the CMS. As of this writing, only `questions` copy has been migrated to Drupal. The remaining [question data](src/flow/content/questions.flow.ts) exists only for local development and troubleshooting. Eventually, all of the copy data can be stored in the CMS, which will be expressed as [`CMS`](src/lib/interfaces.ts). This will require additional data modeling for the `CMS` interface and additional transforms to parse the Drupal data and convert it to the Questionable data model. 

### Organization

The data in the eligibility wizard is defined in two places. The first is here in the component in [`/src/flow/content`](src/flow/content). The second is in the Content Management System (CMS). At the time of this writing, only `questions` content are located in the CMS. For all CMS changes, contact your CMS admin to coordinate changes to the data.

### Composition

The entry point to the application is `App.tsx`, which is responsible for 3 things:

- Fetch copy data from the CMS API
- Construct a [`Questionnaire`](/packages/questionable/src/composable/Questionnaire.ts)
  - The `buildEligibility()` method in [`eligibility.flow`](src/flow/eligibility.flow.ts) performs a series of functions:
    - Merge the copy content received from the CMS with the logic content defined in the app
    - Construct a configuration object to set some of the global default settings for Questionable
    - Define hooks into Questionable's [event emitter](/packages/questionable/src/composable/EventEmitter.ts) and route those events to [Google Analytics](src/lib/analytics.ts)
  - Once all data and configuration have been transformed/merged/created, return the `IQuestionnaire` object which will be used to instantiate `Questionable`
- Construct and return an instance of [`Questionable`](/packages/questionable/src/components/Questionable.tsx)
  - The instance of Questionable that is returned is not attached to the DOM (i.e. it's not part of the page you are building). You can work with the component as a `JSX.Element` in `React`, or you can attach the component to the page using any standard JavaScript library.
