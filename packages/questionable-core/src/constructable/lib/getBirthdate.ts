import { DateTime }     from 'luxon';
import { getDateTime }  from '../../lib/date';
import { QuestionCore } from '../../composable/QuestionCore';
import { TQForm }       from './TQForm';

/**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
export function getBirthdate({ question, form }: TQForm): DateTime | undefined {
  if (!(question instanceof QuestionCore)) {
    return undefined;
  }

  if (question.answer) {
    return getDateTime({ dt: question.answer });
  }
  if (form?.birthdate) {
    return getDateTime({ dt: form.birthdate });
  }
  return undefined;
}
