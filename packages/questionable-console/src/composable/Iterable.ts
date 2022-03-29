import {
  FormCore,
  IQuestionDataCore,
  IStepCore,
  QuestionableConfigCore,
  QuestionsCore,
  QUESTION_TYPE,
  stepReducer,
  StepsCore,
} from '@usds.gov/questionable-core';
import {
  Answers, DistinctQuestion, prompt,
} from 'inquirer';
import BottomBar               from 'inquirer/lib/ui/bottom-bar';
import PromptUI                from 'inquirer/lib/ui/prompt';
import { Observable, Subject } from 'rxjs';
import { IQuestion }           from '../survey/IStep';
import { Questionnaire }       from './Questionnaire';

type TVal = { answer: any, name: string };
type TChoice = { answer: string, key: string, name: string }
type TAnswerType = {
  type: 'number' | 'input' | 'password' | 'list' | 'expand' |
  'checkbox' | 'confirm' | 'editor' | 'rawlist',
  values?: string[] | TChoice[]
};

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

  // eslint-disable-next-line class-methods-use-this
  getType(q: IQuestion): TAnswerType {
    let ret: TAnswerType = { type: 'confirm' };
    switch (q.type) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        ret = {
          type:   'list',
          values: q.answers.map((e, i) => ({
            answer: e.type || '',
            key:    `${i}`,
            name:   e.title || '',
          })),
        };
        break;
      case QUESTION_TYPE.DOB:
        ret = {
          type: 'input',
        };
        break;
      default:
        ret = { type: 'confirm' };
        break;
    }
    return ret;
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
    const { type, values } = this.getType(question);
    this.observable.next({
      choices:  values,
      message:  question.title,
      name:     question.id,
      // suffix:   question.subTitle,
      type,
      validate: (answer) => {
        QuestionsCore.updateForm(answer, this.props(question), this.config);
        return StepsCore.isNextEnabled(this.props(question));
      },
    });
  }

  makeStep(step: IStepCore) {
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
      if (this.questionnaire.isComplete(this.current.id)) {
        this.observable.complete();
        return undefined;
      }
      if (this.validate(val.answer, this.current)) {
        this.current.exec(this.props(this.current));
        const nextStepId = this.questionnaire.getNextStep(this.props(this.current));
        const nextStep   = this.questionnaire.getStepById(nextStepId);
        this.makeStep(nextStep);
      } else {
        this.makeStep(this.current);
      }
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
        console.log('log');
      },
      error: (e) => {
        console.error(e);
      },
    });
    this.makeQuestion(this.current);
    this.started = true;
  }

  validate(answer: string, question: IQuestion) {
    QuestionsCore.updateForm(answer, this.props(question), this.config);
    return StepsCore.isNextEnabled(this.props(question));
  }

  private makeProgressBar(spinnerText = 'Working') {
    const loader   = [
      `/ ${spinnerText}`,
      `| ${spinnerText}`,
      `\\ ${spinnerText}`,
      `- ${spinnerText}`,
    ];
    let i          = 0;
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
