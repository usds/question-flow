import { Link }      from '@trussworks/react-uswds';
import { CSS_CLASS } from '../../lib';
import { noel }      from '../../lib/noop';
import { IAction }   from '../../survey/IAction';
import { H2, H3, P } from '../factories/NodeFactory';

export const Action = (action: Partial<IAction>): JSX.Element => {
  const buttons = action.buttons?.map((a) => {
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
      <li key={a.label}>
        <Link
          className={`${CSS_CLASS.CALL_TO_ACTION_BUTTON} ${cssMode}`}
          variant={variant}
          href={a.link}
        >
          {a.label}
        </Link>
      </li>
    );
  });
  return (
    <section className={CSS_CLASS.CALL_TO_ACTION_SECTION}>
      <div className={CSS_CLASS.CALL_TO_ACTION}>
        <H2 node={action.label} />
        <div className={`fa-4x ${CSS_CLASS.CALL_TO_ACTION_ICON}`}>
          <i className={action.icon} />
        </div>
        <H3 node={action.title} />
        <P node={action.subTitle} />
        <ul
          className={`usa-list usa-list--unstyled ${CSS_CLASS.CALL_TO_ACTION_LIST}`}
        >
          {buttons}
        </ul>
      </div>
    </section>
  );
};
