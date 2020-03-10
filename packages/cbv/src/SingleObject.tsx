import { Registry } from '@onaio/redux-reducer-registry';
import React from 'react';
import { ActionCreator } from 'redux';
import { Base } from './Base';

/** interface for the props of the connected component created by SingleObject  */
interface SingleObjectProps<TAction, TObject> {
  actionCreator: ActionCreator<TAction>;
  object?: TObject;
}

/**
 * SingleObject class
 *
 * This class is initialized with the following parameters:
 *    - component: a react component
 *    - options: an object representing options for SingleObject
 *
 * The class's render method will then return the same component wrapped in a
 * higher order component that has been connected to the redux store, and which
 * knows how to fetch data for display.
 *
 * The end goal is a quick and convenient way to display a singular objects without
 * having to worry about boilerplate code that deal with fetching it and
 * storing it in a Redux store.
 *
 * Every method in this class can and should be overwritten to cater to custom needs.
 */
// export class SingleObject<ObjectType, ActionType, SelectorType, PropsType, RootState = Registry> {
export class SingleObject<
  ObjectType,
  ActionType,
  SelectorType,
  PropsType,
  RootState = Registry
> extends Base<ActionType, SelectorType, PropsType, RootState> {
  /**
   * This function returns a Higher Order component whose job is to wrap around
   * the target component, and pass on props to it.  The props in this case are:
   *     - the singular object to be displayed
   *     - the action creator dispatch function
   */
  public getHOC() {
    const HoC = (props: SingleObjectProps<ActionType, ObjectType>) => {
      return <this.Component {...props} />;
    };

    /** Let's declare default props for this higher order component */
    HoC.defaultProps = {
      actionCreator: this.options.actionCreator
    };

    return HoC;
  }

  /**
   * The mapStateToProps function
   * You may override this for more custom needs.
   */
  public getMapStateToProps() {
    return (state: RootState, ownProps: PropsType) => {
      // we have to use a Type Guard to check if this.options.selector is a
      // callable/function otherwise Typescript will infer its type as "unknown"
      // TODO: look into whether there is a better fix for this
      if (typeof this.options.selector === 'function') {
        return {
          [this.options.returnPropName]: this.options.selector(state, ownProps)
        };
      }
      // if the TypeGuard fails lets return null
      return { [this.options.returnPropName]: null };
    };
  }
}
