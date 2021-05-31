import { ACTION } from '../lib/enums';

export interface IAction {
  action: string;
  description: string;
  name: string;
  title: string;
  type: ACTION;
}
