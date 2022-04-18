import { merge }                                   from 'lodash';
import { BaseCore }                                from '../BaseCore';
import { ClassList, TInstanceOf, checkInstanceOf } from '../../lib/instanceOf';
/**
 * Configuration for Pages display
 */
export class PagesConfigCore  extends BaseCore {
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

  visible?: boolean | undefined;
}
