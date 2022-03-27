import { IStepDataCore, TReducerCore } from '@usds.gov/questionable-core';
import { ReactNode }                   from 'react';
import { IWizard }                     from 'use-wizard/lib/cjs/useWizard/types/IWizard';
import { IForm }                       from './IForm';
import { IStep }                       from './IStep';

/**
 * Data defintion for base wizard step
 */
export interface IStepData extends IStepDataCore {
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
  form: IForm;
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
}
