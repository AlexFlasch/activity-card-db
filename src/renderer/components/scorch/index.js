import components from './components';
import settings from './settings';

export default {
    install(Vue, options) {
        // merge default settings with user settings
        const modifiedSettings = {
            ...settings,
            ...options,
        };

        // create link element for google fonts or local font to be put into
        const fontLink = document.createElement('link');

        // define rel and href attributes for the stylesheet
        const hrefAttr = document.createAttribute('href');
        const relAttr = document.createAttribute('rel');

        // assign the attrs to the link element
        fontLink.setAttributeNode(hrefAttr);
        fontLink.setAttributeNode(relAttr);

        // assign the attrs the values defined in settings
        hrefAttr.value = modifiedSettings.fontSrc;
        relAttr.value = 'stylesheet';

        // installs Scorch into the Vue vm.
        Vue.mixin({
            mounted() {
                this.$root.$el.appendChild(fontLink);
                this.$root.$el.style.fontFamily = modifiedSettings.fontFamily;
            },
        });

        // register all Scorch components
        Object.keys(components).forEach((el) => {
            // console.log(`registering Scorch component ${components[el].name}`);
            Vue.component(components[el].name, components[el]);
        });
    },
    settings,
};
