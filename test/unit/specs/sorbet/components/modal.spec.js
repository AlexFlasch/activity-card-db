// import { inspect } from 'util';
import Modal from '@/components/sorbet/components/Modal';
import { mount } from './../../../util';

describe('Modal.vue', () => {
    it('should render properly', () => {
        const vm = mount(null, {
            render() {
                return (
                    <div>
                        <Modal open={false}>Testing modal</Modal>
                    </div>
                );
            },
        });

        const modalEl = vm.$el.querySelector('.modal-container');

        expect([...modalEl.classList]).to.not.contain('shown');
        expect(modalEl.querySelector('.content')).to.have.text('Testing modal');
    });

    it('should properly show and hide', () => {
        const vm = mount(Modal, {
            propsData: {
                open: true,
            },
        });

        sinon.spy(vm, '$emit');

        vm.closeModal();

        expect(vm.$emit).to.have.been.calledWith('update:open', false);

        vm.$emit('update:open', true);

        expect(vm.$el.querySelector('.modal-container')).to.have.class('shown');
    });

    it('should respect clickAway setting', async function() {
        const getVm = (open, clickAway) =>
            mount(Modal, {
                propsData: {
                    open,
                    clickAway,
                },
            });

        const clickAwayVm = getVm(true, true);

        sinon.spy(clickAwayVm, '$emit');

        clickAwayVm.backdropClick();

        await clickAwayVm.$nextTick(() => { });

        expect(clickAwayVm.$emit).to.have.been.calledWith('update:open', false);

        const nonClickAwayVm = getVm(true, false);
        sinon.spy(nonClickAwayVm, '$emit');

        nonClickAwayVm.backdropClick();

        await nonClickAwayVm.$nextTick(() => { });

        expect(nonClickAwayVm.$emit).to.not.have.been.calledWith('update:open', false);
    });
});
