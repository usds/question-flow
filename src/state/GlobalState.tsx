import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { QuestionableConfig } from '../composable/Config';
import { Questionnaire }      from '../composable/Questionnaire';

export interface IQuestionable {
  config?: QuestionableConfig;
  questionnaire?: Questionnaire;
}

const GlobalStateContext = createContext({
  setState: {} as Dispatch<SetStateAction<Partial<IQuestionable>>>,
  state:    {} as Partial<IQuestionable>,
});

type TGlobalStateContext = {
  setState: React.Dispatch<React.SetStateAction<Partial<IQuestionable>>>;
  state: Partial<IQuestionable>;
};

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
    <GlobalStateContext.Provider value={{ setState, state }}>
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
  config: QuestionableConfig;
  questionnaire: Questionnaire;
}

export const useGlobal = (): IGlobalState => ({
  config:        useConfig(),
  questionnaire: useQuestionnaire(),
});
