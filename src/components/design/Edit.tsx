import 'semantic-ui-css/semantic.min.css';
import Form                         from '@rjsf/semantic-ui';
import { Button }                   from '@trussworks/react-uswds';
import { IPageData, IQuestionData } from '../../survey/IStepData';
import { StepLayout }               from '../wizard/StepLayout';
import { getStepSchema }            from '../../schema/edit';
import { Wizard }                   from '../lib';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const Edit = (props: IQuestionData | IPageData): JSX.Element => {
  const schema = getStepSchema(props);
  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
  const onSubmit = ({ formData }: any) => {
    Wizard.saveAsJson(formData);
  };
  return (
      <Form
        schema={schema}
        onSubmit={onSubmit}
        formData={{ step: props.step }}
      >
        <div>
          <Button type="submit">Save</Button>
        </div>
      </Form>
  );
};

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const EditStep = (props: IQuestionData | IPageData): JSX.Element => (
  <StepLayout {...props}>
    <Edit {...props} />
  </StepLayout>
);
