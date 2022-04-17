import {
  GateLogicCore,
  FormCore,
  updateForm,
} from '@usds.gov/questionable-core';
import {
  Answers, DistinctQuestion, prompt, registerPrompt,
} from 'inquirer';
import PromptUI                from 'inquirer/lib/ui/prompt';
import { merge }               from 'lodash';
import { Observable, Subject } from 'rxjs';
import { getAnswer }           from '../util/helper';
import {
  error, log, white, yellow,
} from '../util/logger';
import { TVal }          from '../util/types';
import { PromptFactory } from './PromptFactory';
import { Question }      from './Question';
import { Questionnaire } from './Questionnaire';
import { Step }          from './Step';

// eslint-disable-next-line @typescript-eslint/no-var-requires
registerPrompt('date', require('inquirer-date-prompt'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

export class Iterable<Q extends Questionnaire, F extends FormCore> {
  #current: Question;

  public get current() {
    return this.#current;
  }

  private set current(val: Question) {
    this.#current = val;
  }

  #started = false;

  public get started() {
    return this.#started;
  }

  private set started(val: boolean) {
    this.#started = val;
  }

  #observable = new Subject<DistinctQuestion<Answers>>();

  protected get observable() {
    return this.#observable;
  }

  private set observable(val) {
    this.#observable = val;
  }

  #form: F;

  protected get form(): F {
    return this.#form;
  }

  private set form(val) {
    this.#form = val;
  }

  #process: Observable<TVal>;

  protected get process() {
    return this.#process;
  }

  #prompt: Promise<Answers> & {
    ui: PromptUI<Answers>;
  };

  protected get prompt() {
    return this.#prompt;
  }

  #questionnaire: Q;

  protected get questionnaire() {
    return this.#questionnaire;
  }

  protected get config() {
    return this.#questionnaire.config;
  }

  #gateLogic: GateLogicCore;

  protected get gateLogic() {
    return this.#gateLogic;
  }

  constructor(
    questionnaire: Q,
    form: F,
  ) {
    this.#questionnaire = questionnaire;
    this.#form          = form;
    this.#prompt        = prompt(this.observable);
    this.#process       = this.#prompt.ui.process;
    [this.#current]     = this.#questionnaire.questions;
    this.#gateLogic     = new GateLogicCore(questionnaire, form);
  }

  async makePage(step: Step) {
    this.observable.next({
      message: step.title,
      name:    step.id,
      // suffix:  step.subTitle,
      type:    'confirm',
    });
  }

  async makeQuestion(question: Question) {
    const mould = PromptFactory(question);
    const prmpt = merge(mould, {
      askAnswered: true,
      default:     question.default,
      loop:        true,
      message:     question.title,
      name:        question.id,
      // suffix:   question.subTitle,
      validate:    async (a: TVal) => this.validate(a, question),
    }) as DistinctQuestion<Answers>;
    this.observable.next(prmpt);
  }

  async makeStep(step: Step) {
    if (step.onDisplay) {
      yellow(this.current);
      await step.onDisplay({
        answer: this.current.answer,
        name:   this.current.title,
      }, step);
    }
    if (this.gateLogic.getStepType(step) === 'question') {
      const nextQuestion = step as Question;
      this.makeQuestion(nextQuestion);
      this.current = nextQuestion;
    } else {
      this.makePage(step);
    }
  }

  async next(val: TVal): Promise<Question | undefined> {
    try {
      if (!this.current) {
        this.current = this.gateLogic.getFirstStep();
        return this.next({ answer: val.answer, name: this.current.id });
      }
      if (val.name) {
        this.current = this.gateLogic.getStepById(val.name) as Question;
      }
      const progress = this.gateLogic.getProgressPercent(this.current);
      if (progress === 100 || this.gateLogic.isComplete(this.current)) {
        this.observable.complete();
        return undefined;
      }
      if (await this.validate(val, this.current)) {
        if (this.current.onAnswer) {
          await this.current.onAnswer(val, this.current);
        }
        const nextStep = this.gateLogic.getNextStep(this.current);
        // const nextStep   = this.gateLogic.getStepById(nextStepId);
        await this.makeStep(nextStep);
      } else {
        await this.makeStep(this.current);
      }
      // log(`${this.gateLogic.getProgressPercent(this.current)}%`);
      return this.current;
    } catch (e) {
      error(e);
    }
    return undefined;
  }

  async start() {
    log(this);
    if (this.started) return;

    this.process.subscribe({
      next: (val: TVal) => {
        this.next(val);
      },
    });
    this.process.subscribe({
      complete: () => {
        white('complete');
      },
      error: (e) => {
        error(e);
      },
    });
    await this.makeQuestion(this.current);
    this.started = true;
  }

  async validate(a: TVal, question: Question) {
    let isValid  = true;
    const answer = getAnswer(a);
    if (question.validate) {
      isValid = await question.validate(a, question);
    }
    updateForm({ answer, form: this.form, question });
    isValid = isValid && this.gateLogic.isNextEnabled(question);
    return isValid;
  }
}
