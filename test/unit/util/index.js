import Vue from 'vue';

import Sorbet from '@/components/sorbet';

export const simulate = function simulate(el, etype) {
    const evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
};

export const mount = function mount(component, options) {
    let Ctr;

    // allow mounting a full Vue instance
    if(component === null || component === undefined) {
        Ctr = Vue;
    } else {
        Ctr = Vue.extend(component);
    }

    Ctr.use(Sorbet);

    return new Ctr(options).$mount();
};
