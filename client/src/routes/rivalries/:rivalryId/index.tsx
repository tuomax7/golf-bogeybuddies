import Fallback from './Rivalry.fallback';
import { routeEntry } from '../../route-utils';

export default routeEntry({
  path: '/rivalries/:rivalryId',
  fallback: <Fallback />,
  component: () => import('./Rivalry.page'),
});
