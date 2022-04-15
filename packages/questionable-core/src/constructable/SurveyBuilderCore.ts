/* eslint-disable */
import {
  ActionCore as Action,
  AnswerCore as Answer,
  BaseCore as Base,
  BranchCore as Branch,
  PageCore as Page,
  PagesCore as Pages,
  QuestionableConfigCore as Config,
  QuestionCore as Question,
  QuestionnaireCore as Questionnaire,
  RefCore as Ref,
  RequirementCore as Requirement,
  ResponseCore as Response,
  ResultCore as Result,
  SectionCore as Section,
  TCtor,
} from '../composable';
import { Factory } from './Factory';
import { ClassList } from '../util';
import { ACTION, MODE } from '../util/enums';
import { merge } from '../util/merge';

type TBuilderDefaults = {
  section?: Section;
};

export class SurveyBuilder {
  #actions: Action[] = [];
  #answers: Answer[] = [];
  #branches: Branch[] = [];
  #config: Config;
  #defaults: TBuilderDefaults;
  #page: Page[] = [];
  #pages: Pages = new Pages();
  #questions: Question[] = [];
  #refs: Ref[] = [];
  #requirements: Requirement[] = [];
  #responses: Response[] = [];
  #results: Result[] = [];
  #sections: Section[] = [];

  constructor(data: Partial<Questionnaire> = {}) {
    this.#actions = data.actions || [];
    this.#branches = data.branches || [];
    this.#config = data.config || new Config({ mode: MODE.VIEW });
    this.#defaults = {};
    this.#pages = data.pages || new Pages();
    this.#questions = data.questions || [];
    this.#refs = [];
    this.#sections = data.sections || [];
  }

  setDefaults(data: Section | Branch) {
    if (data instanceof Section) {
      return merge(this.#defaults.section, data);
    }
  }

  addActions(data: Partial<Action>[]) {
    return data.map((d) => this.#addAction(d));
  }
  #addAction(inp: Partial<Action>): Action {
    const data = merge(
      {
        type: ACTION.NONE,
        label: inp.title,
      },
      inp,
    );
    return Factory.addOne(Action, data,this.#actions);
  }

  addAnswers(data: Partial<Answer>[]) {
    return data.map((d) => this.#addAnswer(d));
  }
  #addAnswer(data: Partial<Answer>): Answer {
    return Factory.addOne(Answer, data, this.#answers);
  }

  addPages(data: Partial<Page>[]) {
    return data.map((d) => this.#addPage(d));
  }
  #addPage(data: Partial<Page>): Page {
    return Factory.addOne(Page, data, this.#page);
  }

  addBranches(data: Partial<Branch>[]) {
    return data.map((d) => this.#addBranch(d));
  }
  #addBranch(data: Partial<Branch>): Branch {
    return Factory.addOne(Branch, data, this.#branches);
  }

  addQuestions(data: Partial<Question>[]) {
    return data.map((d) => this.#addQuestion(d));
  }
  #addQuestion(data: Partial<Question>): Question {
    return Factory.addOne(Question, data, this.#questions);
  }

  addRefs(data: Partial<Ref>[]) {
    return data.map((d) => this.#addRef(d));
  }
  #addRef(data: Partial<Ref>): Ref {
    return Factory.addOne(Ref, data, this.#refs);
  }

  addResults(data: Partial<Result>[]) {
    return data.map((d) => this.#addResult(d));
  }
  #addResult(data: Partial<Result>): Result {
    return Factory.addOne(Result, data, this.#results);
  }

  addRequirements(data: Partial<Requirement>[]) {
    return data.map((d) => this.#addRequirement(d));
  }
  #addRequirement(data: Partial<Requirement>): Requirement {
    return Factory.addOne(Requirement,data, this.#requirements);
  }

  addResponses(data: Partial<Response>[]) {
    return data.map((d) => this.#addResponse(d));
  }
  #addResponse(data: Partial<Response>): Response {
    return Factory.addOne(Response,data, this.#responses);
  }

  addSections(data: Partial<Section>[]) {
    return data.map((d) => this.#addSection(d));
  }
  #addSection(data: Partial<Section>): Section {
    return Factory.addOne(Section, data, this.#sections);
  }

  add<T extends Base>(c: TCtor<T>, inp: Partial<T>[]) {
    return inp.map((ic) => this.#addOne(c, ic));
  }

  #addOne<T extends Base>(c: TCtor<T>, inp: Partial<T>): T {
    const nu = new c(inp);
    if (nu instanceof Action || nu.instanceOfCheck === ClassList.action) {
      this.#addAction(nu);
    } else if (
      nu instanceof Section ||
      nu.instanceOfCheck === ClassList.section
    ) {
      this.#addSection(nu);
    } else if (
      nu instanceof Question ||
      nu.instanceOfCheck === ClassList.question
    ) {
      this.#addQuestion(nu);
    } else if (nu instanceof Page || nu.instanceOfCheck === ClassList.page) {
      this.#addPage(nu);
    } else if (
      nu instanceof Branch ||
      nu.instanceOfCheck === ClassList.branch
    ) {
      this.#addBranch(nu);
    } else if (
      nu instanceof Result ||
      nu.instanceOfCheck === ClassList.result
    ) {
      this.#addResult(nu);
    } else if (nu instanceof Config) {
      this.#config = nu;
    } else if (
      nu instanceof Response ||
      nu.instanceOfCheck === ClassList.response
    ) {
      this.#addResponse(nu);
    } else if (
      nu instanceof Requirement ||
      nu.instanceOfCheck === ClassList.requirement
    ) {
      this.#addRequirement(nu);
    } else if (nu instanceof Pages) {
      this.#pages = nu;
    } else if (
      nu instanceof Answer ||
      nu.instanceOfCheck === ClassList.answer
    ) {
      this.#addAnswer(nu);
    } else if (nu instanceof Ref || nu.instanceOfCheck === ClassList.ref) {
      this.#addRef(nu);
    }
    return nu;
  }

  init<Q extends Questionnaire>(c: TCtor<Q>): Q {
    const q = {
      actions: this.#actions,
      branches: this.#branches,
      config: this.#config,
      header: '',
      pages: this.#pages,
      questions: this.#questions,
      results: this.#results,
      sections: this.#sections,
    } as Partial<Q>;
    const questionnaire = new c(q);
    return questionnaire;
  }
}
