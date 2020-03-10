import { Registry } from '@onaio/redux-reducer-registry';
import React from 'react';
import { connect } from 'react-redux';
import { ActionCreator } from 'redux';

/** interface to describe Base options */
export interface CBVOptions<TAction, TSelector> {
  actionCreator: ActionCreator<TAction>;
  returnPropName: string;
  dispatchPropName: string;
  selector: TSelector;
}

/**
 * Base class
 *
 * This class is initialized with the following parameters:
 *    - component: a react component
 *    - options: an object representing options for Base
 *
 * The class's render method will then return the same component wrapped in a
 * higher order component that has been connected to the redux store, and which
 * knows how to fetch data for display.
 *
 * The end goal is a quick and convenient way to display a list of objects without
 * having to worry about boilerplate code that deal with fetching objects and
 * storing them in a Redux store.
 *
 * Every method in this class can and should be overwritten to cater to custom needs.
 */
export abstract class Base<ActionType, SelectorType, PropsType, RootState = Registry> {
  public Component: React.ElementType;
  public options: CBVOptions<ActionType, SelectorType>;

  /** constructor */
  constructor(component: React.ElementType, options: CBVOptions<ActionType, SelectorType>) {
    this.Component = component;
    this.options = options;
  }

  /**
   * This function returns a Higher Order component whose job is to wrap around
   * the target component, and pass on props to it.
   *
   * This must be implemented.
   */
  public abstract getHOC(): React.ComponentType<any>; // TODO: find a way to remove any here

  /**
   * The mapDispatchToProps function
   * You may override this for more custom needs.
   */
  public getMapDispatchToProps() {
    return { [this.options.dispatchPropName]: this.options.actionCreator };
  }

  /**
   * The mapStateToProps function
   *
   * This must be implemented.
   */
  public abstract getMapStateToProps(): (
    state: RootState,
    ownProps: PropsType
  ) => { [key: string]: any };

  /**
   * This function simply connects the Higher Order Component to the redux
   * store.
   */
  public getConnectedHOC() {
    /** map dispatch to props */
    const mapDispatchToProps = this.getMapDispatchToProps();
    /** map state to props */
    const mapStateToProps = this.getMapStateToProps();
    /** connect to store */
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(this.getHOC());
  }

  /**
   * This function returns the connected higher order component.
   */
  public render() {
    return this.getConnectedHOC();
  }
}
