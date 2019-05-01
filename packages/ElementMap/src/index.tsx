import React from 'react';

/** Interface for ElementMap props */
export interface ElementMapProps {
  items: any[];
  HTMLTag: string;
  className: string;
}

/** default props for ElementMap */
const defaultElementMapProps: Partial<ElementMapProps> = {
  className: 'element-map'
};

/** A simple component that takes a list of elements and a HTML tag and outputs
 * the same list of elements wrapped in the same HTML tag provided.
 */
class ElementMap extends React.Component<ElementMapProps, {}> {
  public static defaultProps = defaultElementMapProps;

  constructor(props: ElementMapProps) {
    super(props);
  }

  public render() {
    const { HTMLTag, className, items } = this.props;
    /** use React.createElement to create the html tag in a dynamic way */
    const listItems = items.map((item, key) =>
      React.createElement(
        HTMLTag,
        /* eslint-disable react/no-array-index-key */
        { key, className },
        /* eslint-enable react/no-array-index-key */
        item
      )
    );
    return listItems;
  }
}

export default ElementMap;
