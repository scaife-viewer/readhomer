import Vue from 'vue';
import App from './App.vue';
import store from './store';

import SkeletonPlugin from './skeleton/plugin';
import widgets from './widgets';

Vue.config.productionTip = false;

// Register what's in the global components directory.
const globalComponents = require.context('./global-components', true, /\.vue$/i);

globalComponents.keys().forEach((path) => {
  // Component's filename without the extension.
  const name = path.split('/').pop().split('.')[0];
  Vue.component(name, globalComponents(path).default);
});

Vue.use(SkeletonPlugin, { widgets });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
