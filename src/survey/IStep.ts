import { ReactNode } from 'react';
import { IWizard } from 'use-wizard/lib/cjs/useWizard/types/IWizard';
import { TStep } from 'use-wizard/lib/cjs/useWizard/types/TStep';
import { TReducer } from '../lib/types';
import { IAnswer } from './IAnswer';
import { IQuestion } from './IQuestion';

/**
 * Data defintion for wizard step
 */
export interface IStep extends IPrepStep {
  question: IQuestion;
}

/**
 * Data defintion for wizard prep step
 */
export interface IPrepStep {
  step: TStep;
  wizard: IWizard;
  form: IAnswer;
  dispatchForm: TReducer;
  children?: ReactNode;
}
