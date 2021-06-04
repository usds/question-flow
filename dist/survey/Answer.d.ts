import { TAge } from '../lib/types';
import { IAnswer, IAnswerList } from './IAnswer';
export declare class Answer implements IAnswer {
    readonly started: Date;
    finished?: Date;
    birthdate?: string;
    age?: TAge;
    answers: IAnswerList;
    constructor(form?: Partial<Answer>);
}
//# sourceMappingURL=Answer.d.ts.map