import { useReducer }                                 from 'react';
import { useWizard }                                  from 'use-wizard';
import { FormCore, GateLogicCore, QuestionnaireCore } from '@usds.gov/questionable-core';
import { CSS_CLASS }                                  from '../lib/enums';
import { DevPanel }                                   from './wizard/DevPanel';
import { GlobalStateProvider }                        from '../state/GlobalState';
import { ProgressFactory }                            from './factories/ProgressFactory';
import { StepFactory }                                from './factories/StepFactory';
import { stepReducer }                                from '../state/stepReducer';
import { IStepData }                                  from '../survey';

type TQ = {
  questionnaire: QuestionnaireCore,
};
export const Questionable = ({ questionnaire }: TQ): JSX.Element => {
  if (!questionnaire) {
    throw new Error('questionable is undefined');
  }
  const gate           = new GateLogicCore(questionnaire, new FormCore());
  const [step, wizard] = useWizard(gate.flow);
  // This is only used to store user inputs
  const [form, dispatchForm] = useReducer(stepReducer, gate.form);
  const props: IStepData     = {
    dispatchForm,
    form,
    stepId: step,
    wizard,
  };

  return (
      <GlobalStateProvider value={gate}>
        <div className={CSS_CLASS.BASE}>
          <section className={`section ${CSS_CLASS.PROGRESS_BAR_TOP_SECTION}`}>
            <ProgressFactory {...{
              position: 'top',
              props,
            }}/>
          </section>

          <section className={`section ${CSS_CLASS.STEP_LAYOUT_SECTION}`}>
            <StepFactory
              {...props}
            />
          </section>

          <section className={`section ${CSS_CLASS.PROGRESS_BAR_BOTTOM_SECTION}`}>
            <ProgressFactory {...{
              position: 'bottom',
              props,
            }}/>
          </section>

          <section className={`section ${CSS_CLASS.DEV_PANEL_SECTION}`}>
            <DevPanel
              {...props}
            />
          </section>
        </div>
      </GlobalStateProvider>
  );
};
