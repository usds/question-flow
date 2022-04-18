/* eslint-disable import/no-cycle */
import { addToPool, existsInPool } from '../constructable/lib/pools';
import {
  ISectionCore,
} from '../metadata/ISectionCore';
import {
  SECTION_TYPE,
  TSectionType,
} from '../metadata/properties/type/TSectionType';
import { PROGRESS_BAR_STATUS, TProgressBarStatusType }   from '../metadata/types/TProgressBarStatusType';
import {
  checkInstanceOf, ClassList, EClassList, TInstanceOf,
} from '../lib/instanceOf';
import { RefCore }         from './RefCore';
import { RequirementCore } from './RequirementCore';
import { classCreate }     from '../constructable/Factory';
import { TCollectable }    from '../metadata/types/TCollectable';

export class SectionCore extends RefCore implements ISectionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.section;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf({ names: [ClassList.section, ClassList.ref], obj });
  }

  public static override create(data: Partial<SectionCore>) {
    if (data instanceof SectionCore) {
      return data;
    }
    return new SectionCore(data);
  }

  public static override createOptional(data?: Partial<SectionCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return SectionCore.create(data);
  }

  #lastStep: number | undefined;

  #requirements: RequirementCore[];

  #status: TProgressBarStatusType;

  #order: number;

  #type: TSectionType;

  constructor(data: Partial<SectionCore>) {
    super(data);
    this.#requirements = data.requirements?.map((itm) => classCreate(EClassList.REQUIREMENT, itm)) || [];
    this.#lastStep     = data.lastStep;
    this.#order        = data.order || 0;
    this.#status       = data.status || PROGRESS_BAR_STATUS.INCOMPLETE;
    this.#type         = data.type || SECTION_TYPE.UNLOCKED;
  }

  public get requirements(): RequirementCore[] {
    return this.#requirements;
  }

  public get lastStep(): number | undefined {
    return this.#lastStep;
  }

  public set lastStep(val: number | undefined) {
    this.#lastStep = val;
  }

  public get order(): number {
    return this.#order;
  }

  public set order(val: number) {
    this.#order = val;
  }

  public get status(): TProgressBarStatusType {
    return this.#status;
  }

  public set status(val: TProgressBarStatusType) {
    this.#status = val;
  }

  public get type(): TSectionType {
    return this.#type;
  }

  public existsIn(data: TCollectable): boolean {
    return existsInPool(data, this);
  }

  public add(data: TCollectable): SectionCore {
    addToPool(data, this);
    return this;
  }
}
