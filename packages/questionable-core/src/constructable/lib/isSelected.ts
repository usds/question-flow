import { IQuestionCore } from '../../metadata/IQuestionCore';
import { TQForm }        from './TQForm';
import { isValid }       from './isValid';

/**
 * Determines if the answer is valid and selected
 * @param answer
 * @param props
 * @returns
 */
export function isSelected({ answer, question, form }: TQForm & { answer: string; }): boolean | undefined {
  if (!form) {
    return undefined;
  }
  const q = form.responses.find((a: IQuestionCore) => a.id === question.id);
  if (!q) {
    return undefined;
  }
  return isValid({ form, step: question }) && q.answer === answer;
}
