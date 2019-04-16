/** Redux reducer registry module */
import reducerRegistry, { Registry } from './registry';
import store, { combine, getStore } from './store';
export { store, getStore, combine, Registry };
export default reducerRegistry;
