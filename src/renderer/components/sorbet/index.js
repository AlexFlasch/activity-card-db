import components from './components';
import settings from './settings';

export default {
    install(Vue) {
        // register all Sorbet components
        Object.keys(components).forEach((el) => {
            // console.log(`registering Sorbet component ${components[el].name}`);
            Vue.component(components[el].name, components[el]);
        });
    },
    settings,
};
