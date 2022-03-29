import {
  IPageCore,
  IQuestionCore,
  IStepCore,
  PAGE_TYPE,
  QUESTION_TYPE,
} from '@usds.gov/questionable-core';

type TExec = (...params: unknown[]) => void;

export interface IStep extends IStepCore {
  exec?: TExec;
}

export interface IQuestion extends IStep, IQuestionCore {
  exec: TExec;
  type: QUESTION_TYPE;
}

export interface IPage extends IStep, IPageCore {
  exec: TExec;
  type: PAGE_TYPE;
}
