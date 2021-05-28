import { ACTION } from '../lib/enums';

export interface IAction {
  name: string;
  description: string;
  title: string;
  type: ACTION;
  action: string;
}
