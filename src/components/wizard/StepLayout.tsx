import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { IStep } from '../../survey/IStep';
import { QuestionableNavbar } from './QuestionableNavbar';
import { Wizard } from '../lib/Wizard';
import { useGlobal } from '../../state/GlobalState';

/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const StepLayout = (props: IStep): JSX.Element => {
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
      <QuestionableNavbar {...props} />
    </div>
  );
};
