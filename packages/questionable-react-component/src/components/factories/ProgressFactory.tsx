import { TVerticalPositionCore } from '@usds.gov/questionable-core';
import { ProgressBar }           from '../wizard/ProgressBar';
import { StepIndicator }         from '../wizard/StepIndicator';
import { noel }                  from '../../lib/noel';
import { useGlobal }             from '../../state/GlobalState';
import { Step }                  from '../../composable';

export const ProgressFactory = ({ step, position }:
  { position: TVerticalPositionCore, step: Step }): JSX.Element => {
  const { config } = useGlobal();

  if (config.progressBar.hide || config.progressBar.position !== position) {
    return noel();
  }
  switch (config.progressBar.type) {
    case 'progress-bar':
      return <ProgressBar step={step} />;
    case 'step-indicator':
      return <StepIndicator step={step} />;
    default:
      return noel('Could not find progress type', config.progressBar.type);
  }
};
