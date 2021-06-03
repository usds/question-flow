/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { QUESTION_TYPE } from '../../../lib/enums';
import { IQuestion }     from '../../../survey/IStep';

/**
 * All of the questions, their answers and dependencies
 */
export const questions: IQuestion[] = [
  {
    answers: {
      0: 'Yes',
      1: 'No',
    },
    id:            'A',
    internalNotes: 'everyone',
    sectionId:     'introduction',
    subTitle:      'Surveys, questionnaires, slides, decks, polls--they\'re all linear questions/statements.',
    title:         'Do you like surveys?',
    type:          QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: {
      0: 'Yes',
      1: 'No',
    },
    id:            'B',
    internalNotes: 'users who don\'t like surveys',
    requirements:  [
      {
        answers: {
          A: [1], // no
        },
      },
    ],
    sectionId: 'confirmation',
    subTitle:  'Surveys can be important tools to help guide user interactions.',
    title:     'Are you sure you don\'t like surveys?',
    type:      QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: {
      0: 'Yes',
      1: 'No',
    },
    id:            'C',
    internalNotes: 'users who do like surveys',
    requirements:  [
      {
        answers: {
          A: [0],
        },
      },
    ],
    sectionId: 'confirmation',
    subTitle:  'Surveys can be wastes of time. Do you honestly like them?',
    title:     'Are you sure you like surveys?',
    type:      QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: {
      0: 'Yes',
      1: 'No',
    },
    id:            'D',
    internalNotes: 'users who do like surveys',
    requirements:  [
      {
        answers: {
          C: [0, 1],
        },
      },
      {
        answers: {
          B: [0, 1],
        },
      },
    ],
    sectionId: 'satisfaction',
    subTitle:  'Given the chance to do it all over, wouldn\'t you like to try?',
    title:     'Would you take this survey again?',
    type:      QUESTION_TYPE.MULTIPLE_CHOICE,
  },
];
