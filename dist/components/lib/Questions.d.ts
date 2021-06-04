import { DateTime } from 'luxon';
import { IQuestionData } from '../../survey/IStepData';
import { TDateOfBirth } from '../../lib/types';
/**
 * Static utility methods for question components
 */
export declare abstract class Questions {
    /**
     * Updates the form with the current selected answer(s)
     * @param answer
     * @param props
     * @returns
     */
    private static updateForm;
    /**
     * Generates a radio button given a question definition
     * @param answer
     * @param props
     * @returns
     */
    private static getRadio;
    /**
     * Determines if the answer is valid and selected
     * @param answer
     * @param props
     * @returns
     */
    private static isSelected;
    /**
     * Gets a collection of radio buttons
     * @param props
     * @returns
     */
    static getRadios(props: IQuestionData): JSX.Element;
    /**
     * Generates a checkbox given a question definition
     * @param answer
     * @param props
     * @returns
     */
    private static getCheckbox;
    /**
   * Gets a collection of checkboxes
   * @param props
   * @returns
   */
    static getCheckboxes(props: IQuestionData): JSX.Element;
    /**
     * Gets a birthdate's DateTime from a form
     * @param props
     * @returns
     */
    static getBirthdate(props: IQuestionData): DateTime | undefined;
    /**
     * Converts a Date of Birth type into a string
     * @param dob
     * @returns
     */
    static toBirthdate(dob: TDateOfBirth): string | undefined;
}
//# sourceMappingURL=Questions.d.ts.map