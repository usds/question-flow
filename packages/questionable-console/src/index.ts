import { simple_all }     from '@usds.gov/questionable-mocks';
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
  const questionnaire = new Questionnaire(data);
  const iterator      = new Iterable(questionnaire);
  iterator.start();
  return iterator;
};

export const cnsl: any = Questionable();
