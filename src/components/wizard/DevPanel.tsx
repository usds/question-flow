import { Accordion, Button } from '@trussworks/react-uswds';
import { CSS_CLASS } from '../../lib';
import { noel }              from '../../lib/noop';
import { useGlobal }         from '../../state/GlobalState';
import { IStepData }         from '../../survey/IStepData';
import { Wizard }            from '../lib/Wizard';

export const DevPanel = (props: IStepData): JSX.Element => {
  const { config } = useGlobal();

  if (!config.dev) {
    return noel();
  }

  const reset = () => Wizard.resetQuestionable(props);

  return (
    <>
      <Accordion
        items={[
          {
            content: (
              <pre>
                <code>{JSON.stringify(props.form, null, 4)}</code>
              </pre>
            ),
            expanded: false,
            id:       'developer-output',
            title:    'Temporary developer panel',
          },
        ]}
      />
      <br></br>
      <nav className={CSS_CLASS.NAVBAR}>
        <Button type="reset" secondary onClick={reset}>
          Reset
        </Button>
      </nav>
    </>
  );
};
