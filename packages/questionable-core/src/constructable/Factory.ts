import { isEmpty, merge } from 'lodash';
import {
  ActionCore as Action,
  AnswerCore as Answer,
  BaseCore as Base,
  BranchCore as Branch,
  ButtonCore,
  create,
  PageCore as Page,
  PagesCore as Pages,
  QuestionableConfigCore as Config,
  QuestionCore as Question,
  RefCore as Ref,
  RequirementCore as Requirement,
  ResponseCore as Response,
  ResultCore as Result,
  SectionCore as Section,
  TCtor,
} from '../composable/_exports';
import { ACTION_TYPE }     from '../metadata/properties/type/TActionType';
import {
  ClassList, EClassList,
} from '../lib/instanceOf';

export abstract class Factory {
  public static addActions(data: Partial<Action>[]) {
    return data.map((d) => Factory._addAction(d));
  }

  private static _addAction(inp: Partial<Action>): Action {
    if (inp instanceof Action) {
      return inp;
    }
    const data = merge(
      {
        label: inp.title,
        type:  ACTION_TYPE.NONE,
      },
      inp,
    );
    return create(Action, data);
  }

  public static addAnswers(data: Partial<Answer>[]) {
    return data.map((d) => Factory._addAnswer(d));
  }

  private static _addAnswer(data: Partial<Answer>): Answer {
    return (data instanceof Answer) ? data : new Answer(data);
  }

  public static addPages(data: Partial<Page>[]) {
    return data.map((d) => Factory._addPage(d));
  }

  private static _addPage(data: Partial<Page>): Page {
    return (data instanceof Page) ? data : new Page(data);
  }

  public static addBranches(data: Partial<Branch>[]) {
    return data.map((d) => Factory._addBranch(d));
  }

  private static _addBranch(data: Partial<Branch>): Branch {
    return (data instanceof Branch) ? data : new Branch(data);
  }

  public static addQuestions(data: Partial<Question>[]) {
    return data.map((d) => Factory._addQuestion(d));
  }

  private static _addQuestion(data: Partial<Question>): Question {
    return (data instanceof Question) ? data : new Question(data);
  }

  public static addRefs(data: Partial<Ref>[]) {
    return data.map((d) => Factory._addRef(d));
  }

  private static _addRef(data: Partial<Ref>): Ref {
    return (data instanceof Ref) ? data :  new Ref(data);
  }

  public static addResults(data: Partial<Result>[]) {
    return data.map((d) => Factory._addResult(d));
  }

  private static _addResult(data: Partial<Result>): Result {
    return (data instanceof Result) ? data : new Result(data);
  }

  public static addRequirements(data: Partial<Requirement>[]) {
    return data.map((d) => Factory._addRequirement(d));
  }

  private static _addRequirement(data: Partial<Requirement>): Requirement {
    return (data instanceof Requirement) ? data : new Requirement(data);
  }

  public static addResponses(data: Partial<Response>[]) {
    return data.map((d) => Factory._addResponse(d));
  }

  private static _addResponse(data: Partial<Response>): Response {
    return (data instanceof Response) ? data : new Response(data);
  }

  public static addSections(data: Partial<Section>[]) {
    return data.map((d) => Factory._addSection(d));
  }

  private static _addSection(data: Partial<Section>): Section {
    return (data instanceof Section) ? data : new Section(data);
  }

  public static add<T extends Base>(c: TCtor<T>, inp: Partial<T>[], out: Partial<T>[] = []) {
    return inp.map((ic) => Factory.addOne(c, ic, out));
  }

  public static addOne<T extends Base>(Ctor: TCtor<T>, inp: Partial<T>, out: Partial<T>[] = []): T {
    const ret = Factory._addOne<T>(Ctor, inp);
    if (out) {
      out.push(ret);
    }
    return ret;
  }

