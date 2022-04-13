import { merge }       from 'lodash';
import { FormCore }    from '../composable/FormCore';
import { ACTION_TYPE } from '../util/enums';

export type TStepReducerAction = {
  type: ACTION_TYPE;
  value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export type TStepReducer = {
  action: TStepReducerAction,
};
export type TReducer = {
  action: TStepReducerAction;
  previousState: Partial<FormCore>;
}

export type TReducerFn = (previousState: Partial<FormCore>, action: TStepReducerAction) => FormCore;

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export const defaultReducer: TReducerFn = (previousState, action) => {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
  switch (action?.type) {
    case ACTION_TYPE.RESET:
      return new FormCore();

    case ACTION_TYPE.UPDATE:
      return FormCore.create(merge(
        {
          ...previousState,
        },
        {
          ...action.value,
        },
      ));

    // Effective a noop that triggers a re-render of the page
    case ACTION_TYPE.RERENDER:
      return FormCore.create(previousState);

    default:
      return FormCore.create(previousState);
  }
};
