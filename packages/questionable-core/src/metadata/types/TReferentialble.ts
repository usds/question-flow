import { IRefCore }     from '../IRefCore';
import { TCollectable } from './TCollectable';

// const tryParseQuestion = <Q extends QuestionCore>(value: TTypeable): Q | undefined => {
//   if (isQuestion(value)) {
//     return value as Q;
//   }
//   return undefined;
// };
// const tryParsePage = <Q extends PageCore>(value: TTypeable): Q | undefined => {
//   if (isPage(value)) {
//     return value as Q;
//   }
//   return undefined;
// };
export type TReferentialble = IRefCore & {
  actions?: TCollectable[];
  answers?: TCollectable[];
  branches?: TCollectable[];
  buttons?: TCollectable[];
  // [key in TPoolName]: TCollectable[];
  questions?: TCollectable[];
  requirements?: TCollectable[];
  responses?: TCollectable[];
  results?: TCollectable[];
  sections?: TCollectable[];
};