  private static _addOne<T extends Base>(Ctor: TCtor<T>, inp: Partial<T>): T { // eslint-disable-line sonarjs/cognitive-complexity
    const nu = new Ctor(inp);
    if (nu instanceof Action || nu.instanceOfCheck === ClassList.action) {
      Factory._addAction(nu);
    } else if (
      nu instanceof Section
      || nu.instanceOfCheck === ClassList.section
    ) {
      Factory._addSection(nu);
    } else if (
      nu instanceof Question
      || nu.instanceOfCheck === ClassList.question
    ) {
      Factory._addQuestion(nu);
    } else if (nu instanceof Page || nu.instanceOfCheck === ClassList.page) {
      Factory._addPage(nu);
    } else if (
      nu instanceof Branch
      || nu.instanceOfCheck === ClassList.branch
    ) {
      Factory._addBranch(nu);
    } else if (
      nu instanceof Result
      || nu.instanceOfCheck === ClassList.result
    ) {
      Factory._addResult(nu);
    } else if (nu instanceof Config) {
      // Nothing yet
    } else if (
      nu instanceof Response
      || nu.instanceOfCheck === ClassList.response
    ) {
      Factory._addResponse(nu);
    } else if (
      nu instanceof Requirement
      || nu.instanceOfCheck === ClassList.requirement
    ) {
      Factory._addRequirement(nu);
    } else if (nu instanceof Pages) {
      // Nothing yet
    } else if (
      nu instanceof Answer
      || nu.instanceOfCheck === ClassList.answer
    ) {
      Factory._addAnswer(nu);
    } else if (nu instanceof Ref || nu.instanceOfCheck === ClassList.ref) {
      Factory._addRef(nu);
    }
    return nu;
  }

  public static classCreate<T extends EClassList.ACTION>(c: T, data: Partial<Action>): Action;

  public static classCreate<T extends EClassList.ACTION>
    (c: T, data: Partial<Action> | undefined, optional: boolean): Action | undefined;

  public static classCreate<T extends EClassList.ANSWER>(c: T, data: Partial<Answer>): Answer;

  public static classCreate<T extends EClassList.BRANCH>(c: T, data: Partial<Branch>): Branch;

  public static classCreate<T extends EClassList.BRANCH>(c: T,
    data: Partial<Branch> | undefined, optional: boolean): Branch | undefined;

  public static classCreate<T extends EClassList.BUTTON>(c: T, data: Partial<ButtonCore>): ButtonCore;

  public static classCreate<T extends EClassList.PAGE>(c: T, data: Partial<Page>): Page;

  public static classCreate<T extends EClassList.QUESTION>(c: T, data: Partial<Question>): Question;

  public static classCreate<T extends EClassList.QUESTION>
    (c: T, data: Partial<Question> | undefined, optional: boolean): Question | undefined;

  public static classCreate<T extends EClassList.REQUIREMENT>(c: T, data: Partial<Requirement>): Requirement;

  public static classCreate<T extends EClassList.REQUIREMENT>
    (c: T, data: Partial<Requirement>| undefined, optional: boolean): Requirement|undefined;

  public static classCreate<T extends EClassList.RESPONSE>(c: T, data: Partial<Response>): Response;

  public static classCreate<T extends EClassList.RESULT>(c: T, data: Partial<Result>): Result;

  public static classCreate<T extends EClassList.SECTION>(c: T, data: Partial<Section>): Section;

  public static classCreate<T extends EClassList.SECTION>
    (c: T, data: Partial<Section> | undefined, optional: boolean): Section | undefined;

  public static classCreate<T extends EClassList>(c: T, data: unknown, optional = false) {
    if (optional && isEmpty(data)) {
      return undefined;
    }
    switch (c) {
      case EClassList.ACTION:
        return Factory._addAction(data as Partial<Action>) as Action;
      case EClassList.ANSWER:
        return Factory._addAnswer(data as Partial<Answer>) as Answer;
      case EClassList.BRANCH:
        return Factory._addBranch(data as Partial<Branch>) as Branch;
      case EClassList.QUESTION:
        return Factory._addQuestion(data as Partial<Question>) as Question;
      case EClassList.SECTION:
        return Factory._addSection(data as Partial<Section>) as Section;
      default:
        return Factory._addRef(data as Partial<Ref>) as Ref;
    }
  }
}

export const {
  classCreate,
} = Factory;
