/* eslint-disable import/no-cycle */
import { kebabCase }                                     from 'lodash';
import { addToPool, existsInPool }                       from '../constructable/lib/pools';
import { TCollectable }                                  from '../metadata/types/TCollectable';
import { PAGE_TYPE }                                     from '../metadata/properties/type/TPageType';
import { QUESTION_TYPE }                                 from '../metadata/properties/type/TQuestionType';
import { IStepCore }                                     from '../metadata/IStepCore';
import { STEP_TYPE, TStepType }                          from '../metadata/properties/type/TStepType';
import { isEnum }                                        from '../lib/enums';
import { matches }                                       from '../lib/helpers';
import {
  checkInstanceOf, ClassList, EClassList, TInstanceOf,
} from '../lib/instanceOf';
import { TPointerDirection } from '../lib/types';
import { RefCore }           from './RefCore';
import { RequirementCore }   from './RequirementCore';
import { SectionCore }       from './SectionCore';
import { classCreate }       from '../constructable/Factory';

export class StepCore extends RefCore implements IStepCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.step;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf({ names: [ClassList.step, ClassList.ref], obj });
  }

  public static override create(data: Partial<StepCore>) {
    if (data instanceof StepCore) {
      return data;
    }
    return new StepCore(data);
  }

  #entryRequirements: RequirementCore[];

  #exitRequirements: RequirementCore[];

  #footer: string;

  #info: string;

  #internalNotes: string;

  #order: number;

  #section: SectionCore | undefined;

  #subTitle: string;

  #type: TStepType;

  constructor(data: Partial<StepCore>) {
    super(data);
    this.#entryRequirements = data.entryRequirements?.map((itm) => classCreate(EClassList.REQUIREMENT, itm)) || [];
    this.#exitRequirements  = data.exitRequirements?.map((itm) => classCreate(EClassList.REQUIREMENT, itm)) || [];
    const type: TStepType   = (!data.type || `${data.type}` === `${STEP_TYPE.DEFAULT}`) ? STEP_TYPE.DEFAULT : data.type;
    this.#type              = type;
    this.#footer            = data.footer || '';
    this.#info              = data.info || '';
    this.#internalNotes     = data.internalNotes || '';
    this.#order             = data.order || 0;
    this.#section           = classCreate(EClassList.SECTION, data.section, true);
    this.#subTitle          = data.subTitle || '';
  }

  public toString() {
    return this.id;
  }

  public get entryRequirements(): RequirementCore[] {
    return this.#entryRequirements;
  }

  public get exitRequirements(): RequirementCore[] {
    return this.#exitRequirements;
  }

  public get footer(): string {
    return this.#footer;
  }

  public get info(): string {
    return this.#info;
  }

  public get internalNotes(): string {
    return this.#internalNotes;
  }

  public get order(): number {
    return this.#order;
  }

  public get section(): SectionCore | undefined {
    return this.#section;
  }

  public get subTitle(): string {
    return this.#subTitle;
  }

  public get type(): TStepType {
    return this.#type;
  }

  public getFieldSetName(): string {
    return kebabCase(this.title);
  }

  public getDomId(answer: string): string {
    const name = this.getFieldSetName();
    return `${name}-${kebabCase(answer)}`;
  }

  public getStepType() {
    if (isEnum({ enm: QUESTION_TYPE, value: this.type })) {
      return 'question';
    }
    if (isEnum({ enm: PAGE_TYPE, value: this.type })) {
      return 'page';
    }
    return 'unknown';
  }

  public existsIn(data: TCollectable, direction?: TPointerDirection): boolean {
    if (data instanceof RequirementCore) {
      if (direction === 'out') {
        return this.#exitRequirements.some(
          (q) => q === data || matches(q.title, data.title),
        );
      }
      return this.#entryRequirements.some(
        (q) => q === data || matches(q.title, data.title),
      );
    }
    return existsInPool(data, this);
  }

  public add(data: TCollectable, direction?: TPointerDirection): StepCore {
    const exists = this.existsIn(data, direction);
    if (exists) {
      return this;
    }
    if (data instanceof RequirementCore) {
      if (direction === 'out') {
        this.#exitRequirements.push(data);
      } else {
        this.#entryRequirements.push(data);
      }
    }
    addToPool(data, this);
    return this;
  }
}
