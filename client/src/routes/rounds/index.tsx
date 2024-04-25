import Fallback from './Rounds.fallback';
import { routeEntry } from '../route-utils';

export default routeEntry({
  path: '/rounds',
  fallback: <Fallback />,
  component: () => import('./Rounds.page'),
});
