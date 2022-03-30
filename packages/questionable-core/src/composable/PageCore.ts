/* eslint-disable import/no-cycle */
import { merge }               from 'lodash';
import { IPageCore }           from '../survey/IStepCore';
import { PAGE_TYPE }           from '../util/enums';
import { StepCore, TStepCtor } from './StepCore';

type ctor = TStepCtor & Partial<IPageCore>;

export class PageCore extends StepCore implements IPageCore {
  constructor(data: ctor) {
    super(data);
    merge(this, data);
  }

  body = '';

  bodyHeader = '';

  bodySubHeader = '';

  type!: PAGE_TYPE;
}
