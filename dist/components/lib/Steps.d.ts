import { IAnswer } from '../../survey/IAnswer';
import { IQuestionData, IStepData } from '../../survey/IStepData';
import { Questionnaire } from '../../survey/Questionnaire';
export declare abstract class Steps {
    static goToStep(step: string, props: IStepData): void;
    static goToNextStep(props: IStepData, questionnaire: Questionnaire): void;
    static goToPrevStep(props: IStepData, questionnaire: Questionnaire): void;
    /**
     * Determines whether the user should be allowed to continue
     * @param props
     * @returns
     */
    static isNextEnabled(props: IStepData): boolean;
    static isValid(form: IAnswer, question: string): boolean;
    static getFieldSetName(props: IQuestionData): string;
    static getDomId(answer: string, props: IQuestionData): string;
}
//# sourceMappingURL=Steps.d.ts.map