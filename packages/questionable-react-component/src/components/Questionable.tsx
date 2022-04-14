import { useReducer } from 'react';
import { useWizard }  from 'use-wizard';
import {

  FormCore,
  GateLogicCore,
  QuestionnaireCore,
  defaultReducer,
  eventedCore,
} from '@usds.gov/questionable-core';
import { CSS_CLASS }           from '../lib/enums';
import { DevPanel }            from './wizard/DevPanel';
import { GlobalStateProvider } from '../state/GlobalState';
import { ProgressFactory }     from './factories/ProgressFactory';
import { StepFactory }         from './factories/StepFactory';

type TQ = {
  questionnaire: QuestionnaireCore,
};
export const Questionable = ({ questionnaire }: TQ): JSX.Element => {
  if (!questionnaire) {
    throw new Error('questionable is undefined');
  }
  const initForm = new FormCore();
  // This is only used to store user inputs
  const [form, dispatchForm] = useReducer(defaultReducer, initForm);
  const gate                 = new GateLogicCore(questionnaire, form);
  const [stepId, setStepId]  = useWizard(gate.flow);
  const step                 = gate.getStepById(`${stepId}`);
  eventedCore.subscribe({ trigger: dispatchForm, type: 'reduce' });
  return (
      <GlobalStateProvider value={gate}>
        <div className={CSS_CLASS.BASE}>
          <section className={`section ${CSS_CLASS.PROGRESS_BAR_TOP_SECTION}`}>
            <ProgressFactory step={step} position={'top'} />
          </section>

          <section className={`section ${CSS_CLASS.STEP_LAYOUT_SECTION}`}>
            <StepFactory step={step} gate={gate} />
          </section>

          <section className={`section ${CSS_CLASS.PROGRESS_BAR_BOTTOM_SECTION}`}>
            <ProgressFactory position={'bottom'} step={step} />
          </section>

          <section className={`section ${CSS_CLASS.DEV_PANEL_SECTION}`}>
            <DevPanel form={form} wizard={setStepId} />
          </section>
        </div>
      </GlobalStateProvider>
  );
};
