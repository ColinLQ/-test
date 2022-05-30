import { createApp } from 'vue';
import _ from 'lodash';
import App from './app.vue';
import router from './router';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

import component from '@/components';

import 'normalize.css';
import '@/styles/global.scss';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $get: any
  }
}

const { VUE_SENTRY_DSN, VUE_APP_ENV } = process.env;
const app = createApp(App);
app.config.globalProperties.$get = _.get;

if (VUE_APP_ENV !== 'development' && VUE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: VUE_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', /^\//],
      }),
    ],
    environment: VUE_APP_ENV,
    release: VUE_APP_ENV,
    tracesSampleRate: 1.0,
  });
}

app.use(component);
app.use(router).mount('#app');

