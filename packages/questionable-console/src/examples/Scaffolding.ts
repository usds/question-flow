import { Questionnaire }   from '../composable/Questionnaire';
import { Iterable }        from '../composable/Iterable';
import { walkthroughFlow } from './scaffolding/walkthrough';

export class Scaffolding {
  questionnaire: Questionnaire;

  iterable: Iterable;

  constructor() {
    this.questionnaire = new Questionnaire(walkthroughFlow);
    this.iterable      = new Iterable(this.questionnaire);
  }
}
