import { FormCore }               from '../composable/FormCore';
import { QuestionCore, StepCore } from '../composable/StepCore';

export type TQForm = {
  form: FormCore,
  question: QuestionCore
};

export type TSForm = {
  form: FormCore,
  step: StepCore
};
