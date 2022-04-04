import { FormCore, SurveyBuilder } from '@usds.gov/questionable-core';
import { Questionnaire }           from '../composable/Questionnaire';
import { Iterable }                from '../composable/Iterable';
import { walkthroughFlow }         from './scaffolding/walkthrough';

export class Scaffolding {
  questionnaire: Questionnaire;

  form: FormCore;

  iterable: Iterable;

  builder: SurveyBuilder;

  constructor() {
    // eslint-disable-next-line no-multi-assign
    this.builder = new SurveyBuilder();
    // this.iterable      = new Iterable(this.questionnaire);
  }
}
