import {
  TReducerCore,
  FormCore,
} from '@usds.gov/questionable-core';
import { ReactNode } from 'react';
import { IWizard }   from 'use-wizard/lib/cjs/useWizard/types/IWizard';
import { Step }      from './Step';
import { TWizard }   from './Wizard';

/**
 * Data defintion for base wizard step
 */
export class StepData {
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
  dispatchForm!: TReducerCore;

  /**
   * The user's current form state
   *
   * @title Form
   */
  form!: FormCore;

  /**
   * Current step
   *
   * @title Step
   */
  step?: Step;

  /**
   * Unique Id
   *
   * @title Step Id
   * @hidden Not viewable/editable in Design Mode
   */
  stepId!: string | number;

  wizard!: TWizard;
}
