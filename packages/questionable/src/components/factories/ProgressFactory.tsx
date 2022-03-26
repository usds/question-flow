import { TVerticalPositionCore } from '@usds.gov/questionable-core';
import { ProgressBar }           from '../wizard/ProgressBar';
import { StepIndicator }         from '../wizard/StepIndicator';
import { noel }                  from '../../lib/noel';
import { useGlobal }             from '../../state/GlobalState';
import { IStepData }             from '../../survey/IStepData';

export const ProgressFactory = ({ props, position }:
  { position: TVerticalPositionCore, props: IStepData }): JSX.Element => {
  const { config } = useGlobal();

  if (config.progressBar.hide || config.progressBar.position !== position) {
    return noel();
  }
  switch (config.progressBar.type) {
    case 'progress-bar':
      return <ProgressBar {...props}/>;
    case 'step-indicator':
      return <StepIndicator {...props} />;
    default:
      return noel('Could not find progress type', config.progressBar.type);
  }
};
