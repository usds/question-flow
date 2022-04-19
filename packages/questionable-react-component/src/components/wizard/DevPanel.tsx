import { Accordion, Button } from '@trussworks/react-uswds';
import { FormCore }          from '@usds.gov/questionable-core';
import { TWizard }           from '../../composable/Wizard';
import { CSS_CLASS }         from '../../lib';
import { noel }              from '../../lib/noel';
import { useGlobal }         from '../../state/GlobalState';
import { Wizard }            from '../lib/Wizard';

type TDev = {
  form: FormCore,
  wizard: TWizard,
};

export const DevPanel = ({ form, wizard }: TDev): JSX.Element => {
  const { config } = useGlobal();

  if (!config.dev) {
    return noel();
  }

  const reset = () => Wizard.resetQuestionable({ form, wizard });

  return (
    <>
      <Accordion
        items={[
          {
            content: (
              <pre>
                <code>{JSON.stringify(form, null, 4)}</code>
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
