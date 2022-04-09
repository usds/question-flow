/* eslint-disable import/no-cycle */
import {
  PageCore,
  QuestionCore,
  StepCore,
} from '@usds.gov/questionable-core';
import { ReactNode } from 'react';
import { IButton }   from './IButton';

/**
 * Generic step data definition. Applies to all types of steps.
 */
export interface IStep extends StepCore {
  /**
   * Collection of navigation buttons
   *
   * @title Buttons
   */
  buttons?: {
    /**
     * Next button
     *
     * @title Next Button
     * @default { label: 'Next' }
     */
    next?: IButton| undefined;
    /**
     * Previous / Back button
     *
     * @title Prev Button
     * @default { label: 'Prev' }
     */
    prev?: IButton| undefined;
  }| undefined;
  /**
   * React children to append to the title area
   *
   * @hidden
   */
  children?: ReactNode;
}

export type IQuestion = IStep & QuestionCore;
export type IPage = IStep & PageCore;
