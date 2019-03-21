import React from 'react';
/** Interface for ElementMap props */
export interface ElementMapProps {
  items: any[];
  HTMLTag: string;
  className?: string;
}
/** A simple component that takes a list of elements and a HTML tag and outputs
 * the same list of elements wrapped in the same HTML tag provided.
 */
declare class ElementMap extends React.Component<ElementMapProps, {}> {
  public static defaultProps: {
    className: string;
  };
  constructor(props: ElementMapProps);
  public render(): Array<
    React.ReactElement<
      {
        key: number;
        className: string | undefined;
      },
      | string
      | ((
          props: any
        ) => React.ReactElement<
          any,
          string | any | (new (props: any) => React.Component<any, any, any>)
        > | null)
      | (new (props: any) => React.Component<any, any, any>)
    >
  >;
}
export default ElementMap;
