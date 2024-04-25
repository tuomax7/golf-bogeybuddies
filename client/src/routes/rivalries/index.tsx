import Fallback from './Rivalries.fallback';
import { routeEntry } from '../route-utils';

export default routeEntry({
  path: '/rivalries',
  fallback: <Fallback />,
  component: () => import('./Rivalries.page'),
});
