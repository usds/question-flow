import {
  IPageCore,
  IQuestionCore,
  IStepCore,
  PAGE_TYPE,
  QUESTION_TYPE,
  IRefCore,
} from '@usds.gov/questionable-core';

type TExec = (...params: unknown[]) => void;
type TValidate = (...params: unknown[]) => boolean;

export interface IStep extends IStepCore {
  onAnswer?: TExec;
  onDisplay?: TExec;
  validate?: TValidate;
}

export interface IAnswer extends IRefCore {
  key?: string;
}

export interface IQuestion extends IStep, IQuestionCore {
  answers: IAnswer[];
  onAnswer: TExec;
  onDisplay: TExec;
  type: QUESTION_TYPE;
}

export interface IPage extends IStep, IPageCore {
  onAnswer: TExec;
  onDisplay: TExec;
  type: PAGE_TYPE;
}
