/// <reference types="react" />
import { User } from '@onaio/session-reducer';
/** describing props for the util components */
interface Props {
    message: string;
}
/** default 404 page component */
export declare const Component404: ({ message }: Props) => JSX.Element;
/** error page component */
export declare const RenderErrorComponent: ({ message }: Props) => JSX.Element;
/** loading component */
export declare const RenderLoadingComponent: ({ message }: Props) => JSX.Element;
/** interface for SuccessfulLogin props */
export interface SuccessfulLoginProps {
    extraData?: {
        [key: string]: any;
    } /** can be an object with any properties */;
    user: User;
}
/** successful login page component */
export declare const SuccessfulLogin: (props: SuccessfulLoginProps) => JSX.Element;
export {};
