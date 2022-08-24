import type { DurationUnitsType } from './src/index';

declare global  {
  interface Storage {
    setExpireItem: (key: string, value: any, duration: DurationUnitsType) => void;
    getExpireItem: (key: string) => any;
  }
}

export {}
