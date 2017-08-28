import Icon from '@/components/sorbet/components/Icon';

import { mount } from './../../util';

describe('Icon.vue', () => {
    it('should render correctly as icon-font', () => {
        const vm = mount(Icon, {
            propsData: {
                name: 'fe-cross',
                iconType: 'icon-font',
            },
        });

        vm.$el.should.match('i.sorbet.icon.fe.fe-cross');
    });

    it('should render correctly as svg font', () => {
        const vm = mount(Icon, {
            propsData: {
                name: 'fe-cross',
                iconType: 'svg',
            },
        });

        expect(vm.$el.tagName).to.equal('svg');
        expect([...vm.$el.classList]).to.include('fe-cross');
        expect(vm.$el.querySelector('use')).to.have.attr('xlink:href', '#fe-cross');
    });

    it('should render all sizes correctly', () => {
        const createSizeVm = function(size) {
            return mount(Icon, {
                propsData: {
                    name: 'fe-cross',
                    size,
                },
            });
        };

        const xsVm = createSizeVm('xs');
        const smVm = createSizeVm('sm');
        const mdVm = createSizeVm('md');
        const lgVm = createSizeVm('lg');
        const xlVm = createSizeVm('xl');

        expect(xsVm.$el).to.have.class('xs');
        expect(smVm.$el).to.have.class('sm');
        expect(mdVm.$el).to.have.class('md');
        expect(lgVm.$el).to.have.class('lg');
        expect(xlVm.$el).to.have.class('xl');
    });
});
