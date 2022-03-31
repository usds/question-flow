/* eslint-disable @typescript-eslint/no-explicit-any */
import { simple_all }     from '@usds.gov/questionable-mocks';
import { FormCore }       from '@usds.gov/questionable-core';
import { Questionnaire }  from './composable/Questionnaire';
import { Iterable }       from './composable/Iterable';
import { IQuestionnaire } from './survey/IQuestionnaire';

export const Questionable = (): any => {
  // if (!questionnaire) {
  //   throw new Error('questionable is undefined');
  // }
  // const prompts = new Subject();
  // const inq     = prompt(prompts);
  const data          = simple_all as unknown as IQuestionnaire;
  const form          = new FormCore();
  const questionnaire = new Questionnaire({ ...data, form });
  const iterator      = new Iterable(questionnaire);
  iterator.start();
  return iterator;
};

export const cnsl: any = Questionable();
