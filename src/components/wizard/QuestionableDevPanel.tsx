import { Accordion, Button } from '@trussworks/react-uswds';
import { useGlobal } from '../../state/GlobalState';
import { IPrepStep } from '../../survey/IStep';
import { Wizard } from '../lib/Wizard';

export const QuestionableDevPanel = (props: IPrepStep): JSX.Element => {
  const { config } = useGlobal();

  if (!config.dev) {
    return (<></>);
  }

  const reset = () => Wizard.resetQuestionable(props);

  return (
    <>
      <Accordion
        items={[
          {
            title: 'Temporary developer panel',
            content: (
              <pre>
                <code>{JSON.stringify(props.form, null, 4)}</code>
              </pre>
            ),
            expanded: false,
            id: 'developer-output',
          },
        ]}
      />
      <br></br>
      <nav className="wizard-layout__navbar">
        <Button type="reset" secondary onClick={reset}>
          Reset
        </Button>
      </nav>
    </>
  );
};
