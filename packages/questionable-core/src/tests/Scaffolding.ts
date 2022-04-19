/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { noop }             from 'lodash';
import { blue, red, white } from '../lib/logger';
import {
  ActionCore,
} from '../composable/ActionCore';
import { SurveyBuilder }   from '../constructable/SurveyBuilderCore';
import { ResultCore }      from '../composable/ResultCore';
import { PagesCore }       from '../composable/PagesCore';
import { SectionCore }     from '../composable/SectionCore';
import { AnswerCore }      from '../composable/AnswerCore';
import { QuestionCore }    from '../composable/QuestionCore';
import { ResponseCore }    from '../composable/ResponseCore';
import { RequirementCore } from '../composable/RequirementCore';
import { ACTION_TYPE }     from '../metadata/properties/type/TActionType';
import { PAGE_TYPE }       from '../metadata/properties/type/TPageType';
import { QUESTION_TYPE }   from '../metadata/properties/type/TQuestionType';

export class Scaffolding {
  // questionnaire: QuestionnaireCore;

  // form: FormCore;

  // iterable: Iterable;

  builder: SurveyBuilder;

  constructor() {
    // eslint-disable-next-line no-multi-assign
    this.builder = new SurveyBuilder();
    // this.iterable      = new Iterable(this.questionnaire);
  }

  build() {
    const [onboarding] = this.builder.add(SectionCore, [
      {
        requirements: [],
        title:        'VA.gov Onboarding',
        type:         'unlocked',
      },
    ]);
    this.builder.setDefaults(onboarding);

    this.builder.add(ActionCore, [
      {
        label: 'Restart onboarding',
        order: 1,
        title: 'Restart',
        type:  ACTION_TYPE.NONE,
      },
    ]);
    const [finished] = this.builder.add(ActionCore, [
      {
        title: 'Finished',
        type:  ACTION_TYPE.NONE,
      },
    ]);
    const [results]  = this.builder.add(ResultCore, [
      {
        action:       finished,
        label:        'Complete',
        requirements: [],
        title:        'Results',
        type:         'match',
      },
    ]);
    this.builder.add(PagesCore, [
      {
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
      },
    ]);
    const [YES, NO] = this.builder.add(AnswerCore, [
      { key: 'y', title: 'Yes' },
      { key: 'n', title: 'No' },
    ]);
    const YES_NO    = [YES, NO];

    const [A] = this.builder.add(QuestionCore, [
      {
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
      },
    ]);

    const [respondYes]     = this.builder.add(ResponseCore, [
      {
        answers:  [YES],
        question: A,
      },
    ]);
    const [respondYesOrNo] = this.builder.add(ResponseCore, [
      {
        answers:  [YES, NO],
        question: A,
      },
    ]);
    const [isFirstTime]    = this.builder.add(RequirementCore, [
      {
        responses: [respondYes],
      },
    ]);
    const [hasAnsweredA]   = this.builder.add(RequirementCore, [
      {
        responses: [respondYesOrNo],
      },
    ]);

    this.builder.add(QuestionCore, [
      {
        answers:           YES_NO,
        componentType:     'path',
        default:           '', // os.homedir,
        entryRequirements: [isFirstTime],
        onAnswer:          async (a: any) => {
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
        validate: async (a: any) => {
          const path   = a.value || a.answer || a.short;
          const exists = true; // fs.existsSync(`${path}`);
          if (!exists) {
            red(`"${path}" isn't a valid path. Please enter another path.`);
          }
          return exists;
        },
      },
    ]);

    const repoChoices                          = this.builder.add(AnswerCore, [
      {
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
    const [_, _b, _c, CHOOSE_REPOSITORIES, _e] = repoChoices;
    const [C]                                  = this.builder.add(QuestionCore, [
      {
        answers:           repoChoices,
        entryRequirements: [hasAnsweredA],
        id:                'C',
        onAnswer:          async (selected: any) => {
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
      },
    ]);

    const repositories = this.builder.add(
      AnswerCore,
      [
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
      ].map((a) => ({ title: a })),
    );

    const [selectedChooseRepos] = this.builder.add(RequirementCore, [
      {
        responses: this.builder.add(ResponseCore, [
          {
            answers:  [CHOOSE_REPOSITORIES],
            question: C,
          },
        ]),
      },
    ]);

    this.builder.add(QuestionCore, [
      {
        answers:           repositories,
        entryRequirements: [selectedChooseRepos],
        onAnswer:          async (selected: any) => {
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

    return [
      onboarding,
      results,

      this.builder.add(ResultCore, [
        {
          // action:       { id: '0' },
          id:           '1',
          label:        'done',
          requirements: this.builder.add(RequirementCore, [
            {
              explanation: 'Scaffolding complete',

              // responses: [
              //   {
              //     answers:  [{ id: '1' }, { id: '0' }],
              //     question: { id: 'A' },
              //   },
              // ],
            },
          ]),
          title: 'Completed Tasks',
        },
      ]),
    ];
  }
}
