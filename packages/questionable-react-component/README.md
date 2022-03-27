# Questionable

This is the component project for the `@usds.gov/questionable` React component.

## Development

This project is built using tooling from the NPM ecosystem, TypeScript, Node and React. This guide assumes the use of the [Github CLI](https://cli.github.com/). 

To get started developing:

- Verify that Yarn is installed:

```sh
npm install -g yarn
```

- Clone the project:

```sh
gh repo clone usds/questionable
```

- Switch to project root:

```sh
cd questionable
```

- Install project:

```sh
yarn install
```

- Build project

```sh
yarn workspace @usds.gov/questionable build
```

## Contributing

Commit messages and Pull Request names should follow the [Conventional Commit standard](https://www.conventionalcommits.org/en/v1.0.0/). The tl;dr is: your commit message should be short and specific, e.g. `feat(analytics): implements google analytics` or `fix(ci): update lodash version to latest`. 

All development should be done on a branch. On completion of work, submit a Pull Request for that branch into `main`. The PR title should also follow the commit standard.

## Releasing

Whenever minor/major changes are ready for release (i.e. merged into `main`), the project should be compiled and published to NPM.

```sh
yarn publish
```