import {
  StepIndicator as SI,
  StepIndicatorStep,
} from '@trussworks/react-uswds';
import { SectionCore } from '@usds.gov/questionable-core';
import { noel }        from '../../lib/noel';
import { useGlobal }   from '../../state/GlobalState';
import { Step }        from '../../composable/Step';

const getIndicatorStep = (s: SectionCore) => {
  if (!s.title) {
    return noel();
  }
  return (
    <StepIndicatorStep
      key={s.id}
      label={s.title}
      status={s.status || 'incomplete'}
    />
  );
};

export const StepIndicator = ({ step }: {step: Step}): JSX.Element => {
  const { config, questionnaire } = useGlobal();

  if (config.progressBar.hide) {
    return noel();
  }

  const sections = questionnaire.getSections(step);
  if (sections.length === 0) {
    return noel();
  }

  return (
    <SI centered counters="small">
      {sections.map(getIndicatorStep)}
    </SI>
  );
};
