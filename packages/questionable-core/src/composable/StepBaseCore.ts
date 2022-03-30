/* eslint-disable import/no-cycle */
import { BaseCore }          from './BaseCore';
import { QuestionnaireCore } from './QuestionnaireCore';

export class StepBaseCore extends BaseCore {
  constructor({ questionnaire }: { questionnaire: QuestionnaireCore}) {
    super({ form: questionnaire.form });
    this.questionnaire = questionnaire;
  }

  questionnaire: QuestionnaireCore;
}
