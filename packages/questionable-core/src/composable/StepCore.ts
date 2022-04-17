/* eslint-disable import/no-cycle */
import { kebabCase }                               from 'lodash';
import { addToPool, existsInPool, TCollectable }   from '../constructable/types';
import { PAGE_TYPE }                               from '../survey/IPageCore';
import { QUESTION_TYPE }                           from '../survey/IQuestionCore';
import { IStepCore }                               from '../survey/IStepCore';
import { STEP_TYPE, TStepType }                    from '../survey/Unions';
import { isEnum }                                  from '../util/enums';
import { matches }                                 from '../util/helpers';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { TPointerDirection }                       from '../util/types';
import { RefCore }                                 from './RefCore';
import { RequirementCore }                         from './RequirementCore';
import { SectionCore }                             from './SectionCore';

export class StepCore extends RefCore implements IStepCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.step;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.step, ClassList.ref], obj);
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
    this.#entryRequirements = data.entryRequirements?.map((r) => RequirementCore.create(r)) || [];
    this.#exitRequirements  = data.exitRequirements?.map((r) => RequirementCore.create(r)) || [];
    const type: TStepType   = (!data.type || `${data.type}` === `${STEP_TYPE.DEFAULT}`) ? STEP_TYPE.DEFAULT : data.type;
    this.#type              = type;
    this.#footer            = data.footer || '';
    this.#info              = data.info || '';
    this.#internalNotes     = data.internalNotes || '';
    this.#order             = data.order || 0;
    this.#section           = SectionCore.createOptional(data.section);
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
    if (isEnum(QUESTION_TYPE, this.type)) {
      return 'question';
    }
    if (isEnum(PAGE_TYPE, this.type)) {
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
