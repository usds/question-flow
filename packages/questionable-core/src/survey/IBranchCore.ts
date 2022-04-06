import { IRefCore } from './IRefCore';
import { IQuestionCore, ISectionCore } from './IStepCore';

export interface IBranchCore extends IRefCore {
  questions?: IQuestionCore[] | undefined;
  sections?: ISectionCore[] | undefined;
}
