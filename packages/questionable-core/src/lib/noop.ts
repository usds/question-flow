import { noop } from 'lodash';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Generic no-operation
 */
export { noop };

export const noopAsync = async (..._params: unknown[]) => noop(..._params);
