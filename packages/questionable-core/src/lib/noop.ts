import { noop } from 'lodash';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Generic no-operation
 */
export { noop };

export async function noopAsync(..._params: unknown[]) {
  return noop(..._params);
}
