import { merge }       from 'lodash';
import { ACTION_TYPE } from '../lib/enums';
import { Answer }      from '../survey/Answer';
import { IAnswer }     from '../survey/IAnswer';

export const stepReducer = (
  previousState: IAnswer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ACTION_TYPE; value: any },
): IAnswer => {
  switch (action.type) {
    case ACTION_TYPE.RESET:
      return new Answer();

    case ACTION_TYPE.UPDATE:
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
