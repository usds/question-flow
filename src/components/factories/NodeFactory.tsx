import {
  createElement, isValidElement, ReactHTML, ReactNode,
} from 'react';
import { noel } from '../../lib/noop';

type TEl = {
  className?: string;
  node: TParam;
};

type TParam = ReactNode | string | undefined;

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

  public static P({ node, className }: TEl): JSX.Element {
    return NodeFactory.Node(node, 'p', className);
  }

  public static Div({ node, className }: TEl): JSX.Element {
    return NodeFactory.Node(node, 'div', className);
  }

  public static Span({ node, className }: TEl): JSX.Element {
    return NodeFactory.Node(node, 'span', className);
  }

  public static H2({ node, className }: TEl): JSX.Element {
    return NodeFactory.Node(node, 'h2', className);
  }

  static Node(node: TParam, type: keyof ReactHTML, className = ''): JSX.Element {
    const el = NodeFactory.element(node);
    if (!el) {
      return noel();
    }
    return createElement(type, { ...{ className } }, el);
  }
}

export const {
  Div,
  H2,
  P,
  Span,
  Node,
} = NodeFactory;
