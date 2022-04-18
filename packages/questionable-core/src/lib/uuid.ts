import { v4 }        from 'uuid';
import ShortUniqueId from 'short-unique-id';

const shortUuid = new ShortUniqueId({ length: 6 });

export const getGUID = (short = true) => {
  if (short) {
    return shortUuid();
  }
  return v4();
};
