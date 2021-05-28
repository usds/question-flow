import {
  isEnum, PAGE_TYPE, QUESTION_TYPE,
} from '../../lib/enums';
import { useGlobal }                           from '../../state/GlobalState';
import { IPageData, IQuestionData, IStepData } from '../../survey/IStepData';
import {
  DateOfBirthStep,
  LandingPage,
  MultipleChoiceStep,
  NoResultsPage,
  ResultsPage,
  SummaryPage,
} from '../questions';

export const StepFactory = (props: IStepData): JSX.Element => {
  const { stepId }        = props;
  const { questionnaire } = useGlobal();
  const noop              = <>Step does not exist</>;
  const step              = questionnaire.getStepById(`${stepId}`);

  if (isEnum(QUESTION_TYPE, step.type)) {
    const question = questionnaire.getQuestionById(step.id);
    const stepData = { ...{ step: question, ...props } } as IQuestionData;
    switch (question.type) {
      case QUESTION_TYPE.DOB:
        return <DateOfBirthStep {...stepData} />;
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return <MultipleChoiceStep {...stepData} />;
      default:
        return noop;
    }
  } else if (isEnum(PAGE_TYPE, step.type)) {
    const page     = questionnaire.getPageById(step.id);
    const stepData = { ...{ step: page, ...props } } as IPageData;
    switch (page.type) {
      case PAGE_TYPE.LANDING:
        return <LandingPage {...stepData} />;
      case PAGE_TYPE.NO_RESULTS:
        return <NoResultsPage {...stepData} />;
      case PAGE_TYPE.RESULTS:
        return <ResultsPage {...stepData} />;
      case PAGE_TYPE.SUMMARY:
        return <SummaryPage {...stepData} />;
      default:
        return noop;
    }
  } else {
    return noop;
  }
};
