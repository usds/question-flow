import { TQstn } from './types';

type Ts = TQstn & { step: string };

export abstract class Steps {
  public static goToStep({ step, props }: Ts): void {
    props.wizard.goToStep(step);
  }
}
