import { noel }       from '../../lib/noel';
import { useGlobal }  from '../../state/GlobalState';
import { StepLayout } from '../wizard/StepLayout';
import type { TQst }  from '../lib/types';

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultiSelect = ({ props, comp }: TQst): JSX.Element => {
  const { config } = useGlobal();

  if (props?.step?.answers === undefined) {
    return noel();
  }

  return comp.getCheckboxes(props, config);
};

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultiSelectStep = ({ props, comp }: TQst): JSX.Element => (
  <StepLayout props={props} comp={comp}>
    <MultiSelect props={props} comp={comp}/>
  </StepLayout>
);
