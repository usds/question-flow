import { merge } from 'lodash';
import { ACTION_TYPE } from '../lib/enums';
import { IAnswer } from '../survey/IAnswer';
import { Answer } from './Answer';

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export const stepReducer = (
  previousState: IAnswer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ACTION_TYPE; value: any },
): IAnswer => {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
  switch (action?.type) {
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
