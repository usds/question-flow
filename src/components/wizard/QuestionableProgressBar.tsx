import { StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';
import { useGlobal } from '../../state/GlobalState';
import { IPrepStep } from '../../survey/IStep';
import { ISection } from '../../survey/ISection';

const getIndicatorStep = (s: ISection) => (
    <StepIndicatorStep key={s.id} label={s.name} status={s.status} />
);

export const QuestionableProgressBar = (props: IPrepStep): JSX.Element => {
  const { questionnaire } = useGlobal();

  const sections = questionnaire.getSections(props);
  if (sections.length === 0) {
    return <></>;
  }

  return (
    <StepIndicator centered counters="small">
      {questionnaire.getSections(props).map(getIndicatorStep)}
    </StepIndicator>
  );
};
