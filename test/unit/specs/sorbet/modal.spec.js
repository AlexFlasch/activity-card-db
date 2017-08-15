import { beforeEachHooks, afterEachHooks, mount } from 'vue-unit';

import Modal from '@/components/sorbet/components/Modal';

describe('Modal.vue', () => {
    beforeEach(beforeEachHooks);

    it('should render properly', () => {
        const vm = mount(Modal, {}, {}, '<span>Testing modal</span>');

        expect([...vm.$el.classList]).to.not.contain('shown');
    });

    it('should properly show and hide', () => {
        const vm = mount(Modal, { shown: false });
    })

    afterEach(afterEachHooks);
});
