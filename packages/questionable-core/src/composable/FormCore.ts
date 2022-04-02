/* eslint-disable import/no-cycle */
import { merge }                    from 'lodash';
import { eventedCore }              from '../state/pubsub';
import {
  IFormCore,
  EFormCoreProperties as p,
  FormCoreClassName as className,
} from '../survey/IFormCore';
import { TAgeCore }     from '../util/types';
import { ACTION_TYPE }  from '../util/enums';
import { QuestionCore } from './StepCore';
import {
  checkInstanceOf,
  TInstanceOf,
} from '../util/instanceOf';
import { fromSet, toSet } from '../util/set';

export class FormCore implements IFormCore {
  public static readonly [p._name] = className;

  public readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className], obj);
  }

  public static create(data: Partial<FormCore> = {}) {
    if (data instanceof FormCore) {
      return data;
    }
    return new FormCore(data);
  }

  constructor(data: Partial<FormCore> = {}) {
    this[p._started]   = new Date();
    this[p._age]       = data.age;
    this[p._birthdate] = data.birthdate || '';
    this[p._finished]  = data.finished;
    this[p._responses] = toSet(data.responses || []);
    eventedCore.publish({ event: this, type: 'start' });
  }

  private [p._started]: Date;

  public get [p.started]() {
    return this[p._started];
  }

  private [p._birthdate]: string;

  public get [p.birthdate]() {
    return this[p._birthdate];
  }

  public set [p.birthdate](data: string) {
    this[p._birthdate] = data;
  }

  private [p._age]: TAgeCore | undefined;

  public get [p.age]() {
    return this[p._age];
  }

  public set [p.age](data) {
    this[p._age] = data;
  }

  private [p._finished]: Date | undefined;

  public get [p.finished](): Date | undefined {
    return this[p._finished];
  }

  public set [p.finished](date: Date | undefined) {
    if (date) {
      this[p._finished] = date;
      eventedCore.publish({ event: this, type: 'finish' });
    }
  }

  private [p._responses]: Set<QuestionCore>;

  public get [p.responses](): QuestionCore[] {
    return fromSet(this[p._responses]);
  }

  public add(response: QuestionCore) {
    this[p._responses].add(response);
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
