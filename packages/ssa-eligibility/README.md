# Getting Started with the SSA Eligibility Wizard

This project is an application specific of the Questionable component for use as an eligibility screener.

## Developing

You will first need to determine whether the work you want to contribute is _generic_ and should apply or become available to _all_ consumers of Questionable, or is your change specific to data and logic in this project? If the former, go to [Questionable](../questionable/README.md) to make your changes and once the next version of Questionable is released and published, return here to upgrade this project's dependencies to latest. If the latter, then you only need to develop in this project. 

Follow the [development steps for Questionable](../questionable/README.md) to prepare your environment.

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

### Organization

The data in the eligibility wizard is defined in two places. The first is here in the component in [`/src/flow/content`](src/flow/content/README.md). The second is in the Content Management System (CMS). At the time of this writing, only `questions` content are located in the CMS. For all CMS changes, contact your CMS admin to coordinate changes to the data.

