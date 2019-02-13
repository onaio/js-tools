// This component takes a list of elements and returns them wrapped
// in the provided HTML tag
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ElementMap extends Component {
  render() {
    const { items } = this.props;
    const { className } = this.props;
    const { HTMLTag } = this.props;
    // use React.createElement to create the html tag
    // in a dynamic way
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

ElementMap.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  HTMLTag: PropTypes.string.isRequired,
  className: PropTypes.string
};

ElementMap.defaultProps = {
  className: ''
};

export default ElementMap;
