import { Link }         from '@trussworks/react-uswds';
import { CSS_CLASS }    from '../../lib';
import { noel }         from '../../lib/noel';
import { useGlobal }    from '../../state';
import { IFormCore }    from '../../survey';
import { IAction }      from '../../survey/IAction';
import { H2, H3, Span } from '../factories/NodeFactory';

export const Action = ({ action, page }:
  { action: Partial<IAction>, page: IFormCore }): JSX.Element => {
  const global     = useGlobal();
  const { config } = global;

  const buttons = action.buttons?.map((a) => {
    if (!a.link) {
      return noel();
    }
    let cssMode                                              = '';
    let variant: 'nav' | 'unstyled' | 'external' | undefined = 'nav';
    if (a.type === 'button') {
      cssMode = 'usa-button';
      variant = 'unstyled';
    }
    return (
      <li key={a.title}>
        <>
          <Link
            className={`${CSS_CLASS.CALL_TO_ACTION_BUTTON} ${cssMode}`}
            variant={variant}
            href={a.link}
            onClick={() => {
              config.events.action({ ...page, ...action });
            }}
          >
            {a.title}
          </Link>
        </>
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
        <Span node={action.subTitle} />
        <ul
          className={`usa-list usa-list--unstyled ${CSS_CLASS.CALL_TO_ACTION_LIST}`}
        >
          {buttons}
        </ul>
      </div>
    </section>
  );
};
