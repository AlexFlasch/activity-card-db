import components from './components';
import directives from './directives';
import settings from './settings';

export default {
    install(Vue) {
        // register all Sorbet components
        Object.keys(components).forEach((el) => {
            // console.log(`registering Sorbet component ${components[el].name}`);
            Vue.component(components[el].name, components[el]);
        });

        // register all Sorbet directives
        Object.keys(directives).forEach((el) => {
            // console.log(`registering Sorbet directive ${directives[el].directiveName}`);
            Vue.directive(directives[el].directiveName, directives[el]);
        });
    },
    settings,
};
