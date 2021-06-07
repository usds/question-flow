import Form from '@rjsf/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSONSchema7 } from 'json-schema';
import { noop } from '../../lib/noop';
import * as schema from '../../schema/survey.json';
import { IStepData } from '../../survey/IStepData';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const Edit = (props: IStepData): JSX.Element => (
  <Form
    schema={schema as JSONSchema7}
    onChange={noop}
    formData={props.step || {}}
  ></Form>
);

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const EditStep = (props: IStepData): JSX.Element => (
  <StepLayout {...props}>
    <Edit {...props} />
  </StepLayout>
);
