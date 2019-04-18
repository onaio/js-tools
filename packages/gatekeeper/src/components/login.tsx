import React from 'react';
import { onadataAuth } from '../helpers/oauth';

/** Component that will be rendered in drop-down table cells showing a link
 * that moves you to the next hierarchical level.
 */
const OauthLogin = (props: any) => {
  const uri = onadataAuth.token.getUri();
  return (
    <p>
      <a href={uri}>Login</a>
    </p>
  );
};

export default OauthLogin;
