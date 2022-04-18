/* eslint-disable import/no-cycle */
import { merge }       from 'lodash';
import { eventedCore } from '../state/pubsub';
import { IFormCore }   from '../metadata/IFormCore';
import { matches }     from '../lib/helpers';
import { TAgeCore }    from '../metadata/types/TAgeCore';
import { BaseCore }    from './BaseCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../lib/instanceOf';
import { QuestionCore }     from './QuestionCore';
import { OP_TYPE, TOpType } from '../metadata/types/TOpType';

export interface FormCore extends BaseCore, IFormCore {}

export type TStepReducerAction = {
  type: TOpType;
  value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export type TStepReducer = {
  action: TStepReducerAction,
};
export type TReducer = {
  action: TStepReducerAction;
  previousState: Partial<FormCore>;
}

export type TReducerFn = (
  previousState: Partial<FormCore>, action: TStepReducerAction, callback?: TReducerFn
) => FormCore;

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export const defaultReducer: TReducerFn = (previousState, action, callback?: TReducerFn) => {
  // Action should never be null,
  // __EXCEPT__ when we attempt to storybook/test individual components in isolation
  let ret: FormCore;
  switch (action?.type) {
    case OP_TYPE.RESET:
      ret = new FormCore();
      break;

    case OP_TYPE.UPDATE:
      ret = FormCore.create(merge(
        {
          ...previousState,
        },
        {
          ...action.value,
        },
      ));
      break;

    // Effective a noop that triggers a re-render of the page
    case OP_TYPE.RERENDER:
      ret = FormCore.create(previousState);
      break;

    default:
      ret =  FormCore.create(previousState);
      break;
  }
  if (callback) {
    callback(ret, action);
  }
  eventedCore.publish({ event: ret, type: 'reduce' });
  return ret;
};

export class FormCore extends BaseCore implements IFormCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.form;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.form], obj);
  }

  public static override create(data: Partial<FormCore> = {}) {
    if (data instanceof FormCore) {
      return data;
    }
    return new FormCore(data);
  }

  public static override createOptional(data?: Partial<FormCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return FormCore.create(data);
  }

  #started;

  #birthdate;

  #age;

  #finished;

  #responses;

  constructor(data: Partial<FormCore> = {}) {
    super(data);
    this.#started  = new Date();
    this.#age      = data.age;
    this.#finished = data.finished;
    // this.#responses = data.responses || [];
    this.#birthdate = data.birthdate || '';
    this.#responses = data.responses?.map((r) => QuestionCore.create(r)) || [];
    eventedCore.publish({ event: this, type: 'start' });
  }

  public get started(): Date {
    return this.#started;
  }

  public get birthdate(): string {
    return this.#birthdate;
  }

  public set birthdate(val: string) {
    this.#birthdate = val;
  }

  public get age(): TAgeCore | undefined {
    return this.#age;
  }

  public set age(data: TAgeCore | undefined) {
    this.#age = data;
  }

  public get finished(): Date | undefined {
    return this.#finished;
  }

  public set finished(date: Date | undefined) {
    if (date && !this.#finished) {
      this.#finished = date;
      eventedCore.publish({ event: this, type: 'finish' });
    }
  }

  public get responses(): QuestionCore[] {
    return this.#responses;
  }

  public set responses(val: QuestionCore[]) {
    this.#responses = val;
  }

  public existsIn(data: QuestionCore): boolean {
    if (data instanceof QuestionCore) {
      return this.#responses.some(
        (q) => q === data || matches(q.title, data.title),
      );
    }
    return false;
  }

  public add(data: QuestionCore): FormCore {
    const exists = this.existsIn(data);
    if (exists) {
      return this;
    }
    if (data instanceof QuestionCore) {
      this.#responses.push(data);
    }
    return this;
  }

  /**
   * Merges the form's answer state as the user progresses through the survey
   * @param previousState
   * @param action
   * @returns
   */
  public static reducer: TReducerFn = (form, action, callback) => defaultReducer(form, action, callback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce(action: TStepReducerAction, callback?: TReducerFn) {
    return FormCore.reducer(this, action, callback);
  }
}
