import { SiteAlert }                                     from '@trussworks/react-uswds';
import FileSaver                                         from 'file-saver';
import { ACTION_TYPE, FormCore, QuestionableConfigCore } from '@usds.gov/questionable-core';
import {  CSS_CLASS }                                    from '../../lib/enums';
import { noel }                                          from '../../lib/noel';
import { Span }                                          from '../factories/NodeFactory';
import { Step }                                          from '../../composable';
import { TWizard }                                       from '../../composable/Wizard';

export abstract class Wizard {
  public static getCssClass({ prefix, name, step }: {
    name: string,
    prefix: CSS_CLASS,
    step: Step,
  }): string {
    const base = `${prefix}-${name}`;
    return [
      `${base}`,
      `${base}-${step?.type}`,
      `${base}-${step.id}`,
    ].join(' ');
  }

  public static getHeader({ step, config }:
    {config: QuestionableConfigCore, step: Step }): JSX.Element {
    let text = step?.title;
    if (!text) {
      return noel();
    }

    if (config.steps.showStepId) {
      text = `${step?.id}: ${text}`;
    }
    return (
      <h3
        className={`usa-card__heading ${Wizard.getCssClass({
          name:   'header',
          prefix: CSS_CLASS.STEP,
          step,
        })}`}
      >
        {text}
      </h3>
    );
  }

  public static getSubtitle({ step }: {step: Step}): JSX.Element {
    const text = step?.subTitle;
    if (!text) {
      return noel();
    }
    return (
      <Span
        className={Wizard.getCssClass({ name: 'subtitle', prefix: CSS_CLASS.STEP, step })}
        node={text}
      />
    );
  }

  public static getInfoBox({ step }: {step: Step}): JSX.Element {
    const text = step?.info;
    if (!text) {
      return noel();
    }
    return (
      <SiteAlert
        variant="info"
        showIcon={false}
        className={`outline-1px ${Wizard.getCssClass({
          name:   'info',
          prefix: CSS_CLASS.STEP,
          step,
        })}`}
      >
        {text}
      </SiteAlert>
    );
  }

  public static getFooter({ step }: {step: Step}): JSX.Element {
    const text = step?.footer;
    if (!text) {
      return noel();
    }
    return (
      <Span
        className={`font-sans-6 ${Wizard.getCssClass({
          name:   'footer',
          prefix: CSS_CLASS.STEP,
          step,
        })}`}
        node={text}
      />
    );
  }

  public static resetQuestionable({ form, wizard }:{form: FormCore, wizard: TWizard}): void {
    FormCore.reducer(form, {
      type:  ACTION_TYPE.RESET,
      value: '',
    });
    wizard.goToStep('A');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public static saveAsJson(data: any, fileName = 'questionable.json'): void {
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  }
}
