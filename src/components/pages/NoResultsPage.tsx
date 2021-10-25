import { ACTION, CSS_CLASS } from '../../lib';
import { noel }              from '../../lib/noop';
import { useGlobal }         from '../../state/GlobalState';
import { IPageData }         from '../../survey/IPageData';
import { Span }              from '../factories/NodeFactory';
import { Action }            from '../wizard/Action';
import { StepLayout }        from '../wizard/StepLayout';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = (props: IPageData): JSX.Element => {
  const { step }          = props;
  const global            = useGlobal();
  const { questionnaire } = global;

  if (!step) {
    return noel();
  }

  const action = questionnaire.getActionByType(ACTION.NONE);

  return (
    <StepLayout {...props}>
      <Span node={step.bodyHeader} className={CSS_CLASS.NO_RESULTS_HEADER} />
      <Span
        node={step.bodySubHeader}
        className={CSS_CLASS.NO_RESULTS_SUBHEADER}
      />
      <Span node={step.body} className={CSS_CLASS.NO_RESULTS_BODY} />
      <Span node={step.children} />
      <Action {...action} />
    </StepLayout>
  );
};
