import { Button } from '@trussworks/react-uswds';
import { QUESTION_TYPE } from '../../lib/enums';
import { useGlobal } from '../../state/GlobalState';
import { IStep } from '../../survey/IStep';
// eslint-disable-next-line import/no-cycle
import { Steps } from '../lib/Steps';

/**
 * Generates the Previous/Next buttons for Wizard navigation
 * @param props
 * @returns
 */
export const QuestionableNavbar = (props: IStep): JSX.Element => {
  const { questionnaire } = useGlobal();

  // We can go back only once past the Landing step and the first actual step.
  // Once past Summary, back is disabled
  const showPrevStep = props.step !== QUESTION_TYPE.LANDING_STEP
    && props.step !== QUESTION_TYPE.RESULTS_STEP
    && props.step !== QUESTION_TYPE.NO_RESULTS_STEP
    && props.step !== questionnaire.flow[1];
  // Results will be the last step; nothing follows
  const showNextStep = props.step !== QUESTION_TYPE.RESULTS_STEP
    && props.step !== QUESTION_TYPE.NO_RESULTS_STEP;

  const backLabel = 'Previous';
  // TODO: update this logic to be generic see: https://github.com/usds/ssa-eligibility/issues/57
  let nextLabel = '';
  switch (props.step) {
    case QUESTION_TYPE.LANDING_STEP:
      nextLabel = 'Get Started';
      break;
    case QUESTION_TYPE.SUMMARY_STEP:
      nextLabel = 'Submit';
      break;
    default:
      nextLabel = 'Next';
      break;
  }

  const next = () => Steps.goToNextStep(props, questionnaire);
  const prev = () => Steps.goToPrevStep(props, questionnaire);
  const disabled = () => Steps.isNextDisabled(props);

  return (
    <nav className="wizard-layout__navbar">
      {/* Previous step */}
      {showPrevStep && (
        <Button
          type="button"
          outline
          onClick={prev}
          data-testid={`prev-button-${props.step}`}
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
          data-testid={`next-button-${props.step}`}
        >
          {nextLabel}
        </Button>
      )}
      {!showNextStep && <div></div>}
    </nav>
  );
};
