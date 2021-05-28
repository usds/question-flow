import { IRequirement } from './IRequirement';

export interface IResult {
  id: string;
  label: string;
  match?: IRequirement;
  name: string;
  requirements: IRequirement[];
}
