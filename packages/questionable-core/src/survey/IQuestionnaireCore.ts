import { IActionCore }                       from './IActionCore';
import { IBranchCore }                       from './IBranchCore';
import { IPagesCore }                        from './IPagesCore';
import { IQuestionCore, ISectionCore }       from './IStepCore';
import { IQuestionableConfigCore }           from './IQuestionableConfigCore';
import { IResultCore }                       from './IResultCore';
import { EQuestionnaireCoreProperties as p } from '../metadata/MQuestionnaire';
/**
 * Definition for survey data input
 */
export interface IQuestionnaireCore {
   [p.actions]: IActionCore[];
   [p.branches]: IBranchCore[];
   [p.config]: IQuestionableConfigCore;
   [p.flow]: string[];
   [p.header]: string;
   [p.pages]: IPagesCore;
   [p.questions]: IQuestionCore[];
  [p.results]: IResultCore[];
  [p.sections]: ISectionCore[];
}
