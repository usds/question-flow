import Form                         from '@rjsf/semantic-ui';
import { Button }                   from '@trussworks/react-uswds';
import { kebabCase }                from 'lodash';
import { IPageData, IQuestionData } from '../../survey/IStepData';
import { DesignLayout }             from '../wizard/DesignLayout';
import { getStepSchema }            from '../../schema/edit';
import { Wizard }                   from '../lib';
import { useGlobal }                from '../../state/GlobalState';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const Edit = (props: IQuestionData | IPageData): JSX.Element => {
  const { questionnaire } = useGlobal();
  const schema            = getStepSchema(props);
  const fileName          = kebabCase(questionnaire.header);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSubmit = ({ formData }: any) => {
    Wizard.saveAsJson(formData, `${fileName}.json`);
  };
  return (
      <Form
        schema={schema}
        uiSchema={{
          step: {
            'ui:order': [
              'title',
              'subTitle',
              'bodyHeader',
              'bodySubHeader',
              'body',
              'info',
              'footer',
              '*',
            ],
          },
        }}
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
  <DesignLayout {...props}>
    <Edit {...props} />
  </DesignLayout>
);
