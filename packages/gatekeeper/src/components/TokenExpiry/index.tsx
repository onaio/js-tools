import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { LOGIN_BUTTON_TEXT, SESSION_EXPIRED_TEXT } from './constants';

/** TokenExpired props interface */
export interface TokenExpiredProps {
  logoutLinkText: string; // text on the logout link button
  logoutUrl: string;
  sessionExpiryText: string; // text informing users their session has expired
}

/** default page to display when token expires */
const TokenExpired = (props: TokenExpiredProps) => {
  const { logoutLinkText, logoutUrl, sessionExpiryText } = props;

  return (
    <Container
      fluid={true}
      style={{
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <Row style={{ marginTop: '40px' }} className="text-center">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2>{sessionExpiryText}</h2>
          <Link to={logoutUrl}>{logoutLinkText}</Link>
        </Col>
      </Row>
    </Container>
  );
};

/** default TokenExpired props */
type DefaultTokenExpiryProps = Pick<TokenExpiredProps, 'logoutLinkText' | 'sessionExpiryText'>;
const defaultTokenExpiryProps: DefaultTokenExpiryProps = {
  logoutLinkText: LOGIN_BUTTON_TEXT,
  sessionExpiryText: SESSION_EXPIRED_TEXT
};

TokenExpired.defaultProps = defaultTokenExpiryProps;
export { TokenExpired };
