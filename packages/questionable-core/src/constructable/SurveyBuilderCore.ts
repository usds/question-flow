/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable new-cap */
// import {
//   ActionCore, ComposableCore,
// }                       from '../composable';
import { QuestionnaireCore } from '../composable/QuestionnaireCore';

export class SurveyBuilder<T extends QuestionnaireCore> {
  public get actions() {
    return this.#questionnaire.actions;
  }
  // public get branches(): T[] {
  //   return this.#questionnaire.branches;
  // }

  constructor(questionnaire: T) {
    this.#questionnaire = questionnaire;
    // questionnaire.branches
    // questionnaire.config
    // questionnaire.flow
    // questionnaire.form
    // questionnaire.pages
    // questionnaire.questions
    // questionnaire.results
    // questionnaire.sections
    // questionnaire.
    // let x = add<SectionCore, ISectionCore>(SectionCore, { id: '', requirements: [] }, questionnaire)
  }

  #questionnaire: T;

  // get #form() {
  //   return this.#questionnaire.form;
  // }

  // #getRef2<C extends CC>(
  //   type: { new(...args: [CC, QuestionnaireCore]): C },
  //   ...args: [CC, QuestionnaireCore]
  // ): C {
  //   return new type(...args);
  // }

  // #getRef<C extends ComposableCore>(data: IRefCore): C {
  //   if (data instanceof C) {
  //     return data as C;
  //   }
  //   return new C(this.#questionnaire, data);
  // }
  // add<TClass extends ComposableCore>(
  //   type: { new(...args: [TClass, QuestionnaireCore]): TClass },
  //   ...args: [TClass, QuestionnaireCore]
  // ) {
  //   const item: TClass = new type(...args);
  //   switch (item.instanceOfCheck) {
  //     case ActionCore._name:
  //       if (item instanceof ActionCore) {
  //         this.actions.push(item);
  //       }
  //       break;
  //   }
  //   return item;
  // }
}
