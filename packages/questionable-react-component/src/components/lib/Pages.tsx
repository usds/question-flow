/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import { kebabCase }              from 'lodash';
import { ReactNode }              from 'react';
import { groupBy, GateLogicCore } from '@usds.gov/questionable-core';
import { CSS_CLASS }              from '../../lib/enums';
import { Div }                    from '../factories/NodeFactory';
import { IResult }                from '../../survey/IResult';
import { setResults }             from '../../state/persists';
import { TResultData }            from '../../survey/IEvent';
import { IQuestionData }          from '../../survey/IStepData';
import { QuestionableConfig }     from '../../composable/config';
import { Questionnaire }          from '../../composable/Questionnaire';
import { TComp }                  from './types';

export class PageComposer {
  props: IQuestionData;

  config: QuestionableConfig;

  questionnaire: Questionnaire;

  gate: GateLogicCore;

  constructor(data: TComp) {
    this = data;
  }

  /**
   * Internal method to compute reason for a result
   * @param props
   * @param result
   * @returns
   */
  static getReason(result: IResult): string {
    let reason = result.match?.explanation;

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
        reason += `You are ${this.props.form.age?.years} years `;
        reason += `and ${this.props.form.age?.months} months old. `;
      }
      result.match.responses.forEach((r) => {
        if (!r.question.id) {
          return;
        }
        const q = this.questionnaire.getQuestionById(r.question.id);
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
  getResults(): ReactNode {
    const data: TResultData = {
      props,
      results: this.questionnaire.getResults(this.props.form).map((result) => ({
        category: result.category,
        id:       result.id,
        label:    result.label,
        reason:   this.getReason(result),
        title:    result.title,
      })),
      step: 'results',
    };

    setResults(
      kebabCase(this.questionnaire.header),
      data.results.map((r) => ({
        description: r.reason,
        name:        r.title,
        ...r,
      })),
    );

    const categories = groupBy(data.results, 'category');
    return Object.keys(categories).map((key) => {
      const cat   = categories[key];
      const group = cat.map((result) => (
        <li
          key={`${props.stepId}_${result.id}`}
          className={CSS_CLASS.RESULTS_BENEFITS}
        >
          <span role="heading" aria-level={6}>
            {result.label}
            {'  '}
            <b>{result.title}</b>
          </span>
          <Div className="text-light" node={result.reason} />
        </li>
      ));
      return (
        <li key={kebabCase(key)} className={CSS_CLASS.RESULTS_CATEGORY}>
          <span role="heading" aria-level={5}>
            <b>{key}</b>
          </span>
          <ul>{group}</ul>
        </li>
      );
    });
  }
}
