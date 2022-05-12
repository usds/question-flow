export type TOpType = 'RERENDER' | 'RESET' | 'undo' | 'UPDATE';
type TEnmOpType = {
  RERENDER: TOpType & 'RERENDER';
  RESET: TOpType & 'RESET';
  UNDO: TOpType & 'undo';
  UPDATE: TOpType & 'UPDATE';
};
export const OP_TYPE: TEnmOpType = {
  RERENDER: 'RERENDER',
  RESET:    'RESET',
  UNDO:     'undo',
  UPDATE:   'UPDATE',
};
