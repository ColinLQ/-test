import { App } from 'vue';

export default {
  install(app: App) {
    app.component('GlobalHeader', require('./header').default);
    app.component('GlobalFooter', require('./footer').default);
  }
};
