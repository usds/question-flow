import { merge }                            from 'lodash';
import { isEnum, PAGE_TYPE, QUESTION_TYPE } from '../lib/enums';
import { IPageData, IQuestionData }         from '../survey/IStepData';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const survey = require('./survey.json');

const properties = {
  properties: {
    step: {
      $ref:  '#/definitions/IStep',
      title: 'Edit this step',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema: any = {
  description: '',
  title:       'Edit Questionable Survey',
  type:        'object',
  ...properties,
  // eslint-disable-next-line dot-notation
  ...survey,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStepSchema = (props: IQuestionData | IPageData): any => {
  const schemaProps = { ...properties };
  if (isEnum(PAGE_TYPE, props.step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IPage';
  } else if (isEnum(QUESTION_TYPE, props.step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IQuestion';
  }
  return merge(schemaProps, schema);
};
