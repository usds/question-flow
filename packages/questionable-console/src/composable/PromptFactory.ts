import { QUESTION_TYPE }             from '@usds.gov/questionable-core';
import { Answers, DistinctQuestion } from 'inquirer';
import { IQuestion }                 from '../survey/IStep';
import { TAnswerType }               from '../util/types';

const ignorePaths = ['node_modules', '.'];

export const PromptFactory = (q: IQuestion): DistinctQuestion<Answers> => {
  let ret: TAnswerType = { type: 'confirm' };
  if (q.componentType) {
    switch (q.componentType) {
      case 'path':
        ret = {
          depthLimit:    5,
          excludeFilter: (nodePath) => nodePath === '.',
          excludePath:   (nodePath) => ignorePaths.some((p) => `${nodePath}`.startsWith(p)),
          itemType:      'directory',
          suggestOnly:   false,
          type:          'fuzzypath',
        };
        break;
      case 'date':
        ret = {
          type: 'date',
        };
        break;

      default:

        break;
    }
  } else {
    switch (q.type) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        ret = {
          choices: q.answers.map((e, i) => ({
            answer: e.type || '',
            key:    `${i}`,
            name:   e.title || '',
          })),
          type: 'list',
        };
        break;
      case QUESTION_TYPE.MULTIPLE_SELECT:
        ret = {
          choices: q.answers.map((e, i) => ({
            answer:   e.type || '',
            disabled: false,
            key:      `${i}`,
            name:     e.title || '',
          })),
          type: 'checkbox',
        };
        break;
      case QUESTION_TYPE.DOB:
        ret = {
          type: 'date',
        };
        break;
      case QUESTION_TYPE.TEXT:
        ret = {
          type: 'input',
        };
        break;
      default:
        ret = { type: 'confirm' };
        break;
    }
  }
  return ret as DistinctQuestion<Answers>;
};
