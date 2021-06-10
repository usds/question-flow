import { Button as B }                               from '@trussworks/react-uswds';
import {
  MODE, STEP_TYPE, TButtonMode, TVerticalPosition,
} from '../../lib';
import { noel }      from '../../lib/noop';
import { useGlobal } from '../../state/GlobalState';
import { IStepData } from '../../survey/IStepData';
import { Steps }     from '../lib/Steps';

type TButtonConfig = {
  dir: 'next' | 'prev';
  disabled: () => boolean;
  label: string;
  mode: TButtonMode;
  onClick: () => void,
  stepId: string;
}

const Button = (props: TButtonConfig): JSX.Element => (
  <B
    type="button"
    onClick={props.onClick}
    data-testid={`${props.dir}-button-${props.stepId}`}
    unstyled={props.mode === 'link'}
    disabled={props.disabled()}
  >
    {props.label}
  </B>
);

interface INavBar extends IStepData {
  verticalPos: TVerticalPosition;
}

export const PreviousButton = (props: INavBar): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  const { step } = props;
  // We can go back only once past the Landing step and the first actual step.
  // Once past Summary, back is disabled
  const doNotRender = props.verticalPos !== config.nav.prev.verticalPos
    || props.stepId === STEP_TYPE.LANDING
    || props.stepId === STEP_TYPE.RESULTS
    || props.stepId === STEP_TYPE.NO_RESULTS
    || props.stepId === questionnaire.flow[1];

  if (doNotRender) {
    return noel();
  }

  const label    = step?.buttons?.prev?.label || config.nav.prev.defaultLabel || 'Previous';
  const onClick  = () => Steps.goToPrevStep(props, questionnaire, config);
  const disabled = () => false;

  return (
    <Button {...
      {
        dir:    'prev',
        disabled,
        label,
        mode:   config.nav.prev.mode || 'link',
        onClick,
        stepId: `${props.stepId}`,
      }
    }/>
  );
};

export const NextButton = (props: INavBar): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  const { step } = props;

  const doNotRender = props.verticalPos !== config.nav.next.verticalPos
    || props.stepId === STEP_TYPE.RESULTS
    || props.stepId === STEP_TYPE.NO_RESULTS;

  if (doNotRender) {
    return noel();
  }

  const label    = step?.buttons?.next?.label || config.nav.next.defaultLabel || 'Previous';
  const onClick  = () => Steps.goToNextStep(props, questionnaire, config);
  const disabled = () => config.mode === MODE.VIEW && !Steps.isNextEnabled(props);

  return (
    <Button {...
      {
        dir:    'next',
        disabled,
        label,
        mode:   config.nav.next.mode || 'button',
        onClick,
        stepId: `${props.stepId}`,
      }
    }/>
  );
};
