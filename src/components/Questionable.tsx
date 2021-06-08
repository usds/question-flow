import { useReducer }                         from 'react';
import { useWizard }                          from 'use-wizard';
import { Answer }                             from '../composable/Answer';
import { GlobalStateProvider, IQuestionable } from '../state/GlobalState';
import { stepReducer }                        from '../state/stepReducer';
import { DevPanel }                           from './wizard/DevPanel';
import { ProgressBar }                        from './wizard/ProgressBar';
import { StepFactory }                        from './wizard/StepFactory';

export const Questionable = (q: IQuestionable): JSX.Element => {
  const { questionnaire } = q;
  if (!questionnaire) {
    throw new Error('questionable is undefined');
  }

  const [step, wizard] = useWizard(questionnaire.flow);

  // This is only used to store user inputs
  const [form, dispatchForm] = useReducer(stepReducer, new Answer());
  return (
    <GlobalStateProvider value={q}>
      {/*
      // Remove header for now
      <Header basic>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title id="basic-logo">
              <a href="/" title="Home" aria-label="Home">
                {questionnaire.header}
              </a>
            </Title>
          </div>
        </div>
      </Header> */}

      <section>
        <ProgressBar
          {...{
            dispatchForm,
            form,
            stepId: step,
            wizard,
          }}
        ></ProgressBar>
      </section>

      <section className="section">
        <StepFactory
          {...{
            dispatchForm,
            form,
            stepId: step,
            wizard,
          }}
        />
      </section>

      <section className="section">
        <DevPanel
          {...{
            dispatchForm,
            form,
            stepId: step,
            wizard,
          }}
        />
      </section>
    </GlobalStateProvider>
  );
};
