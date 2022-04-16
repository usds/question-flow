/* eslint-disable import/no-cycle */
import { TCollectable }                            from '../constructable/types';
import { IPageCore }                               from '../survey/IStepCore';
import { TPointerDirection }                       from '../util/types';
import { PAGE_TYPE, TPageType }                    from '../util/enums';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { StepCore }                                from './StepCore';

const className = ClassList.page;
export class PageCore extends StepCore implements IPageCore {
  public override get instanceOfCheck(): TInstanceOf {
    return className;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, ClassList.page], obj);
  }

  public static override create(data: Partial<PageCore>) {
    if (data instanceof PageCore) {
      return data;
    }
    return new PageCore(data);
  }

  public static override createOptional(data?: Partial<PageCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return PageCore.create(data);
  }

  #display = true;

  constructor(data: Partial<PageCore>) {
    super(data);

    const type          = (!data.type || `${data.type}` === `${PAGE_TYPE.DEFAULT}`) ? PAGE_TYPE.LANDING : data.type;
    this.#type          = type;
    this.#body          = data.body || '';
    this.#bodyHeader    = data.bodyHeader || '';
    this.#bodySubHeader = data.bodySubHeader || '';
    this.#display       = !(data.display === false);
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

  public get display() {
    return this.#display;
  }

  #type: TPageType;

  public override get type() {
    return this.#type;
  }

  public existsIn(data: TCollectable, direction?: TPointerDirection): boolean {
    return super.existsIn(data, direction);
  }

  public add(data: TCollectable, direction?: TPointerDirection): PageCore {
    super.add(data, direction);
    return this;
  }
}
