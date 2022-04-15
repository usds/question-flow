import { merge } from 'lodash';
import {
  ActionCore as Action,
  AnswerCore as Answer,
  BaseCore as Base,
  BranchCore as Branch,
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
} from '../composable';
import { ACTION }    from '../util/enums';
import { ClassList } from '../util/instanceOf';

export abstract class Factory {
  public static addActions(data: Partial<Action>[]) {
    return data.map((d) => Factory._addAction(d));
  }

  private static _addAction(inp: Partial<Action>): Action {
    const data = merge(
      {
        label: inp.title,
        type:  ACTION.NONE,
      },
      inp,
    );
    return create(Action, data);
  }

  public static addAnswers(data: Partial<Answer>[]) {
    return data.map((d) => Factory._addAnswer(d));
  }

  private static _addAnswer(data: Partial<Answer>): Answer {
    return new Answer(data);
  }

  public static addPages(data: Partial<Page>[]) {
    return data.map((d) => Factory._addPage(d));
  }

  private static _addPage(data: Partial<Page>): Page {
    return new Page(data);
  }

  public static addBranches(data: Partial<Branch>[]) {
    return data.map((d) => Factory._addBranch(d));
  }

  private static _addBranch(data: Partial<Branch>): Branch {
    return new Branch(data);
  }

  public static addQuestions(data: Partial<Question>[]) {
    return data.map((d) => Factory._addQuestion(d));
  }

  private static _addQuestion(data: Partial<Question>): Question {
    return new Question(data);
  }

  public static addRefs(data: Partial<Ref>[]) {
    return data.map((d) => Factory._addRef(d));
  }

  private static _addRef(data: Partial<Ref>): Ref {
    return new Ref(data);
  }

  public static addResults(data: Partial<Result>[]) {
    return data.map((d) => Factory._addResult(d));
  }

  private static _addResult(data: Partial<Result>): Result {
    return new Result(data);
  }

  public static addRequirements(data: Partial<Requirement>[]) {
    return data.map((d) => Factory._addRequirement(d));
  }

  private static _addRequirement(data: Partial<Requirement>): Requirement {
    return new Requirement(data);
  }

  public static addResponses(data: Partial<Response>[]) {
    return data.map((d) => Factory._addResponse(d));
  }

  private static _addResponse(data: Partial<Response>): Response {
    return new Response(data);
  }

  public static addSections(data: Partial<Section>[]) {
    return data.map((d) => Factory._addSection(d));
  }

  private static _addSection(data: Partial<Section>): Section {
    return new Section(data);
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
}
