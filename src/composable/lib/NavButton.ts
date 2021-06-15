import { merge }      from 'lodash';
import { DIRECTION }  from '../../lib/enums';
import { INavButton } from '../../survey/INavButton';

export class NavButton implements INavButton {
  constructor(obj: Partial<NavButton>) {
    merge(this, obj);
  }

  direction: DIRECTION = DIRECTION.FORWARD;

  label!: string;
}
