import { values }    from 'lodash';
import { TSForm }    from './TSForm';
import { STEP_TYPE } from '../../metadata/properties/type/TStepType';

export function isValid({ step, form }: TSForm): boolean {
  const q = form.responses.find((a) => a?.id === step.id);
  let ret = true;
  if (!q) {
    ret = false;
  }
  const answers = values(q?.answers);
  let years     = 0;
  switch (q?.type) {
    case STEP_TYPE.DOB:
      years = form?.age?.years || 0;
      if (years <= 0) {
        ret = false;
      }
      if (!q?.exitRequirements || q.exitRequirements.length === 0) {
        // ret === true
      }
      ret = ret
        && (q.exitRequirements?.every(
          (r) => r.minAge && years >= r.minAge.years,
        )
          || true);
      break;
    case STEP_TYPE.MULTIPLE_CHOICE:
      ret = ret
        && q.answer !== undefined
        && answers?.find((x) => x.title === q.answer) !== undefined;
      break;
    default:
      // ret === true
      break;
  }
  return ret;
}
