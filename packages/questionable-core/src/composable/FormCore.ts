/* eslint-disable import/no-cycle */
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
import { QuestionCore }                                        from './QuestionCore';
import { defaultReducer, TStepReducerAction, type TReducerFn } from '../constructable/lib/defaultReducer';

export interface FormCore extends BaseCore, IFormCore {}

export class FormCore extends BaseCore implements IFormCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.form;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf({ names: [ClassList.form], obj });
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
  public static reducer({ form, action, callback }:
    {action: TStepReducerAction; callback?: TReducerFn<FormCore>; form: Partial<FormCore>}) {
    return defaultReducer({
      Form: FormCore, action, callback, oldState: form,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce({ action, callback }: { action: TStepReducerAction; callback?: TReducerFn<FormCore> }) {
    return FormCore.reducer({ action, callback, form: this });
  }
}
