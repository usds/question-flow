import { merge }       from 'lodash';
import { ACTION_TYPE } from '../lib/enums';
import { Form }        from '../composable/Form';
import { IForm }       from '../survey/IForm';

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export const stepReducer = (
  previousState: IForm,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ACTION_TYPE; value: any },
): IForm => {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
  switch (action?.type) {
    case ACTION_TYPE.RESET:
      return new Form();

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
