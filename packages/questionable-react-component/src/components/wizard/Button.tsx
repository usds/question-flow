import { Button as B }     from '@trussworks/react-uswds';
import {
  MODE,
  STEP_TYPE,
  TButtonModeCore,
  TVerticalPositionCore,
} from '@usds.gov/questionable-core';
import { CSS_CLASS } from '../../lib/enums';
import { noel }      from '../../lib/noel';
import { useGlobal } from '../../state/GlobalState';
import { IStepData } from '../../survey/IStepData';
import { Steps }     from '../lib/Steps';

type TButtonConfig = {
  dir: 'next' | 'prev';
  disabled: () => boolean;
  label: string;
  mode: TButtonModeCore;
  onClick: () => void;
  stepId: string;
};

const Button = (props: TButtonConfig): JSX.Element => (
  <B
    className={`${CSS_CLASS.NAVBAR_BUTTON} ${CSS_CLASS.NAVBAR_BUTTON}-${props.dir}`}
    data-testid={`${props.dir}-button-${props.stepId}`}
    disabled={props.disabled()}
    onClick={props.onClick}
    type="button"
    unstyled={props.mode === 'link'}
    outline={props.mode !== 'link' && props.dir === 'prev'}
  >
    {props.label}
  </B>
);

interface INavBar extends IStepData {
  verticalPos: TVerticalPositionCore;
}

export const PreviousButton = (props: INavBar): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  if (config.nav.prev.visible === false) {
    return noel();
  }

  const { step } = props;

  if (step?.buttons?.prev?.visible === false) {
    return noel();
  }

  const layoutMismatch = props.verticalPos !== config.nav.prev.verticalPos;
  const surveyStart    = (props.stepId === STEP_TYPE.LANDING
    && questionnaire.flow[0] === STEP_TYPE.LANDING)
    || props.stepId === questionnaire.flow[0];
  const surveyEnd      = props.stepId === STEP_TYPE.RESULTS
    || props.stepId === STEP_TYPE.NO_RESULTS;
  const notEditMode    = config.mode !== MODE.EDIT
    || (props.stepId === questionnaire.flow[0] && config.mode === MODE.EDIT);
  const doNotRender    = layoutMismatch || ((surveyStart || surveyEnd) && notEditMode);

  if (doNotRender) {
    return noel();
  }

  const label    = step?.buttons?.prev?.title || config.nav.prev.defaultLabel || 'Previous';
  const onClick  = () => Steps.goToPrevStep(props, questionnaire);
  const disabled = () => false;

  return (
    <Button
      {...{
        dir:    'prev',
        disabled,
        label,
        mode:   config.nav.prev.type || 'link',
        onClick,
        stepId: `${props.stepId}`,
      }}
    />
  );
};

export const NextButton = (props: INavBar): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  if (!config.nav.next.visible) {
    return noel();
  }

  const { step } = props;

  if (step?.buttons?.next?.visible === false) {
    return noel();
  }

  const layoutMismatch = props.verticalPos !== config.nav.next.verticalPos;
  const surveyEnd      = props.stepId === STEP_TYPE.RESULTS
    || props.stepId === STEP_TYPE.NO_RESULTS;
  const notEditMode    = config.mode !== MODE.EDIT
    || (props.stepId === questionnaire.flow[questionnaire.flow.length - 1]
      && config.mode === MODE.EDIT);
  const doNotRender    = layoutMismatch || (surveyEnd && notEditMode);

  if (doNotRender) {
    return noel();
  }

  const label    = step?.buttons?.next?.title || config.nav.next.defaultLabel || 'Previous';
  const onClick  = () => Steps.goToNextStep(props, questionnaire);
  const disabled = () =>
    config.mode === MODE.VIEW && !Steps.isNextEnabled(props);

  return (
    <Button
      {...{
        dir:    'next',
        disabled,
        label,
        mode:   config.nav.next.type || 'button',
        onClick,
        stepId: `${props.stepId}`,
      }}
    />
  );
};
