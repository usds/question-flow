import { useReducer }          from 'react';
import { useWizard }           from 'use-wizard';
import { Answer }              from '../composable/Answer';
import { GlobalStateProvider } from '../state/GlobalState';
import { stepReducer }         from '../state/stepReducer';
import { DevPanel }            from './wizard/DevPanel';
import { ProgressFactory }     from './factories/ProgressFactory';
import { StepFactory }         from './factories/StepFactory';
import { CSS_CLASS }           from '../lib/enums';
import { IQuestionable }       from '../survey/IQuestionable';

export const Questionable = (props: IQuestionable): JSX.Element => {
  if (!props?.questionnaire) {
    throw new Error('questionable is undefined');
  }
  const { questionnaire } = props;
  const [step, wizard]    = useWizard(questionnaire.flow);

  // This is only used to store user inputs
  const [form, dispatchForm] = useReducer(stepReducer, new Answer());
  return (
    <GlobalStateProvider value={questionnaire}>
      <div className={CSS_CLASS.BASE}>
        <section className={`section ${CSS_CLASS.PROGRESS_BAR_TOP_SECTION}`}>
          <ProgressFactory {...{
            position: 'top',
            props:    {
              dispatchForm,
              form,
              stepId: step,
              wizard,
            },
          }}/>
        </section>

        <section className={`section ${CSS_CLASS.STEP_LAYOUT_SECTION}`}>
          <StepFactory
            {...{
              dispatchForm,
              form,
              stepId: step,
              wizard,
            }}
          />
        </section>

        <section className={`section ${CSS_CLASS.PROGRESS_BAR_BOTTOM_SECTION}`}>
          <ProgressFactory {...{
            position: 'bottom',
            props:    {
              dispatchForm,
              form,
              stepId: step,
              wizard,
            },
          }}/>
        </section>

        <section className={`section ${CSS_CLASS.DEV_PANEL_SECTION}`}>
          <DevPanel
            {...{
              dispatchForm,
              form,
              stepId: step,
              wizard,
            }}
          />
        </section>
      </div>
    </GlobalStateProvider>
  );
};
