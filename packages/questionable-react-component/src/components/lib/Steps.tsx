import { StepsCore } from '@usds.gov/questionable-core';
import { IStepData } from '../../survey/IStepData';

export abstract class Steps extends StepsCore {
  public static goToStep(step: string, props: IStepData): void {
    props.wizard.goToStep(step);
  }
}
