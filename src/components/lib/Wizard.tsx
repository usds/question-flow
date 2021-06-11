import { SiteAlert }              from '@trussworks/react-uswds';
import FileSaver                  from 'file-saver';
import { QuestionableConfig }     from '../../composable/Config';
import { ACTION_TYPE, CSS_CLASS } from '../../lib/enums';
import { noel }                   from '../../lib/noop';
import { IStepData }              from '../../survey/IStepData';

export abstract class Wizard {
  public static getHeader(
    props: IStepData,
    config: QuestionableConfig,
  ): JSX.Element {
    let text = props.step?.title;
    if (!text) {
      return noel();
    }

    if (config.steps.showStepId) {
      text = `${props.step?.id}: ${text}`;
    }
    return <h3 className={`usa-card__heading ${CSS_CLASS.STEP_HEADER}`}>{text}</h3>;
  }

  public static getSubtitle(props: IStepData): JSX.Element {
    const text = props.step?.subTitle;
    if (!text) {
      return noel();
    }
    return (
      <p className={CSS_CLASS.STEP_SUBTITLE} dangerouslySetInnerHTML={{ __html: text }} />
    );
  }

  public static getInfoBox(props: IStepData): JSX.Element {
    const text = props.step?.info;
    if (!text) {
      return noel();
    }
    return (
      <SiteAlert variant="info" showIcon={false} className={`outline-1px ${CSS_CLASS.STEP_INFO}`}>
        {text}
      </SiteAlert>
    );
  }

  public static getFooter(props: IStepData): JSX.Element {
    const text = props.step?.footer;
    if (!text) {
      return noel();
    }
    return (
      <p
        className={`font-sans-6 ${CSS_CLASS.STEP_FOOTER}`}
        dangerouslySetInnerHTML={{ __html: text }}
       />
    );
  }

  public static resetQuestionable(props: IStepData): void {
    props.dispatchForm({
      type: ACTION_TYPE.RESET,
    });
    props.wizard.goToStep('A');
  }

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public static saveAsJson(data: any, fileName = 'questionable.json'): void {
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  }
}
