import { GateLogicCore, QuestionableConfigCore } from '@usds.gov/questionable-core';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const GlobalStateContext = createContext({
  setState: {} as Dispatch<SetStateAction<GateLogicCore>>,
  state:    {} as GateLogicCore,
});

type TGlobalStateContext = {
  setState: React.Dispatch<React.SetStateAction<GateLogicCore>>;
  state: GateLogicCore;
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
  value = {} as GateLogicCore,
}: {
  children: React.ReactNode;
  value?: GateLogicCore;
}): JSX.Element => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ setState, state }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useQuestionnaire = (): GateLogicCore => {
  const questionnaire = useGlobalState().state;

  if (!questionnaire) {
    throw new Error('Questionnaire is not defined');
  }
  return questionnaire;
};

const useConfig = (): QuestionableConfigCore => useQuestionnaire().config;

export interface IGlobalState {
  config: QuestionableConfigCore;
  questionnaire: GateLogicCore;
}

export const useGlobal = (): IGlobalState => ({
  config:        useConfig(),
  questionnaire: useQuestionnaire(),
});
