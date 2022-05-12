import {
  Card, CardBody, CardFooter, CardGroup, CardHeader,
} from '@trussworks/react-uswds';
import { FC }                             from 'react';
import { NavBar }                         from './NavBar';
import { Wizard }                         from '../lib/Wizard';
import { CSS_CLASS }                      from '../../lib';
import { PageComposer, QuestionComposer } from '../lib';
import { Step }                           from '../../composable/Step';

type t = {comp: PageComposer | QuestionComposer, step: Step}
/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
export const StepLayout: FC<t> = ({ step, comp }: t) => {
  const { config }                  = comp;
  const { borderClass, titleClass } = config.steps;

  const getCssClass = (name: string) => Wizard.getCssClass({ name, prefix: CSS_CLASS.STEP_LAYOUT, step });

  return (
    <div className={getCssClass('outer')}>
      <NavBar step={step} verticalPos={'top'} />
      <section className={CSS_CLASS.STEP_LAYOUT}>
        <CardGroup className={getCssClass('card-group')}>
          <Card
            headerFirst
            gridLayout={{ tablet: { col: 12 } }}
            containerProps={{ className: borderClass }}
            className={getCssClass('card')}
          >
            <CardHeader className={`${titleClass} ${getCssClass('card-header')}`}>
              {Wizard.getHeader({ config, step })}
            </CardHeader>
            <CardBody className={getCssClass('card-body')}>
              {Wizard.getSubtitle({ step })}
              {step.children}
              {Wizard.getInfoBox({ step })}
            </CardBody>
            <CardFooter className={getCssClass('card-footer')}>
              {Wizard.getFooter({ step })}
            </CardFooter>
          </Card>
        </CardGroup>
      </section>
      <NavBar step={step} verticalPos={'bottom'} />
    </div>
  );
};
