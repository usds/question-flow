import { TVerticalPositionCore }      from '@usds.gov/questionable-core';
import { NextButton, PreviousButton } from './Button';
import { CSS_CLASS }                  from '../../lib/enums';
import { Step }                       from '../../composable/Step';

type INavBar = {
  step: Step;
  verticalPos: TVerticalPositionCore;
};

/**
 * Generates the Previous/Next buttons for Wizard navigation
 * @param props
 * @returns
 */
export const NavBar = ({ step, verticalPos }: INavBar): JSX.Element => (
  <nav className={`${CSS_CLASS.NAVBAR} ${CSS_CLASS.NAVBAR}-${verticalPos}`}>
    <PreviousButton step={step} verticalPos={verticalPos} />
    <NextButton step={step} verticalPos={verticalPos} />
  </nav>
);
