import Vue from 'vue';

import Sorbet from '@/components/sorbet';

import { watchConsoleErr } from '../../../test-util';

Vue.use(Sorbet);

describe('Btn.vue', () => {
    it('should render properly', () => {
        new Vue({
            el: document.createElement('div'),
            render: h => h('btn', 'Test'),
        });

        console.log(chalk.blue(document.querySelector('.sorbet.btn'))); // eslint-disable-line

        expect(document.querySelector('.sorbet.btn').textContent).to.contain('Test');
    });

    it('should validate invalid contexts', () => {
        const errors = [];

        watchConsoleErr(errors);

        new Vue({
            el: document.createElement('div'),
            render: h => h('btn', { context: 'foo' }, 'Test'),
        });

        expect(errors).to.have.lengthOf.at.least(1);
    });
});
