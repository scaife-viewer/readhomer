class Skeleton {
  constructor(widgets) {
    console.log(widgets);
    this.widgets = widgets;
  }

  widgetOptions(location, mainWidget, leftWidgets, rightWidgets) {
    return Object.keys(this.widgets)
      .filter((name) => {
        const config = this.widgets[name].scaifeConfig;
        return config.location === location || config.location === 'both';
      })
      .filter((name) => {
        const config = this.widgets[name].scaifeConfig;
        // only show widgets if they haven't already been used in the case of it
        // being marked a singleton, unless the location is main.
        if (config.singleton) {
          const notInMain = mainWidget !== name;
          const notInLeft = leftWidgets[name] === undefined;
          const notInRight = rightWidgets[name] === undefined;
          return (location === 'main' && notInLeft && notInRight) || (notInMain && notInLeft && notInRight);
        }
        return true;
      })
      .map(name => ({
        text: this.widgets[name].scaifeConfig.displayName,
        component: this.widgets[name],
      }));
  }
}

const install = (Vue, options) => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$scaife = Vue.prototype.$scaife || {};
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$scaife = {
    ...Vue.prototype.$scaife,
    skeleton: new Skeleton(options.widgets),
  };
};

const SkeletonPlugin = { install };

export default SkeletonPlugin;
