import { ReactNode } from 'react';
import { IWizard }   from 'use-wizard/lib/cjs/useWizard/types/IWizard';
import { TStep }     from 'use-wizard/lib/cjs/useWizard/types/TStep';
import { TReducer }  from '../lib/types';
import { IAnswer }   from './IAnswer';
import { IStep }     from './IStep';

/**
 * Data defintion for base wizard step
 */
export interface IStepData {
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
  dispatchForm: TReducer;
  /**
   * The user's current form state
   *
   * @title Form
   */
  form: IAnswer;
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
  stepId: TStep;
  /**
   * `use-Wizard` instance for this instance of Questionable
   *
   * @title Wizard
   * @hidden Not viewable/editable in Design Mode
   */
  wizard: IWizard;
}
