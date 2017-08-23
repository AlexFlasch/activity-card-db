import TextInput from '@/components/sorbet/components/TextInput';

import { mount } from './../../util';

describe('TextInput.vue', () => {
    it('should render correctly', () => {
        const vm = mount(TextInput);

        expect(vm.$el.querySelectorAll('.sorbet-input')).to.have.lengthOf(1);
    });

    it('should render correct input type', () => {
        const textVm = mount(TextInput);
        const numberVm = mount(TextInput, { propsData: { type: 'number' } });
        const passwordVm = mount(TextInput, { propsData: { type: 'password' } });
        const emailVm = mount(TextInput, { propsData: { type: 'email' } });
        const urlVm = mount(TextInput, { propsData: { type: 'url' } });

        expect(textVm.$el.querySelector('.sorbet-input')).to.have.attr('type', 'text');
        expect(numberVm.$el.querySelector('.sorbet-input')).to.have.attr('type', 'number');
        expect(passwordVm.$el.querySelector('.sorbet-input')).to.have.attr('type', 'password');
        expect(emailVm.$el.querySelector('.sorbet-input')).to.have.attr('type', 'email');
        expect(urlVm.$el.querySelector('.sorbet-input')).to.have.attr('type', 'url');
    });
});
