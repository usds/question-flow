import { noop } from 'lodash';
import {
  RequirementCore,
  AnswerCore,
  BranchCore,
  PageCore,
  SectionCore,
  ActionCore,
  ResponseCore,
  QuestionCore,
  RefCore,
} from '../composable';
import { ResultCore }  from '../composable/ResultCore';
import { TInstanceOf } from './instanceOf';

export class Factories {
  gen<T extends RequirementCore>(
    cls: TInstanceOf,
    data: T[],
  ): RequirementCore[];

  gen<T extends ResultCore>(cls: TInstanceOf, data: T[]): ResultCore[];

  gen<T extends AnswerCore>(cls: TInstanceOf, data: T[]): AnswerCore[];

  gen<T extends BranchCore>(cls: TInstanceOf, data: T[]): BranchCore[];

  gen<T extends PageCore>(cls: TInstanceOf, data: T[]): PageCore[];

  gen<T extends SectionCore>(cls: TInstanceOf, data: T[]): SectionCore[];

  gen<T extends ActionCore>(cls: TInstanceOf, data: T[]): ActionCore[];

  gen<T extends ResponseCore>(cls: TInstanceOf, data: T[]): ResponseCore[];

  gen<T extends QuestionCore>(cls: TInstanceOf, data: T[]): QuestionCore[];

  gen<T extends RefCore>(cls: TInstanceOf, inp: T[]): RefCore[] {
    noop(cls, inp);
    throw new Error('Not implemented');
  }

  genOne<T extends RequirementCore>(cls: TInstanceOf, data: T): RequirementCore;

  genOne<T extends ResultCore>(cls: TInstanceOf, data: T): ResultCore;

  genOne<T extends AnswerCore>(cls: TInstanceOf, data: T): AnswerCore;

  genOne<T extends BranchCore>(cls: TInstanceOf, data: T): BranchCore;

  genOne<T extends PageCore>(cls: TInstanceOf, data: T): PageCore;

  genOne<T extends SectionCore>(cls: TInstanceOf, data: T): SectionCore;

  genOne<T extends ActionCore>(cls: TInstanceOf, data: T): ActionCore;

  genOne<T extends ResponseCore>(cls: TInstanceOf, data: T): ResponseCore;

  genOne<T extends QuestionCore>(cls: TInstanceOf, data: T): QuestionCore;

  genOne<T extends RefCore>(cls: TInstanceOf, inp: T): RefCore {
    noop(cls, inp);
    return inp;
    // const data = merge(this.#defaults, inp);
    // switch (cls) {
    //   case ClassList.action:
    //     return this.addAction(data as ActionCore);
    //   case ClassList.answer:
    //     return this.addAnswer(data as AnswerCore);
    //   case ClassList.branch:
    //     return this.addBranch(data as BranchCore);
    //   case ClassList.page:
    //     return this.addPage(data as PageCore);
    //   case ClassList.question:
    //     return this.addQuestion(data as QuestionCore);
    //   case ClassList.requirement:
    //     return this.addRequirement(data as RequirementCore);
    //   case ClassList.response:
    //     return this.addResponse(data as ResponseCore);
    //   case ClassList.result:
    //     return this.addResult(data as ResultCore);
    //   case ClassList.section:
    //     return this.addSection(data as SectionCore);
    //   default:
    //     return this.addRef(inp);
    // }
  }
}
