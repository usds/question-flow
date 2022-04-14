/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import { kebabCase } from 'lodash';
import { ReactNode } from 'react';
import {
  groupBy,
  GateLogicCore,
  QuestionableConfigCore,
  QuestionnaireCore,
  ResultCore,
} from '@usds.gov/questionable-core';
import { CSS_CLASS }  from '../../lib/enums';
import { Div }        from '../factories/NodeFactory';
import { setResults } from '../../state/persists';
import { Page }       from '../../composable';
import { TComp }      from './types';

export class PageComposer {
  page!: Page;

  config!: QuestionableConfigCore;

  questionnaire!: QuestionnaireCore;

  gate!: GateLogicCore;

  constructor({
    page, gate,
  }: {
    gate: GateLogicCore, page: Page,
  }) {
    this.page          = page;
    this.gate          = gate;
    this.questionnaire = gate.questionnaire;
    this.config        = gate.config;
  }

  /**
   * Internal method to compute reason for a result
   * @param props
   * @param result
   * @returns
   */
  getReason({ result }:{result: ResultCore}): string {
    let reason = result.match?.explanation;

    if (!reason) {
      return '';
    }

    if (this.config?.dev && result.match) {
      reason += '<br><br>';
      if (
        result.match.ageCalc !== undefined
        || result.match.minAge !== undefined
        || result.match.maxAge !== undefined
      ) {
        reason += `You are ${this.gate.form.age?.years} years `;
        reason += `and ${this.gate.form.age?.months} months old. `;
      }
      result.match.responses.forEach((r) => {
        if (!r.question?.id) {
          return;
        }
        const q = this.gate.getQuestionById(r.question.id);
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
    const data = {
      page:    this.page,
      results: this.gate.getResults().map((result: any) => ({
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
      const group = cat.map((result: any) => (
        <li
          key={`${this.page.id}_${result.id}`}
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
