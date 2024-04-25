import Fallback from './Round.fallback';
import { routeEntry } from '../../route-utils';

export default routeEntry({
  path: '/rounds/:roundId',
  fallback: <Fallback />,
  component: () => import('./Round.page'),
});
