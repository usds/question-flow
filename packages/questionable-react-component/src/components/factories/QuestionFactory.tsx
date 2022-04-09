import {
  isEnum, QUESTION_TYPE,
} from '@usds.gov/questionable-core';
import { noel }                     from '../../lib/noel';
import { useGlobal }                from '../../state/GlobalState';
import { IStepData, IQuestionData } from '../../survey/IStepData';
import {
  DateOfBirthStep,
  MultipleChoiceStep,
  MultiSelectStep,
} from '../questions';
import { QuestionComposer } from '../lib/Questions';

/**
 * Given a step of a known question type, generates a question component
 * @param props
 * @returns
 */
export const QuestionFactory = (props: IStepData): JSX.Element => {
  const { stepId }                = props;
  const { questionnaire, config } = useGlobal();
  const step                      = questionnaire.getStepById(`${stepId}`);
  if (!isEnum(QUESTION_TYPE, step.type)) {
    return noel('Not a question');
  }
  const question = questionnaire.getQuestionById(step.id);
  const stepData = { ...{ step: question, ...props } } as IQuestionData;
  const gate     = questionnaire.getGate(props.form);
  const comp     = new QuestionComposer({
    config, gate, props: question, questionnaire,
  });

  switch (question.type) {
    case QUESTION_TYPE.DOB:
      return <DateOfBirthStep {...stepData} comp={comp} />;
    case QUESTION_TYPE.MULTIPLE_CHOICE:
      return <MultipleChoiceStep {...stepData} comp={comp}  />;
    case QUESTION_TYPE.MULTIPLE_SELECT:
      return <MultiSelectStep {...stepData} comp={comp}  />;
    default:
      return noel('Question does not exist', 'QuestionFactory');
  }
};
