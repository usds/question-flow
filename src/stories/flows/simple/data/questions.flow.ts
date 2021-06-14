/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { QUESTION_TYPE } from '../../../../lib/enums';
import { IQuestion }     from '../../../../survey/IStep';

/**
 * All of the questions, their answers and dependencies
 */
export const questions: IQuestion[] = [
  {
    answers: [
      { id: '0', title: 'Yes' },
      { id: '1', title: 'No' },
    ],
    id:            'A',
    info:          'It is a yes or no question',
    internalNotes: 'everone',
    section:       { id: 'introduction' },
    subTitle:      'Surveys, questionnaires, slides, decks, polls--they\'re all linear questions/statements.',
    title:         'Do you like surveys?',
    type:          QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: 'Yes' },
      { id: '1', title: 'No' },
    ],
    id:            'B',
    internalNotes: 'users who don\'t like surveys',
    requirements:  [
      {
        responses: [
          {
            answers:  [{ id: '1' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    section:  { id: 'confirmation' },
    subTitle: 'Surveys can be important tools to help guide user interactions.',
    title:    'Are you sure you don\'t like surveys?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: 'Yes' },
      { id: '1', title: 'No' },
    ],
    id:            'C',
    internalNotes: 'users who do like surveys',
    requirements:  [
      {
        responses: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    section:  { id: 'confirmation' },
    subTitle: 'Surveys can be wastes of time. Do you honestly like them?',
    title:    'Are you sure you like surveys?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: 'Yes' },
      { id: '1', title: 'No' },
    ],
    id:            'D',
    internalNotes: 'users who do like surveys',
    requirements:  [
      {
        responses: [
          {
            answers:  [{ id: '0' }, { id: '1' }],
            question: { id: 'C' },
          },
        ],
      },
      {
        responses: [
          {
            answers:  [{ id: '0' }, { id: '1' }],
            question: { id: 'B' },
          },
        ],
      },
    ],
    section:  { id: 'satisfaction' },
    subTitle: 'Given the chance to do it all over, wouldn\'t you like to try?',
    title:    'Would you take this survey again?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
];
