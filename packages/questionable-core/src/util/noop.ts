/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Generic no-operation
 */
export const noop = (..._params: unknown[]): void => { };

export const noopAsync = async (..._params: unknown[]) => noop(..._params);
