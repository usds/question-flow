// eslint-disable-next-line @typescript-eslint/ban-types
export function isEnum({ enm, value }: { enm: object; value: string; }): boolean {
  return Object.values(enm).includes(value);
}

// Traditional enums

export enum DATE_UNIT {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export enum MODE {
  DEV = 'dev',
  EDIT = 'edit',
  VIEW = 'view',
}

/**
 * Navigation direction for steps by array index (+1 or -1)
 */
export enum DIRECTION {
  FORWARD = 1,
  BACKWARD = -1,
}
