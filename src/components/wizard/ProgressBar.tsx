import PB            from '@ramonak/react-progress-bar';
import { useGlobal } from '../../state/GlobalState';
import { IStepData } from '../../survey/IStepData';
import { noel }      from '../../lib/noop';

export const ProgressBar = (props: IStepData): JSX.Element => {
  const { config, questionnaire } = useGlobal();

  if (config.progressBar.hide) {
    return noel();
  }

  const completed = questionnaire.getProgressPercent(props, config);

  return (
    <div className={'usa-progress-bar'}>
      <PB
        completed={completed}
        bgColor={config.progressBar.bgColor}
        baseBgColor={config.progressBar.baseBgColor}
        isLabelVisible={false}
        borderRadius={'0px'}
      />
    </div>
  );
};
