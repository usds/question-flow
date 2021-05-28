import React, {
  createContext, useState, useContext, Dispatch, SetStateAction,
} from 'react';
import { Questionnaire } from '../survey/Questionnaire';
import { QuestionableConfig } from '../survey/Config';

export interface IQuestionable {
  config?: QuestionableConfig;
  questionnaire?: Questionnaire;
}

const GlobalStateContext = createContext({
  state: {} as Partial<IQuestionable>,
  setState: {} as Dispatch<SetStateAction<Partial<IQuestionable>>>,
});

type TGlobalStateContext = {
    state: Partial<IQuestionable>;
    setState: React.Dispatch<React.SetStateAction<Partial<IQuestionable>>>;
}

const useGlobalState = (): TGlobalStateContext => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};

export const GlobalStateProvider = ({
  children,
  value = {} as IQuestionable,
}: {
  children: React.ReactNode;
  value?: Partial<IQuestionable>;
}): JSX.Element => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useQuestionnaire = (): Questionnaire => {
  const { questionnaire } = useGlobalState().state;

  if (!questionnaire) {
    throw new Error('useQuestionnaire has no data');
  }
  return questionnaire;
};

const useConfig = (): QuestionableConfig => {
  const { config } = useGlobalState().state;

  if (!config) {
    throw new Error('useConfig has no data');
  }
  return config;
};

export interface IGlobalState {
  config: QuestionableConfig,
  questionnaire: Questionnaire
}

export const useGlobal = (): IGlobalState => ({
  config: useConfig(),
  questionnaire: useQuestionnaire(),
});
