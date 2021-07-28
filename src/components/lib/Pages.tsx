import { ReactNode }    from 'react';
import { TResultData }  from '../../survey/IEvent';
import { IGlobalState } from '../../state/GlobalState';
import { IResult }      from '../../survey/IResult';
import { IStepData }    from '../../survey/IStepData';
import { Div }          from '../factories/NodeFactory';
import { CSS_CLASS }    from '../../lib/enums';

/**
 * Static utility methods for page components
 */
export abstract class Pages {
  /**
   * Internal method to compute reason for a result
   * @param props
   * @param result
   * @returns
   */
  static getReason(
    props: IStepData,
    result: IResult,
    global: IGlobalState,
  ): string {
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
      result.match.responses.forEach((r) => {
        if (!r.question.id) {
          return;
        }
        const q = questionnaire.getQuestionById(r.question.id);
        reason += `You answered "<b>${q.answer}</b>" to the question "<i>${q.title}.</i>" `;
      });
    }
    return reason;
  }

  /**
   * Internal method to generate list of results
   * @param props
   * @returns
   */
  static getResults(props: IStepData, global: IGlobalState): ReactNode {
    const { questionnaire, config } = global;
    const data: TResultData         = {
      props,
      results: questionnaire.getResults(props.form).map((result) => ({
        id:     result.id,
        label:  result.label,
        reason: Pages.getReason(props, result, global),
        title:  result.title,
      })),
      step: 'results',
    };
    config.events.results(data);
    return data.results.map((result) => (
      <li key={`${props.stepId}_${result.id}`} className={CSS_CLASS.SUMMARY_QA_LIST}>
        <span>
          {result.label}{'  '}
          <b>{result.title}</b>
        </span>
        <Div
          className="text-light"
          node={result.reason}
        />
      </li>
    ));
  }
}
