// import util from 'util';
// import chalk from 'chalk';
import Vue from 'vue';

import Sorbet from '@/components/sorbet';
import HomePage from '@/pages/Home';

Vue.use(Sorbet);

describe('Home.vue', () => {
    it('should render correct contents', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: h => h(HomePage),
        }).$mount();

        expect(vm.$el.textContent).to.contain('Add a new year');
    });
});
