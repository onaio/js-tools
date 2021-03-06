/// <reference types="react" />
import { Registry } from '@onaio/redux-reducer-registry';
import { ActionCreator } from 'redux';
import { Base } from './Base';
/** interface for the props of the connected component created by ObjectList
 * @typeparam TAction - the type definition for the Action.
 * @typeparam TObject - the type definition for the Object that we are fetching
 *            from the Redux store.
 */
interface ObjectListProps<TAction, TObject> {
  actionCreator: ActionCreator<TAction>;
  objectList: TObject[];
}
/**
 * ObjectList class
 *
 * This class is initialized with the following parameters:
 *    - component: a react component
 *    - options: an object representing options for ObjectList
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
 *
 * @typeparam ObjectType - the type definition for the Object that we are fetching
 *            from the Redux store.
 * @typeparam ActionType - the type definition for the Action.
 * @typeparam SelectorType - the type definition for the Selector.
 * @typeparam PropsType - the type definition for the props that the connected component takes.
 * @typeparam RootState - the type definition for the Redux store (global state).
 */
export declare class ObjectList<
  ObjectType,
  ActionType,
  SelectorType,
  PropsType,
  RootState = Registry
> extends Base<ActionType, SelectorType, PropsType, RootState> {
  /**
   * This function returns a Higher Order component whose job is to wrap around
   * the target component, and pass on props to it.  The props in this case are:
   *     - the list of objects to be displayed
   *     - the action creator dispatch function
   */
  public getHOC(): {
    (props: ObjectListProps<ActionType, ObjectType>): JSX.Element;
    /** Let's declare default props for this higher order component */
    defaultProps: {
      actionCreator: ActionCreator<ActionType>;
      objectList: never[];
    };
  };
  /**
   * The mapStateToProps function
   * You may override this for more custom needs.
   */
  public getMapStateToProps(): (
    state: RootState,
    ownProps: PropsType
  ) => {
    [x: string]: any;
  };
}
export {};
