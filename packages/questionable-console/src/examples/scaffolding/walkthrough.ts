import {
  QuestionableConfigCore, IBranchCore,

  ACTION, ActionCore, SurveyBuilder, SectionCore, PageCore, PAGE_TYPE, ResultCore, blue,
  noop, QUESTION_TYPE, red, white, AnswerCore,
} from '@usds.gov/questionable-core';
import { os, fs }         from 'zx';
import { IQuestionnaire } from '../../survey/IQuestionnaire';
import { IQuestion }      from '../../survey/IStep';
import { TVal }           from '../../util/types';

export const loadActions = (builder: SurveyBuilder) => {
  const name = 'Completed';
  builder.add(ActionCore, {
    label: 'Restart survey',
    title: 'Restart',
    type:  ACTION.NONE,
  });
  const landing = builder.add(SectionCore, { type: 'landing' });
  const results = builder.add(SectionCore, { id: 'finish' });

  const YES = builder.add(AnswerCore, { key: 'y', title: 'Yes' });
  const NO  = { id: '1', key: 'n', title: 'No' };
  // eslint-disable-next-line sonarjs/no-unused-collection
  const ANSWERS = [YES, NO];

  const A: IQuestion = {
    answers:   [YES, NO],
    id:        'A',
    onAnswer:  async () => noop(),
    onDisplay: async () => {
      blue('This is the scaffolding project. You will be asked a series of questions which will guide you through the setup process.)');
    },
    section: { id: 'introduction' },
    title:   'Is this your first time configuring this environment to run VA.gov?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  };

  const B: IQuestion = {
    answers:           [YES, NO],
    componentType:     'path',
    default:           os.homedir,
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
    id:       'B',
    onAnswer: async (a) => {
      const path = a.value || a.answer || a.short;
      white(`Working directory has been set to ${path}`);
    },
    onDisplay: async () => {
      blue('Welcome aboard. We\'ll have you up and running in no time. The first step is to choose where your working directory is located. You can select either the current directory or you can specify your own path (note: this can be changed later, but it may be very time consuming)');
    },
    section:  { id: 'confirmation' },
    title:    'What directory do you want to use for this project?',
    type:     QUESTION_TYPE.TEXT,
    validate: async (a) => {
      const path   = a.value || a.answer || a.short;
      const exists = fs.existsSync(`${path}`);
      if (!exists) {
        red(`"${path}" isn't a valid path. Please enter another path.`);
      }
      return exists;
    },
  };

  const ALL_REPOSITORIES = {
    id:    '3',
    key:   'a',
    short: 'all',
    title: 'All',
  };
  ANSWERS.push(ALL_REPOSITORIES);

  const FRONTEND_REPOSITORIES = {
    id:    '4',
    key:   'f',
    short: 'front',
    title: 'Front end',
  };
  ANSWERS.push(FRONTEND_REPOSITORIES);

  const BACKEND_REPOSITORIES = {
    id:    '5',
    key:   'b',
    short: 'backend',
    title: 'Back end',
  };
  ANSWERS.push(BACKEND_REPOSITORIES);

  const CHOOSE_REPOSITORIES = {
    id:    '6',
    key:   'c',
    short: 'choose',
    title: 'Let me choose',
  };
  ANSWERS.push(CHOOSE_REPOSITORIES);

  const NO_REPOSITORIES = {
    id:    '7',
    key:   'n',
    short: 'none',
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
            answers:  [YES, NO],
            question: A,
          },
        ],
      },
    ],
    id:       'C',
    onAnswer: async (selected: TVal) => {
      white(`You selected ${selected.answer}`);
    },
    onDisplay: async () => {
      blue('The next step is to pull down the source code for the projects you will need to work on. You can have everything, just the frontend, just the backed or decide for each repo.');
    },
    section:  { id: 'confirmation' },
    title:    'Which repositories do you need?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
    validate: async () => true, // fs.existsSync(`${path}`),
  };

  const repositories = [
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
  ];

  const D: IQuestion = {
    answers: repositories.map((r, i) => ({
      id:    `${i + 8}`,
      title: r,
    })),
    entryRequirements: [
      {
        responses: [
          {
            answers:  [CHOOSE_REPOSITORIES],
            question: C,
          },
        ],
      },
    ],
    id:       'D',
    onAnswer: async (selected: TVal) => {
      white(`You selected ${selected.answer}`);
    },
    onDisplay: async () => {
      blue('Please select which repos you would like to clone.');
    },
    section:  { id: 'confirmation' },
    title:    'Which repositories do you need?',
    type:     QUESTION_TYPE.MULTIPLE_SELECT,
    validate: async () => true, // fs.existsSync(`${path}`),
  };

  return [
    landing,
    results,
    builder.add(SectionCore, {
      id:           'introduction',
      requirements: [],
      title:        'Introduction',
    }),
    builder.add(SectionCore, {
      id:           'confirmation',
      requirements: [
        {
          responses: [
            {
              answers:  [{ id: '0' }, { id: '1' }],
              question: { id: 'C' },
            },
          ],
        },
      ],
      title: 'Confirmation',
    }),
    builder.add(PageCore, {
      body:    'Please answer the following questions to setup your environment.',
      id:      PAGE_TYPE.LANDING,
      section: landing,
      title:   'Welcome to the scaffolding project. Press any key to continue...',
      type:    PAGE_TYPE.LANDING,
    }),
    builder.add(PageCore, {
      id:      PAGE_TYPE.NO_RESULTS,
      section: results,
      title:   'No actions have been performed',
      type:    PAGE_TYPE.NO_RESULTS,
    }),
    builder.add(PageCore, {
      id:      PAGE_TYPE.RESULTS,
      section: results,
      title:   'Success. Your project has been bootstrapped.',
      type:    PAGE_TYPE.RESULTS,
    }),
    builder.add(PageCore, {
      id:      PAGE_TYPE.SUMMARY,
      section: results,
      title:   'Review the output and confirm that everything was successful.',
      type:    PAGE_TYPE.SUMMARY,
    }),
    builder.add(ResultCore, {
      // action:       { id: '0' },
      id:           '1',
      label:        name,
      requirements: [
        {
          explanation:
          'Scaffolding complete',

          // responses: [
          //   {
          //     answers:  [{ id: '1' }, { id: '0' }],
          //     question: { id: 'A' },
          //   },
          // ],
        },
      ],
      title: 'Completed Tasks',
    }),
  ];
};
