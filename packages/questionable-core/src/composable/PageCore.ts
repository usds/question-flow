/* eslint-disable import/no-cycle */
import { IPageCore } from '../survey/IStepCore';
import { PAGE_TYPE } from '../util/enums';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { StepCore } from './StepCore';

const className = ClassList.page;
export class PageCore extends StepCore implements IPageCore {
  public override get instanceOfCheck(): TInstanceOf {
    return className;
  }

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
      this.#type = PAGE_TYPE.DEFAULT;
    } else {
      this.#type = data.type;
    }
    this.#body          = data.body || '';
    this.#bodyHeader    = data.bodyHeader || '';
    this.#bodySubHeader = data.bodySubHeader || '';
  }

  #body: string;

  public get body() {
    return this.#body;
  }

  #bodyHeader: string;

  public get bodyHeader() {
    return this.#bodyHeader;
  }

  #bodySubHeader: string;

  public get bodySubHeader() {
    return this.#bodySubHeader;
  }

  #type: PAGE_TYPE;

  public override get type() {
    return this.#type;
  }
}