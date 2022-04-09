import {
  TReducerCore,
  IFormCore,
  QuestionCore,
  StepCore,
  PageCore,
} from '@usds.gov/questionable-core';
import { ReactNode } from 'react';
import { IWizard }   from 'use-wizard/lib/cjs/useWizard/types/IWizard';
import { IStep }     from './IStep';

/**
 * Data defintion for base wizard step
 */
export type IStepData = {
  /**
   * Child component(s) to render
   *
   * @hidden JSON Schema doesn't support React components
   */
  children?: ReactNode;
  /**
   * Reducer to execute with form progression
   *
   * @hidden JSON Schema doesn't support functions
   */
  dispatchForm: TReducerCore;
  /**
   * The user's current form state
   *
   * @title Form
   */
  form: IFormCore;
  /**
   * Current step
   *
   * @title Step
   */
  step?: IStep;
  /**
   * Unique Id
   *
   * @title Step Id
   * @hidden Not viewable/editable in Design Mode
   */
  stepId: string | number;
  /**
   * `use-Wizard` instance for this instance of Questionable
   *
   * @title Wizard
   * @hidden Not viewable/editable in Design Mode
   */
  wizard: IWizard;
};

/**
 * Data defintion for design step
 */
export type IDesignData = IStepData & {
  step: StepCore;
};

/**
 * Data defintion for question step
 */
export type IQuestionData = IStepData & {
  step: QuestionCore;
};

/**
 * Data defintion for page step
 */
export type IPageData = IStepData & {
  step: PageCore;
}
