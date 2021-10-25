import { SiteAlert }              from '@trussworks/react-uswds';
import FileSaver                  from 'file-saver';
import { QuestionableConfig }     from '../../composable/Config';
import { ACTION_TYPE, CSS_CLASS } from '../../lib/enums';
import { noel }                   from '../../lib/noop';
import { IStepData }              from '../../survey/IStepData';
import { Span }                   from '../factories/NodeFactory';

export abstract class Wizard {
  public static getCssClass(
    prefix: CSS_CLASS,
    name: string,
    props: IStepData,
  ): string {
    const base = `${prefix}-${name}`;
    return [
      `${base}`,
      `${base}-${props.step?.type}`,
      `${base}-${props.stepId}`,
    ].join(' ');
  }

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
    return (
      <h3
        className={`usa-card__heading ${Wizard.getCssClass(
          CSS_CLASS.STEP,
          'header',
          props,
        )}`}
      >
        {text}
      </h3>
    );
  }

  public static getSubtitle(props: IStepData): JSX.Element {
    const text = props.step?.subTitle;
    if (!text) {
      return noel();
    }
    return (
      <Span
        className={Wizard.getCssClass(CSS_CLASS.STEP, 'subtitle', props)}
        node={text}
      />
    );
  }

  public static getInfoBox(props: IStepData): JSX.Element {
    const text = props.step?.info;
    if (!text) {
      return noel();
    }
    return (
      <SiteAlert
        variant="info"
        showIcon={false}
        className={`outline-1px ${Wizard.getCssClass(
          CSS_CLASS.STEP,
          'info',
          props,
        )}`}
      >
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
      <Span
        className={`font-sans-6 ${Wizard.getCssClass(
          CSS_CLASS.STEP,
          'footer',
          props,
        )}`}
        node={text}
      />
    );
  }

  public static resetQuestionable(props: IStepData): void {
    props.dispatchForm({
      type: ACTION_TYPE.RESET,
    });
    props.wizard.goToStep('A');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public static saveAsJson(data: any, fileName = 'questionable.json'): void {
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  }
}
