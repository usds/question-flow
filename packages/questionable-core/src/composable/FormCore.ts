/* eslint-disable import/no-cycle */
import { merge }        from 'lodash';
import { eventedCore }  from '../state';
import { IFormCore }    from '../survey/IFormCore';
import { TAgeCore }     from '../util/types';
import { ACTION_TYPE }  from '../util/enums';
import { QuestionCore } from './QuestionCore';

export class FormCore implements IFormCore {
  public readonly started: Date;

  #finished?: Date;

  public birthdate?: string;

  public age?: TAgeCore;

  public get finish(): Date | undefined {
    return this.#finished;
  }

  public set finish(date: Date | undefined) {
    if (date) {
      this.#finished = date;
      eventedCore.publish({ event: this, type: 'finish' });
    }
  }

  public responses: QuestionCore[] = [];

  constructor(data: Partial<IFormCore> = {}) {
    Object.assign(this, data);
    this.started = new Date();
    eventedCore.publish({ event: this, type: 'start' });
  }
}

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export const stepReducer = (
  previousState: IFormCore,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ACTION_TYPE; value: any },
): IFormCore => {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
  switch (action?.type) {
    case ACTION_TYPE.RESET:
      return new FormCore();

    case ACTION_TYPE.UPDATE:
      return merge(
        {
          ...previousState,
        },
        {
          ...action.value,
        },
      );

    // Effectively a noop that triggers a re-render of the page
    case ACTION_TYPE.RERENDER:
      return ({
        ...previousState,
      });

    default:
      return previousState;
  }
};
