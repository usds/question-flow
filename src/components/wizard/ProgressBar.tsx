import PB            from '@ramonak/react-progress-bar';
import { useGlobal } from '../../state/GlobalState';
import { IStepData } from '../../survey/IStepData';
import { noel }      from '../../lib/noop';
import { CSS_CLASS } from '../../lib';

export const ProgressBar = (props: IStepData): JSX.Element => {
  const { config, questionnaire } = useGlobal();

  if (config.progressBar.hide) {
    return noel();
  }

  const completed = questionnaire.getProgressPercent(props);

  // Do not display the progress bar if there is no progress
  if (completed <= 0 || completed > 100) {
    return noel();
  }

  return (
    <div className={CSS_CLASS.PROGRESS_BAR}>
      <PB
        completed={completed}
        bgColor={config.progressBar.bgColor}
        baseBgColor={config.progressBar.baseBgColor}
        isLabelVisible={false}
        borderRadius={'0px'}
        tab-index={0}
        aria-label={`${completed}% percent complete`}
      />
    </div>
  );
};
