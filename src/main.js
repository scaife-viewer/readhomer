import Vue from 'vue';
import App from './App.vue';
import store from './store';

import SkeletonPlugin from './skeleton/plugin';
import globalComponents from './global-components';
import widgets from './widgets';

Vue.config.productionTip = false;

Object.entries(globalComponents).forEach(([globalName, component]) => {
  Vue.component(globalName, component);
});

Vue.use(SkeletonPlugin, { widgets });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
