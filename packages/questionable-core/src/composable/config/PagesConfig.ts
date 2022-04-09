import { merge }                                   from 'lodash';
import { IPagesConfigCore }                        from '../../survey/IQuestionableConfigCore';
import { BaseCore }                                from '../BaseCore';
import { ClassList, TInstanceOf, checkInstanceOf } from '../../util/instanceOf';
/**
 * Configuration for Pages display
 */
export class PagesConfigCore  extends BaseCore implements IPagesConfigCore {
  get __core() {
    return 'pages';
  }

  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<PagesConfigCore> = {}) {
    if (data instanceof PagesConfigCore) {
      return data;
    }
    return new PagesConfigCore(data);
  }

  constructor(data: Partial<PagesConfigCore> = {}) {
    super(data);
    merge(this, data);
  }
}
