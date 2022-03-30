import {
  FormCore,
  IQuestionDataCore,
  IStepCore,
  QuestionableConfigCore,
  QuestionsCore,
  stepReducer,
  StepsCore,
} from '@usds.gov/questionable-core';
import {
  Answers, DistinctQuestion, prompt, registerPrompt,
} from 'inquirer';
import BottomBar               from 'inquirer/lib/ui/bottom-bar';
import PromptUI                from 'inquirer/lib/ui/prompt';
import { merge }               from 'lodash';
import { Observable, Subject } from 'rxjs';
import { IQuestion, IStep }    from '../survey/IStep';
import { error, log, white }   from '../util/logger';
import { TVal }                from '../util/types';
import { PromptFactory }       from './PromptFactory';
import { Questionnaire }       from './Questionnaire';

// eslint-disable-next-line @typescript-eslint/no-var-requires
registerPrompt('date', require('inquirer-date-prompt'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

export class Iterable {
  protected current: IQuestion;

  protected started = false;

  protected observable = new Subject<DistinctQuestion<Answers>>();

  protected form = new FormCore();

  protected process: Observable<TVal>;

  protected config = new QuestionableConfigCore();

  protected prompt: Promise<Answers> & {
    ui: PromptUI<Answers>;
  };

  protected questionnaire: Questionnaire;

  protected bottomBar!: BottomBar;

  constructor(
    questionnaire: Questionnaire,
    config: QuestionableConfigCore = new QuestionableConfigCore(),
  ) {
    this.questionnaire = questionnaire;
    this.config        = config;
    this.prompt        = prompt(this.observable);
    this.process       = this.prompt.ui.process;
    [this.current]     = this.questionnaire.questions;
    this.makeProgressBar();
  }

  makePage(step: IStepCore) {
    this.observable.next({
      message: step.title,
      name:    step.id,
      // suffix:  step.subTitle,
      type:    'confirm',
    });
  }

  makeQuestion(question: IQuestion) {
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

  makeStep(step: IStep) {
    if (step.onDisplay) {
      step.onDisplay(step);
    }
    if (StepsCore.getStepType(step) === 'question') {
      const nextQuestion = step as IQuestion;
      this.makeQuestion(nextQuestion);
      this.current = nextQuestion;
    } else {
      this.makePage(step);
    }
  }

  next(val: TVal): IQuestion | undefined {
    try {
      if (!this.current) {
        this.current = this.questionnaire.getFirstStep();
        return this.next({ answer: val.answer, name: this.current.id });
      }
      if (val.name) {
        this.current = this.questionnaire.getStepById(val.name) as IQuestion;
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
      log(`${this.questionnaire.getProgressPercent(this.props(this.current))}%`);
      return this.current;
    } catch (e) {
      this.bottomBar.log.write(e);
    }
    return undefined;
  }

  props(question: IQuestion = this.current): IQuestionDataCore {
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

  validate(a: TVal, question: IQuestion) {
    let isValid = true;
    function getAnswer() {
      function isString(val: unknown) {
        return (val instanceof String || typeof val === 'string');
      }
      if (isString(a.answer)) {
        return a.answer;
      }
      if (isString(a.value)) {
        return a.value;
      }
      if (isString(a)) {
        return a;
      }
      if (isString(a.short)) {
        return a.short;
      }
      error(`Could not determine value of answer ${a}`);
      return `${a}`;
    }
    if (question.validate && !question.validate(a, question)) {
      isValid = false;
    }
    QuestionsCore.updateForm(getAnswer(), this.props(question), this.config);
    isValid = isValid && StepsCore.isNextEnabled(this.props(question));
    return isValid;
  }

  private makeProgressBar(spinnerText = 'Working') {
    const loader   = [
      `/ ${spinnerText}`,
      `| ${spinnerText}`,
      `\\ ${spinnerText}`,
      `- ${spinnerText}`,
    ];
    let i          = loader.length - 4;  // 0;
    this.bottomBar = new BottomBar();
    // this.bottomBar = new BottomBar({ bottomBar: `\r\n${loader[i]}` });

    setInterval(() => {
      // this.bottomBar.updateBottomBar('');
      // this.bottomBar.updateBottomBar(`\r\n${loader[i]}`);
      if (i >= 3) {
        i = 0;
      } else {
        i += 1;
      }
    }, 300);
  }
}
