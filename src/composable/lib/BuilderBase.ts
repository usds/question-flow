/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-classes-per-file */
import { merge }   from 'lodash';
import { IResult } from '../../survey/IResult';
import { TAge }    from '../../lib/types';
import {
  IRequirement,
  IResponse,
  IStep,
  IQuestion,
  IPage,
  ISection,
} from '../../survey/IStep';
import { QuestionAnswer }                      from './QuestionAnswer';
import { TStepType, QUESTION_TYPE, PAGE_TYPE } from '../../lib/enums';
import { NavButton }                           from './NavButton';

export abstract class BuilderBase {
  constructor(obj: Partial<BuilderBase> = {}) {
    merge(this, obj);
  }

  id!: string;

  requirements: Requirement[] = [];

  addRequirement(obj: Partial<Requirement>): Requirement {
    // let { id } = obj;
    // if (!id) {
    //   id = `${this.#sections.length + 1}`;
    // }
    // const existing = this.#sections.find((s) => s.id === id);
    // if (existing) {
    //   return existing;
    // }
    const requirement = merge(new Requirement(obj));
    this.requirements.push(requirement);
    return requirement;
  }
}

export class Requirement implements IRequirement {
  explanation?: string;

  maxAge?: TAge;

  minAge?: TAge;

  responses: Response[] = [];

  ageCalc?: (birthdate: string) => boolean;

  constructor(obj: Partial<Requirement>) {
    merge(this, obj);
    this.responses = this.responses || [];
  }

  addResponse(obj: Partial<Response>): Response {
    let { id } = obj;
    if (!id) {
      id = `${this.responses.length + 1}`;
    }

    const existing = this.responses.find((a) => a.id === id);
    if (existing) {
      throw new Error(`Response "${existing.id}" is already defined`);
    }
    this.responses = this.responses || [];

    const response = new Response(merge(obj, { id }));
    this.responses.push(response);
    return response;
  }
}

export class Response extends BuilderBase implements IResponse {
  answers: Partial<QuestionAnswer>[] = [];

  question!: Partial<Question>;

  constructor(obj: Partial<Response> = {}) {
    super(obj);
    merge(this, obj);
    this.answers = this.answers || [];
  }

  addAnswer(obj: Partial<QuestionAnswer>): QuestionAnswer {
    let { id } = obj;
    if (!id) {
      id = `${this.answers.length + 1}`;
    }

    const existing = this.answers.find((a) => a.id === id || a.title === obj.title);
    if (existing) {
      throw new Error(`Question "${existing.title}" is already defined`);
    }
    this.answers = this.answers || [];

    const answer = new QuestionAnswer(merge(obj, { id }));
    this.answers.push(answer);
    return answer;
  }
}

export class Result extends BuilderBase implements IResult {
  constructor(obj: Partial<Result>) {
    super(obj);
    merge(this, obj);
  }

  label!: string;

  match?: Requirement;

  name!: string;
}

export class Step extends BuilderBase implements IStep {
  constructor(obj: Partial<Step>) {
    super(obj);
    merge(this, obj);
    this.buttons = this.buttons || [];
  }

  buttons?: NavButton[] = [];

  footer?: string;

  info?: string;

  internalNotes?: string;

  section!: Partial<Section>;

  subTitle?: string;

  title!: string;

  type!: TStepType;

  addButton(obj: Partial<NavButton>): NavButton {
    if (obj.direction === undefined) {
      throw new Error('Button direction is required');
    }

    this.buttons = this.buttons || [];

    if (this.buttons.find((b) => b.direction === obj.direction)) {
      throw new Error(`Button direction ${obj.direction} is already defined`);
    }

    const button = new NavButton(obj);
    this.buttons.push(button);
    return button;
  }
}

export class Question extends Step implements IQuestion {
  constructor(obj: Partial<Question>) {
    super(obj);
    merge(this, obj);
    this.answers = this.answers || [];
  }

  answer?: string;

  answers: QuestionAnswer[] = [];

  type: QUESTION_TYPE = QUESTION_TYPE.UNKNOWN;

  addAnswer(obj: Partial<QuestionAnswer>): QuestionAnswer {
    let { id } = obj;
    if (!id) {
      id = `${this.answers.length + 1}`;
    }

    const existing = this.answers.find((a) => a.id === id || a.title === obj.title);
    if (existing) {
      throw new Error(`Question "${existing.title}" is already defined`);
    }
    this.answers = this.answers || [];

    const answer = new QuestionAnswer(merge(obj, { id }));
    this.answers.push(answer);
    return answer;
  }
}

export class Page extends Step implements IPage {
  constructor(obj: Partial<Page> = {}) {
    super(obj);
    merge(this, obj);
  }

  body?: string;

  bodyHeader?: string;

  bodySubHeader?: string;

  type: PAGE_TYPE = PAGE_TYPE.UNKNOWN;
}

export class Section extends BuilderBase implements ISection {
  constructor(obj: Partial<Section> = {}) {
    super(obj);
    merge(this, obj);
  }

  lastStep?: number;

  name!: string;
}
