import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
/**
 * Generic type for a react component
 */
export declare type FlexComponent<T = {}> = ComponentType<T>;
/**
 * Generic type for a react connected component
 */
export declare type ConnectedFlexComponent = ConnectedComponent<FlexComponent<any>, any>;
