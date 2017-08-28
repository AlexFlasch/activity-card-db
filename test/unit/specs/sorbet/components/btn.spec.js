import Btn from '@/components/sorbet/components/Btn.vue';

import { mount } from './../../util';

describe('Btn.vue', () => {
    it('should render properly', () => {
        const vm = mount(null, {
            render() {
                return (
                    <div>
                        <Btn>Test</Btn>
                    </div>
                );
            },
        });

        const btnEl = vm.$el.querySelector('.btn');

        expect(btnEl).to.have.text('Test');
    });

    it('should render different contexts', () => {
        const vm = mount(Btn, {
            propsData: {
                context: 'warning',
            },
        });

        expect(vm.$el).to.have.class('warning');
    });

    it('should properly disable', async function() {
        const getVm = disabled =>
            mount(Btn, {
                propsData: {
                    disabled,
                },
            });

        const disabledVm = getVm(true);

        expect(disabledVm.$el).to.have.class('disabled');

        const enabledVm = getVm(false);

        expect(enabledVm.$el).to.not.have.class('disabled');
    });
});
