import { PAGE_TYPE } from '../lib/enums';
import { IQuestion } from './IQuestion';

/**
 * Default landing step if none is defined
 */
const LANDING_STEP: IQuestion = {
  id: PAGE_TYPE.LANDING_STEP,
  sectionId: PAGE_TYPE.LANDING_STEP,
  questionText: PAGE_TYPE.LANDING_STEP,
  questionType: PAGE_TYPE.LANDING_STEP,
  answers: {},
};

/**
 * Default result step if none is defined
 */
const RESULT_STEP: IQuestion = {
  id: PAGE_TYPE.RESULTS_STEP,
  sectionId: PAGE_TYPE.RESULTS_STEP,
  questionText: PAGE_TYPE.RESULTS_STEP,
  questionType: PAGE_TYPE.RESULTS_STEP,
  answers: {},
};

/**
 * Default no results step if none is defined
 */
const NO_RESULT_STEP: IQuestion = {
  id: PAGE_TYPE.NO_RESULTS_STEP,
  sectionId: PAGE_TYPE.RESULTS_STEP,
  questionText: PAGE_TYPE.NO_RESULTS_STEP,
  questionType: PAGE_TYPE.NO_RESULTS_STEP,
  answers: {},
};

/**
 * Default result step if none is defined
 */
const SUMMARY_STEP: IQuestion = {
  id: PAGE_TYPE.SUMMARY_STEP,
  sectionId: PAGE_TYPE.RESULTS_STEP,
  questionText: PAGE_TYPE.SUMMARY_STEP,
  questionType: PAGE_TYPE.SUMMARY_STEP,
  answers: {},
};

const DEFAULT_STEPS = {
  LANDING_STEP,
  NO_RESULT_STEP,
  RESULT_STEP,
  SUMMARY_STEP,
};

/**
 * Ensures that all required steps are defined
 * @param questions
 */
export const validateSteps = (questions: IQuestion[]): void => {
  // NOTE: the following default assignment logic is not yet factored out.
  // This could be abstracted if repitions of this pattern emerge.

  const error = 'step is not correctly defined or defined more than once';

  // Ensure the wizard has an intro step at the beginning
  if (questions[0].questionType !== PAGE_TYPE.LANDING_STEP) {
    questions.unshift(DEFAULT_STEPS.LANDING_STEP);
  }
  if (
    questions.filter((q) => q.questionType === PAGE_TYPE.LANDING_STEP).length !== 1
  ) {
    throw new Error(`${PAGE_TYPE.LANDING_STEP} ${error}.`);
  }

  // Ensure the wizard has a no results step at the end
  if (questions[questions.length - 1].questionType !== PAGE_TYPE.NO_RESULTS_STEP) {
    // No results is last
    questions.push(DEFAULT_STEPS.NO_RESULT_STEP);
  }
  if (
    questions.filter((q) => q.questionType === PAGE_TYPE.NO_RESULTS_STEP).length
    !== 1
  ) {
    throw new Error(`${PAGE_TYPE.RESULTS_STEP} ${error}.`);
  }

  // Ensure the wizard has a result step before the end
  if (questions[questions.length - 2].questionType !== PAGE_TYPE.RESULTS_STEP) {
    // Create wizard's final step as the default step
    questions.splice(questions.length - 2, 0, DEFAULT_STEPS.NO_RESULT_STEP);
  }
  if (
    questions.filter((q) => q.questionType === PAGE_TYPE.RESULTS_STEP).length !== 1
  ) {
    throw new Error(`${PAGE_TYPE.RESULTS_STEP} ${error}.`);
  }

  // Ensure the wizard has a summary step before results
  if (questions[questions.length - 3].questionType !== PAGE_TYPE.SUMMARY_STEP) {
    // Create wizard's summary step as the default step
    questions.splice(questions.length - 3, 0, DEFAULT_STEPS.SUMMARY_STEP);
  }
  if (
    questions.filter((q) => q.questionType === PAGE_TYPE.SUMMARY_STEP).length !== 1
  ) {
    throw new Error(`${PAGE_TYPE.SUMMARY_STEP} ${error}.`);
  }
};
