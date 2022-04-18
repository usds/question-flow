import { FormCore }         from '../composable/FormCore';
import { QuestionCore }     from '../composable/QuestionCore';
import { TDateOfBirthCore } from '../metadata/types/TAgeCore';
import { TQForm }           from './lib/TQForm';
import { isValid }          from './lib/isValid';
import { isSelected }       from './lib/isSelected';
import { toString }         from './lib/toString';
import { getBirthdate }     from './lib/getBirthdate';
import { updateForm }       from './lib/updateForm';
import { toBirthdate }      from './lib/toBirthdate';

export class Questioner {
  #question: QuestionCore;

  #form: FormCore;

  constructor({ question, form }: TQForm) {
    this.#question = question;
    this.#form     = form;
  }

  public updateForm({ answer }: {answer: string}): void {
    return updateForm({ answer, form: this.#form, question: this.#question });
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  public isSelected({ answer }: {answer: string}) {
    return isSelected({ answer, form: this.#form, question: this.#question });
  }

  public toString() {
    return toString({ question: this.#question });
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  public getBirthdate() {
    return getBirthdate({ form: this.#form, question: this.#question });
  }

  /**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
  public toBirthdate(
    dob: TDateOfBirthCore,
  ): string | undefined {
    return toBirthdate({ dob, question: this.#question });
  }

  public isValid(): boolean {
    return isValid({ form: this.#form, step: this.#question });
  }
}
