import { merge } from 'lodash';
import { TActionType } from '../lib/types';
import { Answer } from '../survey/Answer';
import { IAnswer } from '../survey/IAnswer';

export const stepReducer = (
  previousState: IAnswer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: TActionType; value: any },
): IAnswer => {
  switch (action.type) {
    case 'RESET':
      return new Answer();

    case 'UPDATE':
      return merge(
        {
          ...previousState,
        },
        {
          ...action.value,
        },
      );

    default:
      return previousState;
  }
};
