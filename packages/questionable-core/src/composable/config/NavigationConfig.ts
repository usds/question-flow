import { merge }                                   from 'lodash';
import { ButtonConfigCore }                        from './ButtonConfig';
import { BaseCore }                                from '../BaseCore';
import { ClassList, TInstanceOf, checkInstanceOf } from '../../lib/instanceOf';

/**
 * Configuration for navigation
 */
export class NavigationConfigCore extends BaseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<NavigationConfigCore> = {}) {
    if (data instanceof NavigationConfigCore) {
      return data;
    }
    return new NavigationConfigCore(data);
  }

  constructor(data: Partial<NavigationConfigCore> = {}) {
    super(data);
    merge(this, data);
    if (data.next) {
      this.next = ButtonConfigCore.create(data.next);
    }
    if (data.prev) {
      this.prev = ButtonConfigCore.create(data.prev);
    }
  }

  /**
   * Next/Forward button
   */
  next?: Partial<ButtonConfigCore> | undefined;

  /**
   * Previous/Go back button
   */
  prev?: Partial<ButtonConfigCore> | undefined;

  visible?: boolean | undefined;
}
