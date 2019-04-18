import session, { initialState } from '@onaio/session-reducer';
import React, { useEffect, useReducer } from 'react';
import { fetchUser } from '../helpers/service';

/** something goes here */
const OauthCallback = (props: any) => {
  const [state, dispatch] = useReducer(session, initialState);

  useEffect(() => {
    if (state.authenticated === false) {
      fetchUser(props.location.hash, dispatch);
    }
  });

  return <p>callback {state.user.name}</p>;
};

export default OauthCallback;
