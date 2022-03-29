import { Questionnaire }   from '../src/composable/Questionnaire';
import { Iterable }        from '../src/composable/Iterable';
import { walkthroughFlow } from './scaffolding/walkthrough';

export class Scaffolding {
  questionnaire: Questionnaire;

  iterable: Iterable;

  constructor() {
    this.questionnaire = new Questionnaire(walkthroughFlow);
    this.iterable      = new Iterable(this.questionnaire);
  }
}
