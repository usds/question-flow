import {
  StepIndicator as SI,
  StepIndicatorStep,
} from '@trussworks/react-uswds';
import { noel }         from '../../lib/noel';
import { useGlobal }    from '../../state/GlobalState';
import { ISectionCore } from '../../survey/IStep';
import { IStepData }    from '../../survey/IStepData';

const getIndicatorStep = (s: ISectionCore) => {
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
      {sections.map(getIndicatorStep)}
    </SI>
  );
};
