/* eslint-disable import/no-cycle */
import { GateLogicCore }                       from '@usds.gov/questionable-core';
import { QuestionComposer }                    from './Questions';
import { PageComposer }                        from './Pages';
import { IQuestionData, IStepData, IPageData } from '../../survey/IStepData';
import { QuestionableConfig }                  from '../../composable/QuestionableConfig';
import { Questionnaire }                       from '../../composable/Questionnaire';

export type TQstn = {
  comp: QuestionComposer | PageComposer;
  props: IQuestionData | IPageData;
};

export type TComp = {
  config: QuestionableConfig;
  gate: GateLogicCore;
  props: IQuestionData | IPageData | IStepData;
  questionnaire: Questionnaire;
};
