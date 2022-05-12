import { QuestionCore }     from '../../composable/QuestionCore';
import { QUESTION_TYPE }    from '../../metadata/properties/type/TQuestionType';
import { TDateOfBirthCore } from '../../metadata/types/TAgeCore';

/**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
export function toBirthdate({ question, dob }: {
  dob: TDateOfBirthCore;
  question: QuestionCore;
}): string | undefined {
  if (question.type !== QUESTION_TYPE.DOB) {
    return undefined;
  }
  if (dob.month && dob.day && dob.year) {
    if (+dob.month < 1 || +dob.month > 12) {
      return undefined;
    }
    if (+dob.day < 1 || +dob.day > 31) {
      return undefined;
    }
    if (+dob.year < 1900 || +dob.year > new Date().getFullYear()) {
      return undefined;
    }
    return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${dob.year}`;
  }
  return undefined;
}
