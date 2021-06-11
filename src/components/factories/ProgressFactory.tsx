import { ProgressBar }       from '../wizard/ProgressBar';
import { StepIndicator }     from '../wizard/StepIndicator';
import { noel }              from '../../lib/noop';
import { useGlobal }         from '../../state/GlobalState';
import { IStepData }         from '../../survey/IStepData';
import { TVerticalPosition } from '../../lib/types';

export const ProgressFactory = ({ props, position }:
  { position: TVerticalPosition, props: IStepData }): JSX.Element => {
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
