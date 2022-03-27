import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { QuestionableConfig } from '../composable/QuestionableConfig';
import { Questionnaire }      from '../composable/Questionnaire';

const GlobalStateContext = createContext({
  setState: {} as Dispatch<SetStateAction<Questionnaire>>,
  state:    {} as Questionnaire,
});

type TGlobalStateContext = {
  setState: React.Dispatch<React.SetStateAction<Questionnaire>>;
  state: Questionnaire;
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
  value = {} as Questionnaire,
}: {
  children: React.ReactNode;
  value?: Questionnaire;
}): JSX.Element => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ setState, state }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useQuestionnaire = (): Questionnaire => {
  const questionnaire = useGlobalState().state;

  if (!questionnaire) {
    throw new Error('Questionnaire is not defined');
  }
  return questionnaire;
};

const useConfig = (): QuestionableConfig => useQuestionnaire().config;

export interface IGlobalState {
  config: QuestionableConfig;
  questionnaire: Questionnaire;
}

export const useGlobal = (): IGlobalState => ({
  config:        useConfig(),
  questionnaire: useQuestionnaire(),
});
