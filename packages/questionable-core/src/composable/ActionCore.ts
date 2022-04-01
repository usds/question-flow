/* eslint-disable import/no-cycle */
import { merge }       from 'lodash';
import { IActionCore } from '../survey/IActionCore';
import { IButtonCore } from '../survey/IButtonCore';
import { ACTION }      from '../util/enums';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';

const defaults = {
  buttons:  [],
  label:    '',
  order:    0,
  subTitle: '',
  title:    '',
  type:     ACTION.DEFAULT,
};

export class ActionCore extends ComposableCore implements IActionCore {
  protected static override _name = getClassName(PREFIX.ACTION);

  protected override instanceOfCheck: TInstanceOf = ActionCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ActionCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<IActionCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, defaults);
    merge(this, data);
  }

  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  buttons!: IButtonCore[];

  /**
   * @title Label
   */
  label!: string;

  /**
   * @title Description
   */
  subTitle?: string;

  /**
   * @title Type
   * @hidden
   */
  type!: ACTION;
}
