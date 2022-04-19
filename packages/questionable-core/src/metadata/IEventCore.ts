import { TOnEventCore, TOnErrorCore } from './types/TGateCore';

/**
 * Event Model
 * @title Event
 */
export interface IEventCore {
  readonly onActionClick?: TOnEventCore;
  readonly onAnswer?: TOnEventCore;
  readonly onAnyEvent?: TOnEventCore;
  readonly onBranch?: TOnEventCore;
  readonly onError?: TOnErrorCore;
  readonly onGateSwitch?: TOnEventCore;
  readonly onInit?: TOnEventCore;
  readonly onNoResults?: TOnEventCore;
  readonly onPage?: TOnEventCore;
  readonly onResults?: TOnEventCore;
}
