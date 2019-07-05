// Note: we deliberately use the older require syntax here, so that
// setupTests.js is loadable without additional babel configuration.
// eslint-disable-next-line import/no-extraneous-dependencies
const enzyme = require('enzyme');
// eslint-disable-next-line import/no-extraneous-dependencies
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
