/* eslint-disable import/no-cycle */
import { merge }        from 'lodash';
import { eventedCore }  from '../state/pubsub';
import { IFormCore }    from '../survey/IFormCore';
import { TAgeCore }     from '../util/types';
import { ACTION_TYPE }  from '../util/enums';
import { QuestionCore } from './StepCore';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';

const defaults = {
  responses: [],
};

export class FormCore implements IFormCore {
  protected static _name = getClassName(PREFIX.FORM);

  protected instanceOfCheck: TInstanceOf = FormCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([FormCore._name], obj);
  }

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

  public responses!: QuestionCore[];

  constructor(data: Partial<IFormCore> = {}) {
    merge(this, defaults);
    merge(this, data);
    this.started = new Date();
    eventedCore.publish({ event: this, type: 'start' });
  }

  /**
   * Merges the form's answer state as the user progresses through the survey
   * @param previousState
   * @param action
   * @returns
   */
  public static stepReducer(
    previousState: FormCore,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: { type: ACTION_TYPE; value: any },
  ) {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
    switch (action?.type) {
      case ACTION_TYPE.RESET:
        return new FormCore();

      case ACTION_TYPE.UPDATE:
        return new FormCore(merge(
          {
            ...previousState,
          },
          {
            ...action.value,
          },
        ));

        // Effectively a noop that triggers a re-render of the page
      case ACTION_TYPE.RERENDER:
        return new FormCore({
          ...previousState,
        });

      default:
        return previousState;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchForm(action: { type: ACTION_TYPE; value: any }) {
    return FormCore.stepReducer(this, action);
  }
}

export const { stepReducer } = FormCore;
