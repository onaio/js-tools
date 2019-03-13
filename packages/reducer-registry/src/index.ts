/** Redux reducer registry module */
import reducerRegistry from './registry';
import store, { combine, getStore } from './store';

export { store, getStore, combine };

export default reducerRegistry;
