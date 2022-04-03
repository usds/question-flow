import { BranchCore, QuestionnaireCore } from '../composable';

export class ReferentialIntegrity {
  #questionnaire: QuestionnaireCore;

  constructor(questionnaire: QuestionnaireCore) {
    this.#questionnaire = questionnaire;
  }

  // eslint-disable-next-line class-methods-use-this
  syncBranches(_branch: BranchCore) {
    // TODO finish this
    // if (branch.questions) {
    //   this.questions = data.questions.map((q) => questionnaire.getQuestionById(q.id));
    // }
    // this.questions.forEach((q) => {
    //   // eslint-disable-next-line no-param-reassign
    //   q.branch = this;
    // });
  }
}
