import Card from '@/components/sorbet/components/Card';

import { mount } from './../../util';

describe('Card.vue', () => {
    it('should render properly', () => {
        const vm = mount(null, {
            render() {
                return (
                    <div>
                        <Card depth="3">Test</Card>
                    </div>
                );
            },
        });

        const cardEl = vm.$el.querySelector('.card-container');

        expect(cardEl.textContent).to.contain('Test');
        expect(cardEl).to.have.class('depth-3');
    });

    it('should handle number and string depth', () => {
        const stringVm = mount(Card, {
            propsData: {
                depth: '3',
            },
        });

        const numberVm = mount(Card, {
            propsData: {
                depth: 3,
            },
        });

        expect(stringVm.$el).to.have.class('depth-3');
        expect(numberVm.$el).to.have.class('depth-3');
    });
});
