import {
  isEmpty, isString, uniq, uniqBy,
} from 'lodash';

type IRefCore = {
  id: string;
  title: string;
  type: string;
}

export function toSet<T extends string | IRefCore>(
  data: T[],
  join = new Set<T>(),
): Set<T> {
  if (isEmpty(data) && isEmpty(join)) {
    return new Set<T>();
  }
  const existing  = Array.from(join);
  const union     = data.concat(existing);
  let unique: T[] = [];

  if (isString(data[0]) || isString(existing[0])) {
    unique = uniq(union);
  } else {
    unique = uniqBy(union, 'id');
  }
  return new Set<T>(unique);
}

export function fromSet<T extends string | IRefCore>(data: Set<T>) {
  return Array.from(data);
}
