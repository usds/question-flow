import {
  isEnum, QUESTION_TYPE,
} from '../../lib/enums';
import { noel }          from '../../lib/noop';
import { useGlobal }     from '../../state/GlobalState';
import { IStepData }     from '../../survey/IStepData';
import { IQuestionData } from '../../survey/IQuestionData';
import {
  DateOfBirthStep,
  MultipleChoiceStep,
  MultipleSelectStep,
} from '../questions';

/**
 * Given a step of a known question type, generates a question component
 * @param props
 * @returns
 */
export const QuestionFactory = (props: IStepData): JSX.Element => {
  const { stepId }        = props;
  const { questionnaire } = useGlobal();
  const step              = questionnaire.getStepById(`${stepId}`);

  if (!isEnum(QUESTION_TYPE, step.type)) {
    return noel('Not a question');
  }
  const question = questionnaire.getQuestionById(step.id);
  const stepData = { ...{ step: question, ...props } } as IQuestionData;
  switch (question.type) {
    case QUESTION_TYPE.DOB:
      return <DateOfBirthStep {...stepData} />;
    case QUESTION_TYPE.MULTIPLE_CHOICE:
      return <MultipleChoiceStep {...stepData} />;
    case QUESTION_TYPE.MULTIPLE_SELECT:
      return <MultipleSelectStep {...stepData} />;
    default:
      return noel('Question does not exist', 'QuestionFactory');
  }
};
