import { TInstanceOf } from '../../lib/instanceOf';
import { TRefType }    from '../properties/type/TRefType';

export type TTypeable = {
  instanceOfCheck: TInstanceOf;
  type: TRefType;
};
