import { Answers, DistinctQuestion, prompt } from 'inquirer';
import { Subject }                           from 'rxjs';
// import { IQuestionableCore }                 from '@usds.gov/questionable-core';

export const Questionable = (): any => {
  // if (!questionnaire) {
  //   throw new Error('questionable is undefined');
  // }
  // const prompts = new Subject();
  // const inq     = prompt(prompts);

  const observe     = new Subject<DistinctQuestion<Answers>>();
  const { process } = prompt(observe).ui;

  process.subscribe({
    next: (val) => {
      console.log(val);
    },
  });
  process.subscribe({
    complete: console.log,
    error:    console.error,
  });

  observe.next({
    message: "What's your first name",
    name:    'first_name',
    type:    'input',
  });

  observe.next({
    default() {
      return 'Doe';
    },
    message: "What's your last name",
    name:    'last_name',
    type:    'input',
  });

  observe.next({
    message: "What's your phone number",
    name:    'phone',
    type:    'input',
    validate(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i,
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    },
  });
  observe.complete();
  return observe;
};

export const cnsl: any = Questionable();
