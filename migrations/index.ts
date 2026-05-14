import * as migration_20260506_130355_initial from './20260506_130355_initial';
import * as migration_20260514_add_posts from './20260514_add_posts';

export const migrations = [
  {
    up: migration_20260506_130355_initial.up,
    down: migration_20260506_130355_initial.down,
    name: '20260506_130355_initial'
  },
  {
    up: migration_20260514_add_posts.up,
    down: migration_20260514_add_posts.down,
    name: '20260514_add_posts'
  },
];
