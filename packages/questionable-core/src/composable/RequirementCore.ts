/* eslint-disable import/no-cycle */
import { addToPool, existsInPool, TCollectable }   from '../constructable/types';
import { IRequirementCore }                        from '../survey/IRequirementCore';
import { REQUIREMENT_TYPE, TRequirementType }      from '../util/enums';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore }                  from '../util/types';
import { RefCore }                                 from './RefCore';
import { ResponseCore }                            from './ResponseCore';

export class RequirementCore extends RefCore implements IRequirementCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.requirement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.requirement, ClassList.ref], obj);
  }

  public static override create(data: Partial<RequirementCore>) {
    if (data instanceof RequirementCore) {
      return data;
    }
    return new RequirementCore(data);
  }

  public static override createOptional(data?: Partial<RequirementCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return RequirementCore.create(data);
  }

  #ageCalc;

  #explanation;

  #maxAge;

  #minAge;

  #responses;

  #type: TRequirementType;

  constructor(data: Partial<RequirementCore>) {
    super(data);
    this.#ageCalc     = data.ageCalc || (() => true);
    this.#explanation = data.explanation || '';
    this.#maxAge      = data.maxAge;
    this.#minAge      = data.minAge;
    this.#responses   = data.responses?.map((q) => new ResponseCore(q)) || [];
    this.#type        = data.type || REQUIREMENT_TYPE.NON_REQUIRED;
  }

  get ageCalc(): TAgeCalcCore | undefined {
    return this.#ageCalc;
  }

  get explanation(): string {
    return this.#explanation;
  }

  get maxAge(): TAgeCore | undefined {
    return this.#maxAge;
  }

  get minAge(): TAgeCore | undefined {
    return this.#minAge;
  }

  get responses(): ResponseCore[] {
    return this.#responses;
  }

  get type(): TRequirementType {
    return this.#type;
  }

  public existsIn(data: TCollectable): boolean {
    return existsInPool(data, this);
  }

  public add(data: TCollectable): RequirementCore {
    addToPool(data, this);
    if (data instanceof ResponseCore) {
      (data as ResponseCore).add(this);
    }
    return this;
  }
}
