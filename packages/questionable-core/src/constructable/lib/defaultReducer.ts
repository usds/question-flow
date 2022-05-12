import { merge }            from 'lodash';
import { eventedCore }      from '../../state/pubsub';
import { OP_TYPE, TOpType } from '../../metadata/types/TOpType';

export type TStepReducerAction = {
  type: TOpType;
  value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

type TSgReducerFn<T> = {
    action: TStepReducerAction;
    newState?: Partial<T>;
    oldState: Partial<T>;
}
export type TReducerFn<T> = ({ action, newState, oldState }: TSgReducerFn<T>) => void;

type TSgDefaultReducer<T> = TSgReducerFn<T> & {
    Form: new (data?: Partial<T>) => T;
    callback?: TReducerFn<T>;
}

/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export function defaultReducer<T>({
  Form, oldState, action, callback,
}: TSgDefaultReducer<T>): T {
  // Action should never be null,
  // __EXCEPT__ when we attempt to storybook/test individual components in isolation
  let newState: T;
  switch (action?.type) {
    case OP_TYPE.RESET:
      newState = new Form();
      break;

    case OP_TYPE.UPDATE:
      newState = new Form(merge(
        {
          ...oldState,
        },
        {
          ...action.value,
        },
      ));
      break;

    // Effective a noop that triggers a re-render of the page
    case OP_TYPE.RERENDER:
      newState = new Form(oldState);
      break;

    default:
      newState = new Form(oldState);
      break;
  }
  if (callback) {
    callback({ action, newState, oldState });
  }
  eventedCore.publish({ event: newState, type: 'reduce' });
  return newState;
}
