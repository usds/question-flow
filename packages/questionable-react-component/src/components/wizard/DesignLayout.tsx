import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { ReactNode } from 'react';
import { NavBar }    from './NavBar';
import { useGlobal } from '../../state/GlobalState';
import { CSS_CLASS } from '../../lib/enums';
import { Step }      from '../../composable/Step';

type TDesign = {
  children: ReactNode;
  step: Step;
}

/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const DesignLayout = ({ step, children }: TDesign): JSX.Element => {
  const { questionnaire } = useGlobal();

  return (
    <div>
      <NavBar step={step} verticalPos={'top'} />
      <section>
        <CardGroup>
          <Card
            headerFirst
            gridLayout={{ tablet: { col: 12 } }}
            containerProps={{ className: 'border-ink' }}
          >
            <CardHeader className="bg-base-lightest">
              <h1>Edit the {questionnaire.questionnaire.header}</h1>
            </CardHeader>
            <CardBody className={CSS_CLASS.DESIGN_LAYOUT}>{children}</CardBody>
            <CardFooter>
              {'Click "Save" to save your edits, or "Next" to continue editing'}
            </CardFooter>
          </Card>
        </CardGroup>
      </section>
    </div>
  );
};
