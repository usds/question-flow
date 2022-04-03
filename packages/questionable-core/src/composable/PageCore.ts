/* eslint-disable import/no-cycle */
import { merge }     from 'lodash';
import { IPageCore } from '../survey/IStepCore';
import { PAGE_TYPE } from '../util/enums';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { StepCore }                from './StepCore';
import {
  EPageCoreProperties as p,
  type TPageCoreProperties as t,
} from '../metadata/MPage';

const className = ClassList.page;
export class PageCore extends StepCore implements IPageCore {
  public static override readonly [p._name] = className;

  public override readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, ClassList.page], obj);
  }

  public static override create(data: Partial<IPageCore> = {}) {
    if (data instanceof PageCore) {
      return data;
    }
    return new PageCore(data);
  }

  constructor(data: Partial<IPageCore> = {}) {
    super(data);

    if (!data.type || `${data.type}` === `${PAGE_TYPE.DEFAULT}`) {
      this[p._type] = PAGE_TYPE.DEFAULT;
    } else {
      this[p._type] = data.type;
    }
    this[p._body]          = data.body || '';
    this[p._bodyHeader]    = data.bodyHeader || '';
    this[p._bodySubHeader] = data.bodySubHeader || '';
  }

  private [p._body]: string;

  public get [p.body]() {
    return this[p._body];
  }

  private [p._bodyHeader]: string;

  public get [p.bodyHeader]() {
    return this[p._bodyHeader];
  }

  private [p._bodySubHeader]: string;

  public get [p.bodySubHeader]() {
    return this[p._bodySubHeader];
  }

  private [p._type]: PAGE_TYPE;

  public override get [p.type]() {
    return this[p._type];
  }
}
