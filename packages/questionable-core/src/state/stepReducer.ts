import { merge }       from 'lodash';
import { ACTION_TYPE } from '../util/enums';
import { FormCore }    from '../composable/FormCore';
import { IFormCore }   from '../survey/IFormCore';

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export const stepReducer = (
  previousState: IFormCore,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ACTION_TYPE; value: any },
): IFormCore => {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
  switch (action?.type) {
    case ACTION_TYPE.RESET:
      return new FormCore();

    case ACTION_TYPE.UPDATE:
      return merge(
        {
          ...previousState,
        },
        {
          ...action.value,
        },
      );

    // Effectively a noop that triggers a re-render of the page
    case ACTION_TYPE.RERENDER:
      return ({
        ...previousState,
      });

    default:
      return previousState;
  }
};
