import { MODE } from '../lib';
export interface IQuestionableConfig {
    dev: boolean;
    mode: MODE;
    showSteps: boolean;
}
export declare class QuestionableConfig implements IQuestionableConfig {
    dev: boolean;
    mode: MODE;
    showSteps: boolean;
    constructor(config?: Partial<IQuestionableConfig>);
}
//# sourceMappingURL=Config.d.ts.map