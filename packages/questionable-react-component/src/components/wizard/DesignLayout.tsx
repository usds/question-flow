import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { IStepData } from '../../survey/IStepData';
import { NavBar }    from './NavBar';
import { useGlobal } from '../../state/GlobalState';
import { CSS_CLASS } from '../../lib/enums';

/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const DesignLayout = (props: IStepData): JSX.Element => {
  const { questionnaire } = useGlobal();

  return (
    <div>
      <NavBar {...{ ...props, verticalPos: 'top' }} />
      <section>
        <CardGroup>
          <Card
            headerFirst
            gridLayout={{ tablet: { col: 12 } }}
            containerProps={{ className: 'border-ink' }}
          >
            <CardHeader className="bg-base-lightest">
              <h1>Edit the {questionnaire.header}</h1>
            </CardHeader>
            <CardBody className={CSS_CLASS.DESIGN_LAYOUT}>{props.children}</CardBody>
            <CardFooter>
              {'Click "Save" to save your edits, or "Next" to continue editing'}
            </CardFooter>
          </Card>
        </CardGroup>
      </section>
    </div>
  );
};
