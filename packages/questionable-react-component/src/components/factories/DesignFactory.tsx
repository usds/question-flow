import { isEnum, PAGE_TYPE, QUESTION_TYPE } from '@usds.gov/questionable-core';
import { noel }                             from '../../lib/noel';
import { useGlobal }                        from '../../state/GlobalState';
import { IStep }                            from '../../survey/IStep';
import { IStepData }                        from '../../survey/IStepData';
import { IPageData }                        from '../../survey/IPageData';
import { IQuestionData }                    from '../../survey/IQuestionData';
import { EditStep }                         from '../design/Edit';
/**
 * Given a step of a known question type, generates a question component
 * @param props
 * @returns
 */
export const DesignFactory = (props: IStepData, step: IStep): JSX.Element => {
  const { questionnaire }   = useGlobal();
  const question            = questionnaire.getStepById(step.id);
  const stepData: IStepData = { ...{ step: question, ...props } };

  if (isEnum(QUESTION_TYPE, step.type)) {
    const questionData = stepData as IQuestionData;
    return <EditStep {...questionData}></EditStep>;
  }
  if (isEnum(PAGE_TYPE, step.type)) {
    const pageData = stepData as IPageData;
    return <EditStep {...pageData}></EditStep>;
  }
  return noel('Not an editable type');
};
