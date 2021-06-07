import { isEnum, PAGE_TYPE, QUESTION_TYPE } from '../../lib/enums';
import { noel } from '../../lib/noop';
import { IStep } from '../../survey/IStep';
import { IStepData } from '../../survey/IStepData';
import { EditStep } from '../design/Edit';
/**
 * Given a step of a known question type, generates a question component
 * @param props
 * @returns
 */
export const DesignFactory = (props: IStepData, step: IStep): JSX.Element => {
  if (isEnum(QUESTION_TYPE, step.type)) {
    return <EditStep {...props}></EditStep>;
  }
  if (isEnum(PAGE_TYPE, step.type)) {
    return noel('Not a question');
  }
  return noel('Not an editable type');
};
