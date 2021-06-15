import { merge }       from 'lodash';
import { ACTION }      from '../../lib/enums';
import { IAction }     from '../../survey/IAction';
import { BuilderBase } from './BuilderBase';

export class Action extends BuilderBase implements IAction {
  constructor(obj: Partial<Action>) {
    super(obj);
    merge(this, obj);
  }

  action!: string;

  description!: string;

  name!: string;

  title!: string;

  type!: ACTION;
}
