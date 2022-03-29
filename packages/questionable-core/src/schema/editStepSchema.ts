import { merge }                            from 'lodash';
import { isEnum, PAGE_TYPE, QUESTION_TYPE } from '../util/enums';
import { IPageDataCore }                    from '../survey/IPageDataCore';
import { IQuestionDataCore }                from '../survey/IQuestionDataCore';
import { survey }                           from './survey';

const schemaPart = {
  properties: {
    step: {
      $ref:  '#/definitions/IStepCore',
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
export const getStepSchema = (props: IQuestionDataCore | IPageDataCore): any => {
  const schemaProps = { ...schemaPart };
  if (isEnum(PAGE_TYPE, props.step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IPageCore';
  } else if (isEnum(QUESTION_TYPE, props.step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IQuestionCore';
  }
  return merge(schemaProps, schemaFull);
};
