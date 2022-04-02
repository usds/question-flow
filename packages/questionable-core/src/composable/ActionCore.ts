/* eslint-disable import/no-cycle */
import { IRefCore }             from '../survey';
import {
  IActionCore,
  ActionCoreClassName as className,
  EActionCoreProperties as p,
} from '../survey/IActionCore';
import { IButtonCore }    from '../survey/IButtonCore';
import { fromSet, toSet } from '../util';
import { ACTION }         from '../util/enums';
import {
  checkInstanceOf,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';

export class ActionCore extends ComposableCore implements IActionCore, IRefCore {
  public static override readonly [p._name] = className;

  public override readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, ComposableCore._name], obj);
  }

  public static override create(data: Partial<ActionCore> = {}, questionnaire: Partial<QuestionnaireCore> = {}) {
    if (data instanceof ActionCore) {
      return data;
    }
    return new ActionCore(data, questionnaire);
  }

  constructor(data: Partial<ActionCore> = {}, questionnaire: Partial<QuestionnaireCore> = {}) {
    super(data, questionnaire);
    this[p._buttons]  = toSet(data.buttons || []);
    this[p._label]    = data.label || '';
    this[p._subTitle] = data.subTitle || '';
    this[p._type]     = data.type || ACTION.DEFAULT;
  }

  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  public get [p.buttons](): IButtonCore[] {
    return fromSet(this[p._buttons]);
  }

  protected [p._buttons]: Set<IButtonCore>;

  public add(data: IButtonCore) {
    return this[p._buttons].add(data);
  }

  /**
   * @title Description
   */
  public get [p.subTitle](): string {
    return this[p._subTitle];
  }

  protected [p._subTitle]: string;

  /**
   * @title Type
   * @hidden
   */
  public override get [p.type](): ACTION {
    return this[p._type];
  }

  protected override [p._type]: ACTION;

  // public add(): ActionCore {
  //   super.add();
  //   if (!this.questionnaire.actions.some((a) => a === this || a.id === this.id)) {
  //     this.questionnaire.actions.push(this);
  //   }
  //   return this;
  // }
}
