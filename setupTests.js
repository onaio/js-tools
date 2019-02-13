// Note: we deliberately use the older require syntax here, so that
// setupTests.js is loadable without additional babel configuration.
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });