import {
  FormCore as Form,
  SurveyBuilder,
} from '@usds.gov/questionable-core';
import { Questionnaire } from '../composable/Questionnaire';
import { Iterable }      from '../composable/Iterable';
import { build }         from './scaffolding/onboarding';

export class Scaffolding {
  questionnaire: Questionnaire;

  form: Form;

  iterable: Iterable<Questionnaire, Form>;

  builder: SurveyBuilder;

  constructor() {
    this.builder       = new SurveyBuilder();
    this.questionnaire = this.init();
    this.form          = new Form();
    this.iterable      = new Iterable(this.questionnaire, this.form);
  }

  init(): Questionnaire {
    build(this.builder);
    return this.builder.init(Questionnaire);
  }
}
