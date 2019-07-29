import Vue from 'vue';
import App from './App.vue';
import store from './store';

import globalComponents from './global-components';
import SkeletonPlugin from './skeleton/plugin';
import widgets from './widgets';

Vue.config.productionTip = false;

// Register exported global components.
Object.entries(globalComponents).forEach(([name, component]) => {
  Vue.component(name, component);
});

Vue.use(SkeletonPlugin, { widgets });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
