/* eslint-disable import/no-cycle */
import { addToPool, existsInPool }                 from '../constructable/types';
import { IBranchCore }                             from '../metadata/IBranchCore';
import { BRANCH_TYPE, TBranchType }                from '../metadata/properties/type/TBranchType';
import { checkInstanceOf, ClassList, TInstanceOf } from '../lib/instanceOf';
import { QuestionCore }                            from './QuestionCore';
import { RefCore }                                 from './RefCore';
import { SectionCore }                             from './SectionCore';

export class BranchCore extends RefCore implements IBranchCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.branch;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.branch, ClassList.ref], obj);
  }

  public static override create(data: Partial<BranchCore>) {
    if (data instanceof BranchCore) {
      return data;
    }
    return new BranchCore(data);
  }

  public static override createOptional(data?: Partial<BranchCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return BranchCore.create(data);
  }

  #questions;

  #sections;

  #type: TBranchType;

  constructor(data: Partial<BranchCore>) {
    super(data);
    this.#questions = data.questions?.map((q) => QuestionCore.create(q)) || [];
    this.#sections  = data.sections?.map((q) => SectionCore.create(q)) || [];
    this.#type      = data.type || BRANCH_TYPE.LINEAR;
  }

  public get questions(): QuestionCore[] {
    return this.#questions;
  }

  public get sections(): SectionCore[] {
    return this.#sections;
  }

  public get type(): TBranchType {
    return this.#type;
  }

  public existsIn(data: SectionCore | QuestionCore): boolean {
    return existsInPool(data, this);
  }

  public add(data: SectionCore | QuestionCore): BranchCore {
    data.branch = this; // eslint-disable-line no-param-reassign
    addToPool(data, this);
    return this;
  }
}
