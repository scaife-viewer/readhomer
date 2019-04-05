import Vue from 'vue';
import App from './App.vue';
import store from './store';

import SkeletonPlugin from './skeleton/plugin';
import globalComponents from './global-components';
import widgets from './widgets';

Vue.config.productionTip = false;

globalComponents.forEach((component) => {
  // eslint-disable-next-line no-underscore-dangle
  Vue.component(component.__file.split('/').pop().split('.')[0], component);
});

Vue.use(SkeletonPlugin, { widgets });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
