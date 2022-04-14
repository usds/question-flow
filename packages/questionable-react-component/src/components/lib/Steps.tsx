import { TWizard } from '../../composable/Wizard';

export abstract class Steps {
  public static goToStep({ step, wizard }: {step: string, wizard: TWizard}): void {
    wizard?.goToStep(step);
  }
}
