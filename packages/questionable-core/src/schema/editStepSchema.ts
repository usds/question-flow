import { merge }         from 'lodash';
import { IPageCore }     from '../metadata/IPageCore';
import { PAGE_TYPE }     from '../metadata/properties/type/TPageType';
import { IQuestionCore } from '../metadata/IQuestionCore';
import { QUESTION_TYPE } from '../metadata/properties/type/TQuestionType';
import { isEnum }        from '../lib/enums';
import { survey }        from './survey';

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
export const getStepSchema = (step: IQuestionCore | IPageCore): any => {
  const schemaProps = { ...schemaPart };
  if (isEnum(PAGE_TYPE, step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IPageCore';
  } else if (isEnum(QUESTION_TYPE, step.type)) {
    schemaProps.properties.step.$ref = '#/definitions/IQuestionCore';
  }
  return merge(schemaProps, schemaFull);
};
