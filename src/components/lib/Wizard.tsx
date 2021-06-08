import FileSaver              from 'file-saver';
import { QuestionableConfig } from '../../composable/Config';
import { ACTION_TYPE }        from '../../lib/enums';
import { noel }               from '../../lib/noop';
import { IStepData }          from '../../survey/IStepData';
import { log }                from '../../lib';

export abstract class Wizard {
  public static getHeader(
    props: IStepData,
    config: QuestionableConfig,
  ): JSX.Element {
    let text = props.step?.title;
    if (!text) {
      return noel();
    }

    if (config.showSteps) {
      text = `${props.step?.id}: ${text}`;
    }
    return <h3 className="usa-card__heading">{text}</h3>;
  }

  public static getSupportingDetails(props: IStepData): JSX.Element {
    const text = props.step?.subTitle;
    if (!text) {
      return noel();
    }
    return (
      <p className="font-sans-6" dangerouslySetInnerHTML={{ __html: text }} />
    );
  }

  public static getQuestionHelp(props: IStepData): JSX.Element {
    const text = props.step?.info;
    if (!text) {
      return noel();
    }
    return <p className="font-sans-6">{text}</p>;
  }

  public static getFooter(props: IStepData): JSX.Element {
    const text = props.step?.footer;
    if (!text) {
      return noel();
    }
    return (
      <p className="font-sans-6" dangerouslySetInnerHTML={{ __html: text }} />
    );
  }

  public static resetQuestionable(props: IStepData): void {
    props.dispatchForm({
      type: ACTION_TYPE.RESET,
    });
    props.wizard.goToStep('A');
  }

  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
  public static saveAsJson(data: any, fileName = 'questionable.json'): void {
    log(fileName);
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  }
}
