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
import { Step }      from '../../composable/Step';

type TButtonConfig = {
  dir: 'next' | 'prev';
  disabled: () => boolean;
  label: string;
  mode: TButtonModeCore;
  onClick: () => void;
  stepId: string;
};

const Button = ({
  dir, disabled, label, mode, onClick, stepId,
}: TButtonConfig): JSX.Element => (
  <B
    className={`${CSS_CLASS.NAVBAR_BUTTON} ${CSS_CLASS.NAVBAR_BUTTON}-${dir}`}
    data-testid={`${dir}-button-${stepId}`}
    disabled={disabled()}
    onClick={onClick}
    type="button"
    unstyled={mode === 'link'}
    outline={mode !== 'link' && dir === 'prev'}
  >
    {label}
  </B>
);

type INavBar = {
  step: Step;
  verticalPos: TVerticalPositionCore;
};

export const PreviousButton = ({ step, verticalPos }: INavBar): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  if (config.nav?.prev?.visible === false) {
    return noel();
  }
  if (step?.buttons?.prev?.visible === false) {
    return noel();
  }

  const layoutMismatch = verticalPos !== config.nav?.prev?.verticalPos;
  const surveyStart    = (step.type === STEP_TYPE.LANDING
    && questionnaire.flow[0] === STEP_TYPE.LANDING)
    || step.id === questionnaire.flow[0];
  const surveyEnd      = step.type === STEP_TYPE.RESULTS
    || step.type === STEP_TYPE.NO_RESULTS;
  const notEditMode    = config.mode !== MODE.EDIT
    || (step.id === questionnaire.flow[0] && config.mode === MODE.EDIT);
  const doNotRender    = layoutMismatch || ((surveyStart || surveyEnd) && notEditMode);

  if (doNotRender) {
    return noel();
  }

  const label    = step?.buttons?.prev?.title || config.nav.prev?.defaultLabel || 'Previous';
  const onClick  = () => questionnaire.goToPrevStep(step);
  const disabled = () => false;

  return (<Button
    dir={'prev'}
    disabled={disabled}
    label={label}
    mode={config.nav.prev?.type || 'link'}
    onClick={onClick}
    stepId={step.id}
  />);
};

export const NextButton = ({ step, verticalPos }: INavBar): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  if (config.nav.next?.visible === false) {
    return noel();
  }

  if (step?.buttons?.next?.visible === false) {
    return noel();
  }

  const layoutMismatch = verticalPos !== config.nav.next?.verticalPos;
  const surveyEnd      = step.type === STEP_TYPE.RESULTS
    || step.type === STEP_TYPE.NO_RESULTS;
  const notEditMode    = config.mode !== MODE.EDIT
    || (step.id === questionnaire.flow[questionnaire.flow.length - 1]
      && config.mode === MODE.EDIT);
  const doNotRender    = layoutMismatch || (surveyEnd && notEditMode);

  if (doNotRender) {
    return noel();
  }

  const label    = step?.buttons?.next?.title || config.nav.next?.defaultLabel || 'Previous';
  const onClick  = () => questionnaire.goToNextStep(step);
  const disabled = () =>
    config.mode === MODE.VIEW && !questionnaire.isNextEnabled(step);

  return (
    <Button
      dir={'next'}
      disabled={disabled}
      label={label}
      mode={config.nav.next?.type || 'button'}
      onClick={onClick}
      stepId={step.id}
    />
  );
};
