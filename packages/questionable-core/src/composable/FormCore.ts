/* eslint-disable import/no-cycle */
import { merge }       from 'lodash';
import { eventedCore } from '../state/pubsub';
import {
  IFormCore,
} from '../survey/IFormCore';
import { TAgeCore }     from '../util/types';
import { ACTION_TYPE }  from '../util/enums';
import { QuestionCore } from './StepCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { fromSet, toSet }           from '../util/set';
import { EFormCoreProperties as p } from '../metadata/MForm';

export class FormCore implements IFormCore {
  public readonly [p.instanceOfCheck]: TInstanceOf = ClassList.form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.form], obj);
  }

  public static create(data: Partial<IFormCore> = {}) {
    if (data instanceof FormCore) {
      return data;
    }
    return new FormCore(data);
  }

  constructor(data: Partial<IFormCore> = {}) {
    this[p._started]   = new Date();
    this[p._age]       = data.age;
    this[p._birthdate] = data.birthdate || '';
    this[p._finished]  = data.finished;
    const responses    = data.responses?.map((r) => {
      if (r instanceof QuestionCore) {
        return r;
      }
      return new QuestionCore(r);
    }) || [];
    this[p._responses] = toSet(responses);
    eventedCore.publish({ event: this, type: 'start' });
  }

  private [p._started]: Date;

  public get [p.started]() {
    return this[p._started];
  }

  //private [p.birthdate]: string;

  public get [p.birthdate]() {
    return this[p._birthdate];
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
