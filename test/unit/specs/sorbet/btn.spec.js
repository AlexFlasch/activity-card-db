import { beforeEachHooks, afterEachHooks, mount } from 'vue-unit';

import Btn from '@/components/sorbet/components/Btn.vue';

describe('Btn.vue', () => {
    beforeEach(beforeEachHooks);

    it('should render properly', () => {
        const vm = mount(Btn, {}, {}, '<span>Test</span>');

        expect(vm.$el).to.have.text('Test');
    });

    it('should render different contexts', () => {
        const vm = mount(Btn, { context: 'warning' });

        expect(vm.$el).to.have.class('warning');
    });

    afterEach(afterEachHooks);
});
