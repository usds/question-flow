import { merge }         from 'lodash';
import { PAGE_TYPE }     from '../lib/enums';
import { DEFAULT_PAGES } from '../lib/defaultPages';
import { IPages }        from '../survey/IPages';
import { Action }        from './lib/Action';
import {
  Page,
  Question,
  Result,
  Section,
  Step,
} from './lib/BuilderBase';
import { Questionnaire } from './Questionnaire';

export class SurveyBuilder {
  #actions: Action[] = [];

  #name: string;

  #pages: Page[] = [];

  #questions: Question[] = [];

  #results: Result[] = [];

  #sections: Section[] = [];

  #bookends: IPages = DEFAULT_PAGES;

  constructor(name: string, obj: Partial<SurveyBuilder> = {}) {
    merge(this, obj);
    this.#name = name;
  }

  addSection(obj: Partial<Section>): Section {
    let { id } = obj;
    if (!id) {
      id = `${this.#sections.length + 1}`;
    }
    const existing = this.#sections.find((s) => s.id === id);
    if (existing) {
      return existing;
    }
    const section = merge(new Section(obj), { id });
    this.#sections.push(section);
    return section;
  }

  protected setSection(obj: Partial<Page>): void

  protected setSection(obj: Partial<Question>): void

  protected setSection(obj: Partial<Step>): void {
    if (!obj.section) {
      return;
    }
    const section = this.addSection(obj.section);
    merge(obj, { section });
  }

  addQuestion(obj: Partial<Question>): Question {
    let { id } = obj;
    if (!id) {
      id = `${this.#sections.length + 1}`;
    }
    const existing = this.#questions.find((s) => s.id === id);
    if (existing) {
      this.setSection(existing);
      return existing;
    }
    const question = merge(new Question(obj), { id });
    this.setSection(question);
    this.#questions.push(question);
    return question;
  }

  addPage(obj: Partial<Page>): Page {
    let { id } = obj;
    if (!id) {
      id = `${this.#sections.length + 1}`;
    }
    const existing = this.#pages.find((s) => s.id === id);
    if (existing) {
      this.setSection(existing);
      return existing;
    }
    const page = merge(new Page(obj), { id });
    this.setSection(page);
    this.#pages.push(page);

    switch (page.type) {
      case PAGE_TYPE.LANDING:
        merge(this.#bookends, { landingPage: page });
        break;
      case PAGE_TYPE.SUMMARY:
        merge(this.#bookends, { summaryPage: page });
        break;
      case PAGE_TYPE.NO_RESULTS:
        merge(this.#bookends, { noResultsPage: page });
        break;
      case PAGE_TYPE.RESULTS:
        merge(this.#bookends, { resultsPage: page });
        break;
      default:
        break;
    }

    return page;
  }

  toQuestionnaire(): Questionnaire {
    return new Questionnaire({
      actions:   this.#actions,
      header:    this.#name,
      pages:     this.#bookends,
      questions: this.#questions,
      results:   this.#results,
      sections:  this.#sections,
    });
  }
}
