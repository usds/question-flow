import { merge }                            from 'lodash';
import { isEnum, PAGE_TYPE, QUESTION_TYPE } from '@usds.gov/questionable-core';
import { PageData, QuestionData, Step }           from '../composable';
import { survey }                           from './survey';

const schemaPart = {
  properties: {
    step: {
      $ref:  '#/definitions/Partial<Step>',
      title: 'Step',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schemaFull: any = {
  type: 'object',
  ...schemaPart,
  // eslint-disable-next-line dot-notation
  ...survey,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStepSchema = (step: Step): any => {
  const schemaProps = { ...schemaPart };
  if (isEnum(PAGE_TYPE, step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IPage';
  } else if (isEnum(QUESTION_TYPE, step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IQuestionCore';
  }
  return merge(schemaProps, schemaFull);
};
