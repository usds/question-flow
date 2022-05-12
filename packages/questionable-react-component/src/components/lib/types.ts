/* eslint-disable import/no-cycle */
import { GateLogicCore, QuestionableConfigCore, QuestionnaireCore } from '@usds.gov/questionable-core';
import { QuestionComposer }                                         from './Questions';
import { PageComposer }                                             from './Pages';
import {
  QuestionData, StepData, PageData, Page, Question, Step,
}   from '../../composable';

export type TQstn = {
  comp: QuestionComposer | PageComposer;
  props?: Partial<QuestionData> | Partial<PageData>;
  step: Step | Question | Page;
};

export type TComp = {
  config: QuestionableConfigCore;
  gate: GateLogicCore;
  props: Partial<QuestionData> | Partial<PageData> | Partial<StepData>;
  questionnaire: QuestionnaireCore;
};
