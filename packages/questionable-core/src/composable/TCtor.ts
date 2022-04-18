import { ActionCore as Action }     from './ActionCore';
import { AnswerCore as Answer }     from './AnswerCore';
import { BaseCore as Base }         from './BaseCore';
import { BranchCore as Branch }     from './BranchCore';
import { FormCore as Form }         from './FormCore';
import { QuestionCore as Question } from './QuestionCore';

export type TCtor<T extends Base> = { new (data: Partial<T>): T };
export type TCtorQuestion<T extends Question> = { new (data: Partial<T>): T };
export type TCtorAction<T extends Action> = { new (data: Partial<T>): T };
export type TCtorAnswer<T extends Answer> = { new (data: Partial<T>): T };
export type TCtorBranch<T extends Branch> = { new (data: Partial<T>): T };
export type TCtorForm<T extends Form> = { new (data: Partial<T>): T };

export function create<T extends Base>(Ctor: TCtor<T>, data: Partial<T>): T {
  return new Ctor(data);
}
