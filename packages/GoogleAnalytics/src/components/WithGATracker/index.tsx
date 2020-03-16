import React, { Component, ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { trackPage } from '../../helpers';

type Props = RouteComponentProps;
type FlexComponent<T = {}> = ComponentType<T>;
type ConnectedFlexComponent = ConnectedComponent<FlexComponent<any>, any>;

/**
 * Higher Order Component (HOC) which handles Google Analytics page view tracking
 * @param {FlexComponent | ConnectedFlexComponent} WrappedComponent the component to be wrapped by the HOC component
 * @param {string} trackingCode Google analytics tracking code
 * @returns HOC rendering the WrappedComponent
 */
const WithGATracker = (WrappedComponent: FlexComponent | ConnectedFlexComponent) => {
  const WithGATrackerHOC = class extends Component<Props> {
    public componentDidMount() {
      // track the page view
      const page = `${this.props.location.pathname}${this.props.location.search}`;
      trackPage(page);
    }

    public componentDidUpdate(prevProps: Props) {
      const { location } = this.props;
      const previousPage = prevProps.location.pathname + prevProps.location.search;
      const currentPage = location.pathname + location.search;

      // track the page view here only if component didn't un/remount and the URL has updated
      if (previousPage !== currentPage) {
        trackPage(currentPage);
      }
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return WithGATrackerHOC;
};

export default WithGATracker;
