import { Link }      from '@trussworks/react-uswds';
import { noel }      from '../../lib/noop';
import { CSS_CLASS } from '../../lib';
import { IAction }   from '../../survey/IAction';
import { H2, P }     from '../factories/NodeFactory';

export const Action = (action: IAction): JSX.Element => {
  const buttons = action.buttons.map((a) => {
    if (!a.link) {
      return noel();
    }
    let cssMode                                              = '';
    let variant: 'nav' | 'unstyled' | 'external' | undefined = 'nav';
    if (a.mode === 'button') {
      cssMode = 'usa-button';
      variant = 'unstyled';
    }
    return (
      <Link
        className={`${CSS_CLASS.CALL_TO_ACTION_BUTTON} ${cssMode}`}
        variant={variant}
        key={a.label}
        href={a.link}
      >{a.label}</Link>
    );
  });
  return (<div className={CSS_CLASS.CALL_TO_ACTION}>
    <H2 node={action.title}/>
    <P node={action.subTitle} />
    <P node={action.action} />
    {buttons}
  </div>);
};
