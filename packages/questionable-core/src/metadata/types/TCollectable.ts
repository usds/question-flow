import { TTypeable } from './TTypeable';

type TAdd = (param: TCollectable) => void;

export type TCollectable = TTypeable & {
  add?: TAdd;
  title: string;
};
