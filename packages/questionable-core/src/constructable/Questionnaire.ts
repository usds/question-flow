/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
import { ActionCore }             from '../composable/ActionCore';
import { StepCore }               from '../composable/StepCore';
import { QuestionableConfigCore } from '../composable/ConfigCore';
import { ResultCore }             from '../composable/ResultCore';
import { PageCore }               from '../composable/PageCore';
import { QuestionnaireCore }      from '../composable/QuestionnaireCore';
import { QuestionCore }           from '../composable/QuestionCore';
import { BranchCore }             from '../composable/BranchCore';
import { SectionCore }            from '../composable/SectionCore';
import { TCollectable }           from '../metadata/types/TCollectable';
import { addToPool }              from './types';

/**
 * Utility wrapper for survey state
 */
export class Questionnaire<
  Q extends S & QuestionCore,
  P extends S & PageCore,
  S extends StepCore = StepCore,
> {
  #pages!: P[];

  #questions!: Q[];

  #steps!: S[];

  #questionnaire: QuestionnaireCore;

  constructor(data: QuestionnaireCore) {
    this.#questionnaire = data;
    this.#steps         = this.#questionnaire.steps.map((q) => q as unknown as S);
    this.#questions     = this.#questionnaire.questions.map((q) => q as unknown as Q);

    // this.#pages         = this.#questionnaire.pageList.map((q) => q as unknown as P);
  }

  public get actions(): ActionCore[] {
    return this.#questionnaire.actions;
  }

  public get branches(): BranchCore[] {
    return this.#questionnaire.branches;
  }

  public get config(): QuestionableConfigCore {
    return this.#questionnaire.config;
  }

  public get flow(): string[] {
    return this.#questionnaire.flow;
  }

  public get questions(): Q[] {
    return this.#questions;
  }

  public get steps(): S[] {
    return this.#steps;
  }

  public get sections(): SectionCore[] {
    return this.#questionnaire.sections;
  }

  public get results(): ResultCore[] {
    return this.#questionnaire.results;
  }

  public get pages(): P[] {
    return this.#pages;
  }

  public add(data: TCollectable) {
    addToPool(data, this.#questionnaire);
    return this;
  }
}
