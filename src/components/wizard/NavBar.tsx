import { NextButton, PreviousButton } from './Button';
import { TVerticalPosition }          from '../../lib';
import { CSS_CLASS }                  from '../../lib/enums';
import { IStepData }                  from '../../survey/IStepData';

interface INavBar extends IStepData {
  verticalPos: TVerticalPosition;
}

/**
 * Generates the Previous/Next buttons for Wizard navigation
 * @param props
 * @returns
 */
export const NavBar = (props: INavBar): JSX.Element => (
  <nav className={`${CSS_CLASS.NAVBAR} ${CSS_CLASS.NAVBAR}-${props.verticalPos}`}>
    <PreviousButton {...props} />
    <NextButton {...props} />
  </nav>
);
