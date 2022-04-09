import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { TQstn }     from '../lib/types';
import { NavBar }    from './NavBar';
import { Wizard }    from '../lib/Wizard';
import { CSS_CLASS } from '../../lib';

/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const StepLayout = ({ props, comp }: TQstn): JSX.Element => {
  const { config }                  = comp;
  const { borderClass, titleClass } = config.steps;

  const getCssClass = (name: string) => Wizard.getCssClass(CSS_CLASS.STEP_LAYOUT, name, props);

  return (
    <div className={getCssClass('outer')}>
      <NavBar {...{ ...props, verticalPos: 'top' }} />
      <section className={CSS_CLASS.STEP_LAYOUT}>
        <CardGroup className={getCssClass('card-group')}>
          <Card
            headerFirst
            gridLayout={{ tablet: { col: 12 } }}
            containerProps={{ className: borderClass }}
            className={getCssClass('card')}
          >
            <CardHeader className={`${titleClass} ${getCssClass('card-header')}`}>
              {Wizard.getHeader(props, config)}
            </CardHeader>
            <CardBody className={getCssClass('card-body')}>
              {Wizard.getSubtitle(props)}
              {props.children}
              {Wizard.getInfoBox(props)}
            </CardBody>
            <CardFooter className={getCssClass('card-footer')}>
              {Wizard.getFooter(props)}
            </CardFooter>
          </Card>
        </CardGroup>
      </section>
      <NavBar {...{ ...props, verticalPos: 'bottom' }} />
    </div>
  );
};
