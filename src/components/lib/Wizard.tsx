import { IPrepStep, IStep } from '../../survey/IStep';
import { QuestionableConfig } from '../../survey/Config';

export class Wizard {
  static getHeader(props: IStep, config: QuestionableConfig): JSX.Element {
    let text = props.question.questionText;
    if (!text) {
      return <></>;
    }

    if (config.showSteps) {
      text = `${props.question.id}: ${text}`;
    }
    return <h3 className="usa-card__heading">{text}</h3>;
  }

  static getSupportingDetails(props: IStep): JSX.Element {
    const text = props.question.supportingDetails;
    if (!text) {
      return <></>;
    }
    return <p className="font-sans-6" dangerouslySetInnerHTML={{ __html: text }} />;
  }

  static getQuestionHelp(props: IStep): JSX.Element {
    const text = props.question.questionHelp;
    if (!text) {
      return <></>;
    }
    return <p className="font-sans-6">{text}</p>;
  }

  static getFooter(props: IStep): JSX.Element {
    const text = props.question.footer;
    if (!text) {
      return <></>;
    }
    return <p className="font-sans-6" dangerouslySetInnerHTML={{ __html: text }} />;
  }

  static resetQuestionable(props: IPrepStep): void {
    props.dispatchForm({
      type: 'RESET',
    });
    props.wizard.goToStep('A');
  }
}
