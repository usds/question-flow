/* eslint-disable import/no-cycle */
import { merge }                                   from 'lodash';
import { eventedCore }                             from '../state/pubsub';
import { IFormCore }                               from '../survey/IFormCore';
import { ACTION_TYPE }                             from '../util/enums';
import { matches }                                 from '../util/helpers';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { TAgeCore }                                from '../util/types';
import { BaseCore }                                from './BaseCore';
import { QuestionCore }                            from './StepCore';

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
        return new FormCore(
          merge(
            {
              ...previousState,
            },
            {
              ...action.value,
            },
          ),
        );

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
