import type { RouteEntries } from './route-utils';

import home from './home';
import rounds from './rounds';
import round from './rounds/:roundId';
import rivalries from './rivalries';
import rivalry from './rivalries/:rivalryId';

export const routes = [
  {
    path: '/',
    entry: home,
  },
  {
    path: '/rounds',
    entry: rounds,
  },
  {
    path: '/rounds/:roundId',
    entry: round,
  },
  {
    path: '/rivalries',
    entry: rivalries,
  },
  {
    path: '/rivalries/:rivalryId',
    entry: rivalry,
  },
] satisfies RouteEntries;
