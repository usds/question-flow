import {
  GateLogicCore,
  isEnum, QUESTION_TYPE,
} from '@usds.gov/questionable-core';
import { noel }           from '../../lib/noel';
import { useGlobal }      from '../../state/GlobalState';
import { Question, Step } from '../../composable';
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
export const QuestionFactory = ({ step, gate }: {gate: GateLogicCore, step: Step}): JSX.Element => {
  const { questionnaire } = useGlobal();
  if (!isEnum(QUESTION_TYPE, step.type)) {
    return noel('Not a question');
  }
  const question = questionnaire.getQuestionById(step.id) as Question;
  // const stepData = { ...{ step: question, ...props } } as Partial<QuestionData>;
  const comp = new QuestionComposer({ gate, question });

  switch (question.type) {
    case QUESTION_TYPE.DOB:
      return <DateOfBirthStep step={question} comp={comp} />;
    case QUESTION_TYPE.MULTIPLE_CHOICE:
      return <MultipleChoiceStep step={question} comp={comp}  />;
    case QUESTION_TYPE.MULTIPLE_SELECT:
      return <MultiSelectStep step={question} comp={comp}  />;
    default:
      return noel('Question does not exist', 'QuestionFactory');
  }
};
