/* eslint-disable */
import {
  ActionCore,
  AnswerCore,
  BranchCore,
  PageCore,
  PagesCore,
  QuestionableConfigCore,
  QuestionCore,
  QuestionnaireCore,
  RefCore,
  RequirementCore,
  ResponseCore,
  ResultCore,
  SectionCore,
} from '../composable';
import { ClassList, TInstanceOf } from '../util';
import { ACTION, MODE } from '../util/enums';
import { log } from '../util/logger';
import { merge } from '../util/merge';

type TBuilderDefaults = {
  section?: SectionCore;
};

export class SurveyBuilder {
  #questionnaire?: QuestionnaireCore;

  #refs: RefCore[] = [];

  #actions: ActionCore[] = [];

  #answers: AnswerCore[] = [];

  #branches: BranchCore[] = [];

  #config: QuestionableConfigCore;

  #page: PageCore[] = [];

  #pages: PagesCore = new PagesCore();

  #results: ResultCore[] = [];

  #requirements: RequirementCore[] = [];

  #responses: ResponseCore[] = [];

  #questions: QuestionCore[] = [];

  #sections: SectionCore[] = [];

  #defaults: TBuilderDefaults;

  constructor(data: Partial<QuestionnaireCore> = {}) {
    // this.#questionnaire = QuestionnaireCore.create(data);
    this.#refs = [];
    log(data);
    this.#defaults = {};
    this.#config = new QuestionableConfigCore({ mode: MODE.VIEW });
  }

  setDefaults(data: SectionCore | BranchCore) {
    if (data instanceof SectionCore) {
      return merge(this.#defaults.section, data);
    }
  }

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
    return inp.map((datum) => {
      const data = merge(this.#defaults, datum);
      return this.genOne(cls, data);
    });
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
    const data = merge(this.#defaults, inp);
    switch (cls) {
      case ClassList.action:
        return this.addAction(data as ActionCore);
      case ClassList.answer:
        return this.addAnswer(data as AnswerCore);
      case ClassList.branch:
        return this.addBranch(data as BranchCore);
      case ClassList.page:
        return this.addPage(data as PageCore);
      case ClassList.question:
        return this.addQuestion(data as QuestionCore);
      case ClassList.requirement:
        return this.addRequirement(data as RequirementCore);
      case ClassList.response:
        return this.addResponse(data as ResponseCore);
      case ClassList.result:
        return this.addResult(data as ResultCore);
      case ClassList.section:
        return this.addSection(data as SectionCore);
      default:
        return this.addRef(inp);
    }
  }

  addActions(data: Partial<ActionCore>[]) {
    return data.map((d) => this.addAction(d));
  }
  addAction(inp: Partial<ActionCore>): ActionCore {
    const data = merge(
      {
        type: ACTION.NONE,
        label: inp.title,
      },
      inp,
    );
    const ret = new ActionCore(data);
    this.#actions.push(ret);
    return ret;
  }

  addAnswers(data: Partial<AnswerCore>[]) {
    return data.map((d) => this.addAnswer(d));
  }
  addAnswer(data: Partial<AnswerCore>): AnswerCore {
    const ret = new AnswerCore(data);
    this.#answers.push(ret);
    return ret;
  }

  addPages(data: Partial<PageCore>[]) {
    return data.map((d) => this.addPage(d));
  }
  addPage(data: Partial<PageCore>): PageCore {
    const ret = new PageCore(data);
    this.#page.push(ret);
    return ret;
  }

  addBranches(data: Partial<BranchCore>[]) {
    return data.map((d) => this.addBranch(d));
  }
  addBranch(data: Partial<BranchCore>): BranchCore {
    const ret = new BranchCore(data);
    this.#branches.push(ret);
    return ret;
  }

  addQuestions(data: Partial<QuestionCore>[]) {
    return data.map((d) => this.addQuestion(d));
  }
  addQuestion(data: Partial<QuestionCore>): QuestionCore {
    const ret = new QuestionCore(data);
    this.#questions.push(ret);
    return ret;
  }

  addRefs(data: Partial<RefCore>[]) {
    return data.map((d) => this.addRef(d));
  }
  addRef(data: Partial<RefCore>): RefCore {
    const ret = new RefCore(data);
    this.#refs.push(ret);
    return ret;
  }

  addResults(data: Partial<ResultCore>[]) {
    return data.map((d) => this.addResult(d));
  }
  addResult(data: Partial<ResultCore>): ResultCore {
    const ret = new ResultCore(data);
    this.#results.push(ret);
    return ret;
  }

  addRequirements(data: Partial<RequirementCore>[]) {
    return data.map((d) => this.addRequirement(d));
  }
  addRequirement(data: Partial<RequirementCore>): RequirementCore {
    const ret = new RequirementCore(data);
    this.#requirements.push(ret);
    return ret;
  }

  addResponses(data: Partial<ResponseCore>[]) {
    return data.map((d) => this.addResponse(d));
  }
  addResponse(data: Partial<ResponseCore>): ResponseCore {
    const ret = new ResponseCore(data);
    this.#responses.push(ret);
    return ret;
  }

  addSections(data: Partial<SectionCore>[]) {
    return data.map((d) => this.addSection(d));
  }
  addSection(data: Partial<SectionCore>): SectionCore {
    const ret = new SectionCore(data);
    this.#sections.push(ret);
    return ret;
  }

  add<T>(c: { new (a: Partial<T>): T }, inp: Partial<T>[]) {
    return inp.map((ic) => this.#addOne(c, ic));
  }

  #addOne<T>(c: { new (a: Partial<T>): T }, inp: Partial<T>): T {
    const nu = new c(inp);
    if (nu instanceof ActionCore) {
      // this.#questionnaire.actions.push(nu);
      this.addAction(nu);
    } else if (nu instanceof SectionCore) {
      // this.#questionnaire.sections.push(nu);
      this.addSection(nu);
    } else if (nu instanceof QuestionCore) {
      // this.#questionnaire.questions.push(nu);
      this.addQuestion(nu);
    } else if (nu instanceof PageCore) {
      // this.#questionnaire.pages.set(nu);
      this.addPage(nu);
    } else if (nu instanceof BranchCore) {
      // this.#questionnaire.branches.push(nu);
      this.addBranch(nu);
    } else if (nu instanceof ResultCore) {
      // this.#questionnaire.results.push(nu);
      this.addResult(nu);
    } else if (nu instanceof QuestionableConfigCore) {
      // this.#questionnaire.set(nu);
      this.#config = nu;
    } else if (nu instanceof ResponseCore) {
      this.addResponse(nu);
    } else if (nu instanceof RequirementCore) {
      this.addRequirement(nu);
    } else if (nu instanceof PagesCore) {
      this.#pages = nu;
    } else if (nu instanceof AnswerCore) {
      this.addAnswer(nu);
    } else if (nu instanceof RefCore) {
      this.addRef(nu);
    }
    return nu;
  }

  init() {
    // this.#questionnaire.init();
    //log(this.#pages, this.#forms, this.#events, this.#config, this.#bases)
    this.#questionnaire = new QuestionnaireCore({
      actions: this.#actions,
      branches: this.#branches,
      config: this.#config,
      header: '',
      pages: this.#pages,
      questions: this.#questions,
      results: this.#results,
      sections: this.#sections,
    });
    return this.#questionnaire;
  }
}
