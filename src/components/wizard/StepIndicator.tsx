import { StepIndicator as SI, StepIndicatorStep } from '@trussworks/react-uswds';
import { useGlobal }                              from '../../state/GlobalState';
import { IStepData }                              from '../../survey/IStepData';
import { ISection }                               from '../../survey/ISection';
import { noel }                                   from '../../lib/noop';

const getIndicatorStep = (s: ISection) => (
    <StepIndicatorStep key={s.id} label={s.name} status={s.status} />
);

export const StepIndicator = (props: IStepData): JSX.Element => {
  const { config, questionnaire } = useGlobal();

  if (config.progressBar.hide) {
    return noel();
  }

  const sections = questionnaire.getSections(props);
  if (sections.length === 0) {
    return noel();
  }

  return (
    <SI centered counters="small">
      {questionnaire.getSections(props).map(getIndicatorStep)}
    </SI>
  );
};
