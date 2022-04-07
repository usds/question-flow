/* eslint-disable max-len */
import { blue, red, white } from 'chalk';
import { noop }             from 'lodash';
import os                   from 'os';
import {
  AnswerCore,
  PagesCore,
  QuestionCore,
  ResultCore,
  SectionCore,
  SurveyBuilder,
  PAGE_TYPE,
  QUESTION_TYPE,
} from '@usds.gov/questionable-core';
import { TVal } from '../../util/types';

export const build = (builder: SurveyBuilder) => {
  const [onboarding] = builder.add(SectionCore, [
    {
      requirements: [],
      title:        'VA.gov Onboarding',
      type:         'onboarding',
    },
  ]);
  builder.setDefaults(onboarding);

  builder.add(ResultCore, [{
    label:        'Complete',
    requirements: [],
    title:        'Results',
    type:         'result',
  },
  ]);
  builder.add(PagesCore, [{
    landing: {
      body:    'Please answer the following questions to setup your environment.',
      id:      PAGE_TYPE.LANDING,
      section: onboarding,
      title:
            'Welcome to the scaffolding project. Press any key to continue...',
      type: PAGE_TYPE.LANDING,
    },
    noResults: {
      id:      PAGE_TYPE.NO_RESULTS,
      section: onboarding,
      title:   'No actions have been performed',
      type:    PAGE_TYPE.NO_RESULTS,
    },
    results: {
      id:      PAGE_TYPE.RESULTS,
      section: onboarding,
      title:   'Success. Your project has been bootstrapped.',
      type:    PAGE_TYPE.RESULTS,
    },
    summary: {
      id:      PAGE_TYPE.SUMMARY,
      section: onboarding,
      title:
            'Review the output and confirm that everything was successful.',
      type: PAGE_TYPE.SUMMARY,
    },
  }]);
  const [YES, NO] = builder.add(AnswerCore, [
    { key: 'y', title: 'Yes' },
    { key: 'n', title: 'No' },
  ]);
  const YES_NO    = [YES, NO];

  // const [respondYes]     = builder.add(ResponseCore, [{
  //     answers:  [YES],
  //     question: A,
  //   },
  // ]);
  // const [respondYesOrNo] = builder.add(ResponseCore, [{
  //     answers:  [YES, NO],
  //     question: A,
  //   },
  // ]);
  // const [isFirstTime]    = builder.add(RequirementCore, [{
  //     responses: [respondYes],
  //   },
  // ]);
  // const [hasAnsweredA]   = builder.add(RequirementCore, [{
  //     responses: [respondYesOrNo],
  //   },
  // ]);

  const repoChoices  = builder.add(AnswerCore, [{
    key:   'a',
    short: 'all',
    title: 'All',
  },
  {
    key:   'f',
    short: 'front',
    title: 'Front end',
  },
  {
    key:   'b',
    short: 'backend',
    title: 'Back end',
  },
  {
    key:   'c',
    short: 'choose',
    title: 'Let me choose',
  },
  {
    key:   'n',
    short: 'none',
    title: 'None; I will choose later',
  },
  ]);
  const repositories = builder.add(AnswerCore, [
    'content-build',
    'digitalservice',
    'va-tools',
    'va.gov-team',
    'vagov-content',
    'veteran-facing-services-tools',
    'vets-api',
    'vets-api-mockdata',
    'vets-json-schema',
    'vets-website',
  ].map((a) => ({ title: a })));

  // const [selectedChooseRepos] = builder.add(RequirementCore, [
  //   {
  //     responses: builder.add(ResponseCore, [
  //       {
  //         answers:  [CHOOSE_REPOSITORIES],
  //         question: C,
  //       },
  //     ]),
  //   },
  // ]);

  const [
    firstTime,
    workingDirectory,
    repoTypes,
    manualRepoSelection,
  ] = builder.add(QuestionCore, [{
    answers:   YES_NO,
    onAnswer:  async () => noop(),
    onDisplay: async () => {
      blue(
        'This is the scaffolding project. You will be asked a series of questions which will guide you through the setup process.)',
      );
    },
    title:
          'Is this your first time configuring this environment to run VA.gov?',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
  }, {
    answers:       YES_NO,
    componentType: 'path',
    default:       os.homedir,
    // entryRequirements: [isFirstTime],
    onAnswer:      async (a: TVal) => {
      const path = a.value || a.answer || a.short;
      white(`Working directory has been set to ${path}`);
    },
    onDisplay: async () => {
      blue(
        "Welcome aboard. We'll have you up and running in no time. The first step is to choose where your working directory is located. You can select either the current directory or you can specify your own path (note: this can be changed later, but it may be very time consuming)",
      );
    },
    section:  onboarding,
    title:    'What directory do you want to use for this project?',
    type:     QUESTION_TYPE.TEXT,
    validate: async (a: TVal) => {
      const path   = a.value || a.answer || a.short;
      const exists = true; // fs.existsSync(`${path}`);
      if (!exists) {
        red(`"${path}" isn't a valid path. Please enter another path.`);
      }
      return exists;
    },
  }, {
    answers:           repoChoices,
    entryRequirements: [],
    id:                'C',
    onAnswer:          async (selected: TVal) => {
      white(`You selected ${selected.answer}`);
    },
    onDisplay: async () => {
      blue(
        'The next step is to pull down the source code for the projects you will need to work on. You can have everything, just the frontend, just the backed or decide for each repo.',
      );
    },
    title:    'Which repositories do you need?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
    validate: async () => true, // fs.existsSync(`${path}`),
  }, {
    answers:  repositories,
    // entryRequirements: [selectedChooseRepos],
    onAnswer: async (selected: TVal) => {
      white(`You selected ${selected.answer}`);
    },
    onDisplay: async () => {
      blue('Please select which repos you would like to clone.');
    },
    title:    'Which repositories do you need?',
    type:     QUESTION_TYPE.MULTIPLE_SELECT,
    validate: async () => true, // fs.existsSync(`${path}`),
  },
  ]);

  // builder.add(ResultCore, [
  //   {
  //     // action:       { id: '0' },
  //     id:           '1',
  //     label:        'done',
  //     requirements: builder.add(RequirementCore, [
  //       {
  //         explanation: 'Scaffolding complete',

  //         // responses: [
  //         //   {
  //         //     answers:  [{ id: '1' }, { id: '0' }],
  //         //     question: { id: 'A' },
  //         //   },
  //         // ],
  //       },
  //     ]),
  //     title: 'Completed Tasks',
  //   },
  // ]);

  return {
    firstTime,
    manualRepoSelection,
    repoTypes,
    workingDirectory,
  };
};
