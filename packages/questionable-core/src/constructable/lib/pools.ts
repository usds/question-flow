/* eslint-disable import/no-cycle */
import { matches } from '../../lib/helpers';
import {
  isAction,
  isBranch,
  isQuestion,
  isResult,
  isSection,
} from './validators';
import { TCollectable }    from '../../metadata/types/TCollectable';
import { TReferentialble } from '../../metadata/types/TReferentialble';

type TPoolName = 'questions' | 'branches' | 'sections' | 'results' | 'answers' | 'requirements' | 'actions';
function getNameOfPool<T extends TCollectable>(item: T): TPoolName {
  if (isQuestion(item)) {
    return 'questions';
  }
  if (isBranch(item)) {
    return 'branches';
  }
  if (isSection(item)) {
    return 'sections';
  }
  if (isResult(item)) {
    return 'results';
  }
  if (isAction(item)) {
    return 'actions';
  }
  throw new Error(`Collection for ${item} has not been implemented`);
}

export function existsIn<T extends TCollectable>(item: T, pool: TCollectable[]): boolean {
  if (Array.isArray(pool) && pool.length > 0) {
    return pool.some((q) => q === item || matches(q.title, item.title));
  }
  return false;
}

export function getPool<T extends TCollectable>(item: T, obj: TReferentialble): TCollectable[] {
  const poolName = getNameOfPool(item);
  if (!obj[poolName] || !Array.isArray(obj[poolName])) {
    throw new Error(`No pool has been implemented for ${poolName}`);
  }
  const pool = obj[poolName];
  if (!pool) {
    throw new Error(`No pool has been implemented for ${poolName}`);
  }
  return pool;
}

export function existsInPool<T extends TCollectable>(item: T, obj: TCollectable) {
  const pool = getPool(item, obj);
  return existsIn(item, pool);
}

export function addToPool<T extends TCollectable>(item: T, obj: TCollectable) {
  const pool   = getPool(item, obj);
  const exists = existsIn(item, pool);
  if (exists) {
    return obj;
  }
  pool.push(item);
  return obj;
}
