import { isValidElement, ReactNode } from 'react';
import { noel }                      from '../../lib/noop';

type TEl = {
  className?: string;
  node: TParam;
};

type TParam = ReactNode | string | undefined;

type TNodeType = 'div' | 'p' | 'span' | 'h2';

abstract class NodeFactory {
  private static element(node: TParam): JSX.Element | null {
    switch (typeof node) {
      case 'string':
        return (<>{node}</>);
      case 'bigint':
      case 'boolean':
      case 'undefined':
        return null;
      default:
        if (node === null || node === undefined) {
          return null;
        }
        if (isValidElement(node)) {
          return node as JSX.Element;
        }
        return null;
    }
  }

  private static node(node: TParam, type: TNodeType, className = ''): JSX.Element {
    const el = NodeFactory.element(node);
    if (!el) {
      return noel();
    }
    switch (type) {
      case 'p':
        return (<p className={className}>{el}</p>);
      case 'div':
        return (<div className={className}>{el}</div>);
      case 'span':
        return (<span className={className}>{el}</span>);
      case 'h2':
        return (<h2 className={className}>{el}</h2>);
      default:
        return noel();
    }
  }

  public static P({ node, className }: TEl): JSX.Element {
    return NodeFactory.node(node, 'p', className);
  }

  public static Div({ node, className }: TEl): JSX.Element {
    return NodeFactory.node(node, 'div', className);
  }

  public static Span({ node, className }: TEl): JSX.Element {
    return NodeFactory.node(node, 'span', className);
  }

  public static H2({ node, className }: TEl): JSX.Element {
    return NodeFactory.node(node, 'h2', className);
  }
}

export const {
  Div,
  H2,
  P,
  Span,
} = NodeFactory;
