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
import { fromSet, toSet }     from '../util/set';
import {
  EFormCoreProperties as p,
  type TFormCoreProperties,
} from '../metadata/MForm';
import { Dictionary } from './Dictionary';
import { BaseCore }   from './BaseCore';

export class FormCore extends BaseCore implements IFormCore {
  #hash: Dictionary<TFormCoreProperties, unknown>;

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
    super();
    const hash = new Dictionary<TFormCoreProperties, string | Date | TAgeCore | Set<QuestionCore>>();
    this.#hash = hash;

    hash.init(data);
    hash.set(p.started, new Date());
    if (data.age) {
      hash.set(p.age, data.age);
    }
    hash.set(p.birthdate, data.birthdate || '');
    if (data.finished) {
      hash.set(p.finished, data.finished);
    }
    const responses = toSet(data.responses?.map((r) => {
      if (r instanceof QuestionCore) {
        return r;
      }
      return new QuestionCore(r);
    }) || []);
    hash.set(p.responses, responses);

    eventedCore.publish({ event: this, type: 'start' });
  }

  public get [p.started](): Date {
    return this.#hash.touch(p.started, new Date());
  }

  public get [p.birthdate](): string {
    return this.#hash.touch(p.birthdate, '');
  }

  public set [p.birthdate](val: string) {
    this.#hash.set(p.birthdate, val);
  }

  public get [p.age](): TAgeCore | undefined {
    return this.#hash.get(p.age);
  }

  public set [p.age](data: TAgeCore | undefined) {
    this.#hash.set(p.age, data);
  }

  public get [p.finished](): Date | undefined {
    return this.#hash.get(p.finished);
  }

  public set [p.finished](date: Date | undefined) {
    if (date) {
      this.#hash.set(p.finished, date);
      eventedCore.publish({ event: this, type: 'finish' });
    }
  }

  public get [p.responses](): QuestionCore[] {
    return fromSet(this.#hash.touch(p.responses, new Set<QuestionCore>()));
  }

  public set [p.responses](val: QuestionCore[]) {
    this.#hash.set(p.finished, toSet(val));
  }

  public add(response: QuestionCore) {
    this.#hash.get<Set<QuestionCore>>(p.finished).add(response);
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
