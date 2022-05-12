import { isEnum, PAGE_TYPE, QUESTION_TYPE } from '@usds.gov/questionable-core';
import { noel }                             from '../../lib/noel';
import { useGlobal }                        from '../../state/GlobalState';
import { Step }                             from '../../composable';
import { EditStep }                         from '../design/Edit';
/**
 * Given a step of a known question type, generates a question component
 * @param props
 * @returns
 */
export const DesignFactory = ({ step }: {step: Step}): JSX.Element => {
  const { questionnaire } = useGlobal();
  const question          = questionnaire.getStepById(step.id);

  if (isEnum(QUESTION_TYPE, step.type)) {
    return <EditStep step={question}></EditStep>;
  }
  if (isEnum(PAGE_TYPE, step.type)) {
    return <EditStep step={step}></EditStep>;
  }
  return noel('Not an editable type');
};
