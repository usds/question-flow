import { IRequirement } from './IRequirement';

export interface IResult {
  name: string;
  code: string;
  description: string;
  requirements: IRequirement[];
  match?: IRequirement;
}
