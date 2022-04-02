import { getInstanceName, PREFIX, TInstanceOf } from '../util/instanceOf';
import { ClassProperties }                      from '../util/types';

export const ECommonCoreProperties: {
  _name: '_name',
  instanceOfCheck: 'instanceOfCheck',
} = {
  _name:           '_name' as const,
  instanceOfCheck: 'instanceOfCheck' as const,
};

const RefProperties: {
  _id: '_id',
  _label: '_label',
  _name: '_name',
  _order: '_order',
  _title: '_title',
  _type: '_type',
  id: 'id',
  instanceOfCheck: 'instanceOfCheck',
  label: 'label',
  order: 'order',
  title: 'title',
  type: 'type'
} = {
  _id:             '_id' as const,
  _label:          '_label' as const,
  _name:           '_name' as const,
  _order:          '_order' as const,
  _title:          '_title' as const,
  _type:           '_type' as const,
  id:              'id' as const,
  instanceOfCheck: 'instanceOfCheck' as const,
  label:           'label' as const,
  order:           'order' as const,
  title:           'title' as const,
  type:            'type' as const,
};

export const ERefCoreProperties = { ...ECommonCoreProperties, ...RefProperties };

const BaseProperties: {
  _form: '_form',
  form: 'form'
} = {
  _form: '_form' as const,
  form:  'form' as const,
};
export const EBaseCoreProperties = { ...ERefCoreProperties, ...BaseProperties };

const ComposableProperties: {
  _questionnaire: '_questionnaire',
  questionnaire: 'questionnaire'
} = {
  _questionnaire: '_questionnaire' as const,
  questionnaire:  'questionnaire' as const,
};
export const EComposableCoreProperties = { ...EBaseCoreProperties, ...ComposableProperties };

export const RefCoreClassName = getInstanceName(PREFIX.REF);
export const BaseCoreClassName = getInstanceName(PREFIX.BASE);
export const ComposableCoreClassName = getInstanceName(PREFIX.COMPOSABLE);
export const AnswerCoreClassName = getInstanceName(PREFIX.ANSWER);

export type TRefCoreProperties = ClassProperties<typeof ERefCoreProperties>;
// For brevity
const p = ERefCoreProperties;

/** Generic reference object */
export interface IRefCore {
  readonly [p.instanceOfCheck]: TInstanceOf;
  /**
   * Unique identifier
   *
   * @title Id
   */
  [p.id]: string;
  /**
   * @title Optional label
   * @hidden
   */
  [p.label]?: string;
  /**
   * Optional order
   *
   * @title Order
   * @hidden
   */
  [p.order]?: number;
  /**
   * @title Title
   */
  [p.title]?: string;
  /**
   * @title Type
   * @hidden
   */
  [p.type]?: string;
}
