/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { QUESTION_TYPE } from '@usds.gov/questionable-core';
import { noop }          from 'lodash';
import chalk             from 'chalk';
import { IQuestion }     from '../../../survey/IStep';

const YES = { id: '0', key: 'y', title: 'Yes' };
const NO  = { id: '1', key: 'n', title: 'No' };
// eslint-disable-next-line sonarjs/no-unused-collection
const ANSWERS = [YES, NO];

const A: IQuestion = {
  answers:   [YES, NO],
  id:        'A',
  onAnswer:  noop,
  onDisplay: () => {
    console.log(chalk.blue('This is the scaffolding project. You will be asked a series of questions which will guide you through the setup process.)'));
  },
  section: { id: 'introduction' },
  title:   'Is this your first time configuring this environment to run VA.gov?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

const B: IQuestion = {
  answers:           [YES, NO],
  entryRequirements: [
    {
      responses: [
        {
          answers:  [NO],
          question: A,
        },
      ],
    },
  ],
  id:       'B',
  onAnswer: (path) => {
    console.log(chalk.white(`Working directory has been set to ${path}`));
  },
  onDisplay: () => {
    console.log(chalk.blue('Welcome aboard. We\'ll have you up and running in no time. The first step is to choose where your working directory is located. You can select either the current directory or you can specify your own path (note: this can be changed later, but it may be very time consuming)'));
  },
  section:  { id: 'confirmation' },
  title:    'What directory do you want to use for this project?',
  type:     QUESTION_TYPE.TEXT,
  validate: () => true, // fs.existsSync(`${path}`),
};

const ALL_REPOSITORIES = {
  id:    '3',
  key:   'a',
  title: 'All',
};
ANSWERS.push(ALL_REPOSITORIES);

const FRONTEND_REPOSITORIES = {
  id:    '4',
  key:   'f',
  title: 'Front end',
};
ANSWERS.push(FRONTEND_REPOSITORIES);

const BACKEND_REPOSITORIES = {
  id:    '5',
  key:   'b',
  title: 'Back end',
};
ANSWERS.push(BACKEND_REPOSITORIES);

const CHOOSE_REPOSITORIES = {
  id:    '6',
  key:   'c',
  title: 'Let me choose',
};
ANSWERS.push(CHOOSE_REPOSITORIES);

const NO_REPOSITORIES = {
  id:    '7',
  key:   'n',
  title: 'None; I will choose later',
};
ANSWERS.push(NO_REPOSITORIES);

const C: IQuestion = {
  answers: [
    ALL_REPOSITORIES,
    FRONTEND_REPOSITORIES,
    BACKEND_REPOSITORIES,
    CHOOSE_REPOSITORIES,
    NO_REPOSITORIES,
  ],
  entryRequirements: [
    {
      responses: [
        {
          answers:  [YES],
          question: A,
        },
      ],
    },
  ],
  id:       'C',
  onAnswer: (selected) => {
    console.log(chalk.white(`You selected ${selected}`));
  },
  onDisplay: () => {
    console.log(chalk.blue('The next step is to pull down the source code for the projects you will need to work on. You can have everything, just the frontend, just the backed or decide for each repo.'));
  },
  section:  { id: 'confirmation' },
  title:    'Which repositories do you need?',
  type:     QUESTION_TYPE.MULTIPLE_SELECT,
  validate: () => true, // fs.existsSync(`${path}`),
};

/**
 * All of the questions, their answers and dependencies
 */
export const questions: IQuestion[] = [
  A,
  B,
  C,
];
