import { FormCore }        from '@usds.gov/questionable-core';
import { Questionnaire }   from '../composable/Questionnaire';
import { Iterable }        from '../composable/Iterable';
import { walkthroughFlow } from './scaffolding/walkthrough';

export class Scaffolding {
  questionnaire: Questionnaire;

  form: FormCore;

  iterable: Iterable;

  constructor() {
    // eslint-disable-next-line no-multi-assign
    const form         = this.form = new FormCore();
    this.questionnaire = new Questionnaire({ ...walkthroughFlow, form });
    this.iterable      = new Iterable(this.questionnaire);
  }
}
