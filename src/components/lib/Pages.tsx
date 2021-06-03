import { ReactNode }    from 'react';
import { IGlobalState } from '../../state/GlobalState';
import { IResult }      from '../../survey/IResult';
import { IStepData }    from '../../survey/IStepData';

/**
 * Static utility methods for page components
 */
export abstract class Pages {
  /**
   * Internal method to compute reason for a result
   * @param props
   * @param result
   * @param global
   * @returns
   */
  static getReason(props: IStepData, result: IResult, global: IGlobalState): string {
    let reason                      = result.match?.explanation;
    const { questionnaire, config } = global;

    if (!reason) {
      return '';
    }

    if (config?.dev && result.match) {
      reason += '<br><br>';
      if (
        result.match.ageCalc !== undefined
        || result.match.minAge !== undefined
        || result.match.maxAge !== undefined
      ) {
        reason += `You are ${props.form.age?.years} years `;
        reason += `and ${props.form.age?.months} months old. `;
      }
      Object.keys(result.match.answers).forEach((id) => {
        const q = questionnaire.getQuestionById(id);
        reason += `You answered "<b>${q.answer}</b>" to the question "<i>${q.title}.</i>" `;
      });
    }
    return reason;
  }

  /**
   * Internal method to generate list of results
   * @param props
   * @param global
   * @returns
   */
  static getResults(props: IStepData, global: IGlobalState): ReactNode {
    const { questionnaire } = global;
    return (questionnaire.getResults(props.form).map((result) => (
      <li key={`${props.stepId}_${result.id}`} className="padding-bottom-2">
        <span>
          {result.label}:{'  '}
          <b>{result.name}</b>
        </span>
        <div
          className="text-light"
          dangerouslySetInnerHTML={{ __html: Pages.getReason(props, result, global) }}
        />
      </li>
    )));
  }
}
