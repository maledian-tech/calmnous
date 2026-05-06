import * as migration_20260506_130355_initial from './20260506_130355_initial';

export const migrations = [
  {
    up: migration_20260506_130355_initial.up,
    down: migration_20260506_130355_initial.down,
    name: '20260506_130355_initial'
  },
];
