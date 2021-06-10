import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { IStepData } from '../../survey/IStepData';
import { Navbar }    from './Navbar';
import { Wizard }    from '../lib/Wizard';
import { useGlobal } from '../../state/GlobalState';
import { CSS_CLASS } from '../../lib';

/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const StepLayout = (props: IStepData): JSX.Element => {
  const { config }                  = useGlobal();
  const { borderClass, titleClass } = config.steps;

  return (
    <div>
      <section className={CSS_CLASS.STEP_LAYOUT}>
        <CardGroup>
          <Card
            headerFirst
            gridLayout={{ tablet: { col: 12 } }}
            containerProps={{ className: borderClass }}
          >
            <CardHeader className={titleClass}>
              {Wizard.getHeader(props, config)}
            </CardHeader>
            <CardBody>
              {Wizard.getSubtitle(props)}
              {props.children}
              {Wizard.getInfoBox(props)}
            </CardBody>
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
