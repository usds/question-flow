import { Button }          from '@trussworks/react-uswds';
import { MODE, STEP_TYPE } from '../../lib/enums';
import { useGlobal }       from '../../state/GlobalState';
import { IStepData }       from '../../survey/IStepData';
// eslint-disable-next-line import/no-cycle
import { Steps } from '../lib/Steps';

/**
 * Generates the Previous/Next buttons for Wizard navigation
 * @param props
 * @returns
 */
export const Navbar = (props: IStepData): JSX.Element => {
  const { questionnaire, config } = useGlobal();
  const { step }                  = props;
  // We can go back only once past the Landing step and the first actual step.
  // Once past Summary, back is disabled
  const showPrevStep = props.stepId !== STEP_TYPE.LANDING
    && props.stepId !== STEP_TYPE.RESULTS
    && props.stepId !== STEP_TYPE.NO_RESULTS
    && props.stepId !== questionnaire.flow[1];
  // Results will be the last step; nothing follows
  const showNextStep = props.stepId !== STEP_TYPE.RESULTS
    && props.stepId !== STEP_TYPE.NO_RESULTS;

  const backLabel = step?.buttons?.prev?.label || 'Previous';
  const nextLabel = step?.buttons?.next?.label || 'Next';
  const next      = () => Steps.goToNextStep(props, questionnaire, config);
  const prev      = () => Steps.goToPrevStep(props, questionnaire, config);
  const disabled  = () => config.mode === MODE.VIEW && !Steps.isNextEnabled(props);

  return (
    <nav className="wizard-layout__navbar">
      {/* Previous step */}
      {showPrevStep && (
        <Button
          type="button"
          outline
          onClick={prev}
          data-testid={`prev-button-${props.stepId}`}
        >
          {backLabel}
        </Button>
      )}
      {!showPrevStep && <div></div>}

      {/* Forward step */}
      {showNextStep && (
        <Button
          type="button"
          onClick={next}
          disabled={disabled()}
          data-testid={`next-button-${props.stepId}`}
        >
          {nextLabel}
        </Button>
      )}
      {!showNextStep && <div></div>}
    </nav>
  );
};
