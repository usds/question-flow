import {
  StepCore,
} from '@usds.gov/questionable-core';
import { ReactNode } from 'react';
import { Buttons }   from './Buttons';

/**
 * Generic step data definition. Applies to all types of steps.
 */
export class Step extends StepCore {
  constructor(data: Partial<Step>) {
    super(data);
    if (data.buttons) {
      this.buttons = data.buttons;
    }
    if (data.children) {
      this.children = data.children;
    }
  }

  /**
   * React children to append to the title area
   *
   * @hidden
   */
  children?: ReactNode;

  buttons?: Buttons;
}
