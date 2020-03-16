import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
export declare type FlexComponent<T = {}> = ComponentType<T>;
export declare type ConnectedFlexComponent = ConnectedComponent<FlexComponent<any>, any>;
