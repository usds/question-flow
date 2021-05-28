import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { IStepData } from '../../survey/IStepData';
import { Navbar }    from './Navbar';
import { Wizard }    from '../lib/Wizard';
import { useGlobal } from '../../state/GlobalState';

/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const StepLayout = (props: IStepData): JSX.Element => {
  const { config } = useGlobal();

  return (
    <div>
      <section>
        <CardGroup>
          <Card
            headerFirst
            gridLayout={{ tablet: { col: 12 } }}
            containerProps={{ className: 'border-ink' }}
          >
            <CardHeader className="bg-base-lightest">
              {Wizard.getHeader(props, config)}
              {Wizard.getSupportingDetails(props)}
              {Wizard.getQuestionHelp(props)}
            </CardHeader>
            <CardBody className="padding-top-3">{props.children}</CardBody>
            <CardFooter>
              {Wizard.getFooter(props)}
            </CardFooter>
          </Card>
        </CardGroup>
      </section>
      <Navbar {...props} />
    </div>
  );
};
