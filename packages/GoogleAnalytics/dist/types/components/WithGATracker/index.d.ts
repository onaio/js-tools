import React from 'react';
import { ConnectedComponent } from 'react-redux';
import { RouteComponentProps } from 'react-router';
declare type Props = RouteComponentProps;
/**
 * Higher Order Component (HOC) which handles Google Analytics page view tracking
 * @param {FlexComponent | ConnectedFlexComponent} WrappedComponent the component to be wrapped by the HOC component
 * @param {string} trackingCode Google analytics tracking code
 * @returns HOC rendering the WrappedComponent
 */
declare const WithGATracker: (
  WrappedComponent:
    | ConnectedComponent<React.ComponentType<any>, any>
    | React.ComponentClass<{}, any>
    | React.FunctionComponent<{}>
) => {
  contextType?: React.Context<any> | undefined;
  new (props: Readonly<Props>): {
    context: any;
    readonly props: Readonly<Props> &
      Readonly<{
        children?: React.ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: React.ReactInstance;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
    setState<K extends never>(
      state:
        | {}
        | ((prevState: Readonly<{}>, props: Readonly<Props>) => {} | Pick<{}, K> | null)
        | Pick<{}, K>
        | null,
      callback?: (() => void) | undefined
    ): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    shouldComponentUpdate?(
      nextProps: Readonly<Props>,
      nextState: Readonly<{}>,
      nextContext: any
    ): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<Props>, prevState: Readonly<{}>): any;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
    componentWillUpdate?(
      nextProps: Readonly<Props>,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<Props>,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
  };
  new (props: Props, context?: any): {
    context: any;
    readonly props: Readonly<Props> &
      Readonly<{
        children?: React.ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: React.ReactInstance;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
    setState<K extends never>(
      state:
        | {}
        | ((prevState: Readonly<{}>, props: Readonly<Props>) => {} | Pick<{}, K> | null)
        | Pick<{}, K>
        | null,
      callback?: (() => void) | undefined
    ): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    shouldComponentUpdate?(
      nextProps: Readonly<Props>,
      nextState: Readonly<{}>,
      nextContext: any
    ): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<Props>, prevState: Readonly<{}>): any;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
    componentWillUpdate?(
      nextProps: Readonly<Props>,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<Props>,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
  };
};
export default WithGATracker;
