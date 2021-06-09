import PB            from '@ramonak/react-progress-bar';
import { useGlobal } from '../../state/GlobalState';
// import { IStepData } from '../../survey/IStepData';
import { noel } from '../../lib/noop';

// export const ProgressBar = (props: IStepData): JSX.Element => {
export const ProgressBar = (): JSX.Element => {
  const { config } = useGlobal();

  if (config.progressBar.hide) {
    return noel();
  }

  return (
    <PB completed={0}></PB>
  );
};
