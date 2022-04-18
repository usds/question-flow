import { QuestionCore } from '../../composable/QuestionCore';

export function toString({ question }: { question: QuestionCore; }): string {
  if (!question.title || question.title === undefined || question.title?.length <= 0) {
    throw new Error(`Value is required; ${question.id} does not have a title`);
  }
  return question.title;
}
