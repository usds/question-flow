import { merge }                                   from 'lodash';
import { IQuestionConfigCore }                     from '../../survey/IQuestionableConfigCore';
import { BaseCore }                                from '../BaseCore';
import { ClassList, TInstanceOf, checkInstanceOf } from '../../util/instanceOf';
/**
 * Configuration for question display
 */
export class QuestionConfigCore  extends BaseCore implements IQuestionConfigCore {
  get __core() {
    return 'question';
  }

  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<QuestionConfigCore> = {}) {
    if (data instanceof QuestionConfigCore) {
      return data;
    }
    return new QuestionConfigCore(data);
  }

  constructor(data: Partial<QuestionConfigCore> = {}) {
    super(data);
    merge(this, data);
  }

  /**
   * Determines whether to show border on radios and checkboxes
   *
   * @title Show Answer Border
   * @default true
   */
  showAnswerBorder?: boolean | undefined;
}
