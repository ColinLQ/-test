import type { LoDashStatic } from 'lodash';

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $get: LoDashStatic['get']
  }
}

// 如果有一个import引入，就不需要export｛｝
export {}
