import { merge }       from 'lodash';
import { eventedCore } from '../../state/pubsub';
import { TQForm }      from './TQForm';
import { OP_TYPE }     from '../../metadata/types/TOpType';

/**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
export function updateForm({ answer, question, form }: TQForm & { answer: string; }): void {
  if (answer?.length > 0) {
    merge(question, { answer });
  }
  // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
  // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
  // There are cleaner ways to do this.
  // eslint-disable-next-line no-param-reassign
  form.responses = form.responses || [];
  const value    = form.responses.find((r) => r.id === question.id);
  if (!value) {
    form.responses.push(question);
  } else {
    merge(value, question);
  }
  eventedCore.publish({
    event: { answer, props: question, question: question.id },
    type:  'answer',
  });
  form.reduce({
    action: {
      type:  OP_TYPE.UPDATE,
      value: form,
    },
  });
}
