import { User } from '@onaio/session-reducer';
import {
  AN_ERROR_OCCURRED,
  NOTHING_HERE,
  PLEASE_WAIT,
  WELCOME_BACK
} from 'gatekeeper/src/helpers/constants';
import React from 'react';

/** describing props for the util components */
interface Props {
  message?: string;
}

/** default 404 page component */
export const Component404 = ({ message = NOTHING_HERE }: Props) => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">{message}</p>
    </div>
  );
};

/** error page component */
export const RenderErrorComponent = ({ message = AN_ERROR_OCCURRED }: Props) => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">{message}</p>
    </div>
  );
};

/** loading component */
export const RenderLoadingComponent = ({ message = PLEASE_WAIT }: Props) => {
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">{message}</p>
    </div>
  );
};

/** interface for SuccessfulLogin props */
export interface SuccessfulLoginProps {
  extraData?: { [key: string]: any } /** can be an object with any properties */;
  user: User;
}

/** successful login page component */
export const SuccessfulLogin = (props: SuccessfulLoginProps) => {
  const { user } = props;
  return (
    <div className="gatekeeper-cb">
      <p className="gatekeeper-p">
        `${WELCOME_BACK}, {user.username}!`
      </p>
    </div>
  );
};
