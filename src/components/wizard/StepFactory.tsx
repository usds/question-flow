import { QUESTION_TYPE } from '../../lib/enums';
import { useGlobal } from '../../state/GlobalState';
import { IPrepStep } from '../../survey/IStep';
import {
  DateOfBirthStep,
  LandingPage,
  MultipleChoice,
  NoResultsPage,
  ResultsPage,
  SummaryPage,
} from '../steps';

export const StepFactory = (props: IPrepStep): JSX.Element => {
  const { step } = props;
  const { questionnaire } = useGlobal();

  const question = questionnaire.getQuestionById(`${step}`);
  switch (question.questionType) {
    case QUESTION_TYPE.LANDING_STEP:
      return <LandingPage {...{ question, ...props }} />;
    case QUESTION_TYPE.DOB:
      return <DateOfBirthStep {...{ question, ...props }} />;
    case QUESTION_TYPE.MULTIPLE_CHOICE:
      return <MultipleChoice {...{ question, ...props }} />;
    case QUESTION_TYPE.NO_RESULTS_STEP:
      return <NoResultsPage {...{ question, ...props }} />;
    case QUESTION_TYPE.RESULTS_STEP:
      return <ResultsPage {...{ question, ...props }} />;
    case QUESTION_TYPE.SUMMARY_STEP:
      return <SummaryPage {...{ question, ...props }} />;
    default:
      return <>Step does not exist</>;
  }
};
