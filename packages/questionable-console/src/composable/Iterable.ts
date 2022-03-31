import {
  QuestionableConfigCore,
  QuestionsCore,
  stepReducer,
  StepsCore,
  IQuestionDataCore,
} from '@usds.gov/questionable-core';
import {
  Answers, DistinctQuestion, prompt, registerPrompt,
} from 'inquirer';
import PromptUI                from 'inquirer/lib/ui/prompt';
import { merge }               from 'lodash';
import { Observable, Subject } from 'rxjs';
import { getAnswer }           from '../util/helper';
import { error, log, white }   from '../util/logger';
import { TVal }                from '../util/types';
import { PromptFactory }       from './PromptFactory';
import { Question }            from './Question';
import { Questionnaire }       from './Questionnaire';
import { Step }                from './Step';

// eslint-disable-next-line @typescript-eslint/no-var-requires
registerPrompt('date', require('inquirer-date-prompt'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

export class Iterable {
  protected current: Question;

  protected started = false;

  protected observable = new Subject<DistinctQuestion<Answers>>();

  protected get form() {
    return this.questionnaire.form;
  }

  protected process: Observable<TVal>;

  protected config = new QuestionableConfigCore();

  protected prompt: Promise<Answers> & {
    ui: PromptUI<Answers>;
  };

  protected questionnaire: Questionnaire;

  constructor(
    questionnaire: Questionnaire,
    config: QuestionableConfigCore = new QuestionableConfigCore(),
  ) {
    this.questionnaire = questionnaire;
    this.config        = config;
    this.prompt        = prompt(this.observable);
    this.process       = this.prompt.ui.process;
    [this.current]     = this.questionnaire.questions;
  }

  makePage(step: Step) {
    this.observable.next({
      message: step.title,
      name:    step.id,
      // suffix:  step.subTitle,
      type:    'confirm',
    });
  }

  makeQuestion(question: Question) {
    const mould = PromptFactory(question);
    const prmpt = merge(mould, {
      default:  question.default,
      message:  question.title,
      name:     question.id,
      // suffix:   question.subTitle,
      validate: (a: TVal) => this.validate(a, question),
    }) as DistinctQuestion<Answers>;
    this.observable.next(prmpt);
  }

  makeStep(step: Step) {
    if (step.onDisplay) {
      step.onDisplay(step);
    }
    if (StepsCore.getStepType(step) === 'question') {
      const nextQuestion = step as Question;
      this.makeQuestion(nextQuestion);
      this.current = nextQuestion;
    } else {
      this.makePage(step);
    }
  }

  next(val: TVal): Question | undefined {
    try {
      if (!this.current) {
        this.current = this.questionnaire.getFirstStep();
        return this.next({ answer: val.answer, name: this.current.id });
      }
      if (val.name) {
        this.current = this.questionnaire.getStepById(val.name) as Question;
      }
      const progress = this.questionnaire.getProgressPercent(this.props(this.current));
      if (progress === 100 || this.questionnaire.isComplete(this.current.id)) {
        this.observable.complete();
        return undefined;
      }
      if (this.validate(val, this.current)) {
        if (this.current.onAnswer) {
          this.current.onAnswer(val, this.current);
        }
        const nextStepId = this.questionnaire.getNextStep(this.props(this.current));
        const nextStep   = this.questionnaire.getStepById(nextStepId);
        this.makeStep(nextStep);
      } else {
        this.makeStep(this.current);
      }
      log(`${this.questionnaire.getProgressPercent(this.current)}%`);
      return this.current;
    } catch (e) {
      error(e);
    }
    return undefined;
  }

  props(question: Question = this.current): IQuestionDataCore {
    return ({
      dispatchForm: stepReducer,
      form:         this.form,
      step:         question,
      stepId:       question.id,
    });
  }

  start() {
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
    this.makeQuestion(this.current);
    this.started = true;
  }

  validate(a: TVal, question: Question) {
    let isValid  = true;
    const answer = getAnswer(a);
    if (question.validate && !question.validate(a, question)) {
      isValid = false;
    }
    QuestionsCore.updateForm(answer, this.props(question), this.config);
    isValid = isValid && StepsCore.isNextEnabled(this.props(question));
    return isValid;
  }
}
