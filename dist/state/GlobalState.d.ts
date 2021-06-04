import React from 'react';
import { Questionnaire } from '../survey/Questionnaire';
import { QuestionableConfig } from '../survey/Config';
export interface IQuestionable {
    config?: QuestionableConfig;
    questionnaire?: Questionnaire;
}
export declare const GlobalStateProvider: ({ children, value, }: {
    children: React.ReactNode;
    value?: Partial<IQuestionable> | undefined;
}) => JSX.Element;
export interface IGlobalState {
    config: QuestionableConfig;
    questionnaire: Questionnaire;
}
export declare const useGlobal: () => IGlobalState;
//# sourceMappingURL=GlobalState.d.ts.map