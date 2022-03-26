export type TCore = 'IQuestionableConfig'
  | 'IStepConfig'
  | 'IProgressBarConfig'
  | 'IQuestionConfig'
  | 'IButtonCore'
  | 'IButtonConfig'
  | 'IPageConfig'
  | 'IPagesConfig'
  | 'IPages'
  | 'INavigationConfig';

/**
 * A base interface to allow downstream consumers to extend from stubbed core interfaces
 */
export interface ICore {
  readonly core?: TCore;
}
