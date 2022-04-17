/* eslint-disable @typescript-eslint/no-explicit-any */
import { simple_all }    from '@usds.gov/questionable-mocks';
import { FormCore }      from '@usds.gov/questionable-core';
import { Questionnaire } from './composable/Questionnaire';
import { Iterable }      from './composable/Iterable';

export const Questionable = (): any => {
  // if (!questionnaire) {
  //   throw new Error('questionable is undefined');
  // }
  // const prompts = new Subject();
  // const inq     = prompt(prompts);
  const data          = simple_all as unknown as Partial<Questionnaire>; // eslint-disable-line camelcase
  const form          = new FormCore();
  const questionnaire = new Questionnaire(data);
  const iterator      = new Iterable(questionnaire, form);
  iterator.start();
  return iterator;
};

export const cnsl: any = Questionable();
