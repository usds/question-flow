import { IStepData } from '../../survey/IStepData';
import { QuestionableConfig } from '../../survey/Config';
export declare abstract class Wizard {
    static getHeader(props: IStepData, config: QuestionableConfig): JSX.Element;
    static getSupportingDetails(props: IStepData): JSX.Element;
    static getQuestionHelp(props: IStepData): JSX.Element;
    static getFooter(props: IStepData): JSX.Element;
    static resetQuestionable(props: IStepData): void;
}
//# sourceMappingURL=Wizard.d.ts.map