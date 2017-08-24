import Vuex from 'vuex';

// import { inspect } from 'util';

import HomePage from '@/pages/Home';
import { mount, simulate } from './../util';

describe('Home.vue', () => {
    let store;
    let mutations;
    let getters;
    let actions;
    let state;

    beforeEach(() => {
        mutations = {
            addCsvFile(state, newFile) {
                state.csvFiles.push(newFile);
            },
        };
        getters = {
            csvFiles(state) {
                return state.csvFiles;
            },
        };
        actions = {
            async getCsvFiles() {
                return state.csvFiles;
            },
            async addCsvFile({ commit }, fileOptions) {
                commit('addCsvFile', fileOptions);
            },
        };
        state = {
            csvFiles: [
                { name: 'Test Year 1' },
                { name: 'Test Year 2' },
            ],
        };
        store = new Vuex.Store({
            strict: true,
            state,
            mutations,
            actions,
            getters,
        });
    });

    it('should render correct contents', () => {
        const vm = mount(HomePage, { store });

        expect(vm.$el.querySelector('.add-year').textContent).to.contain('Add a new year');
    });

    it('should show modal component', () => {
        const vm = mount(HomePage, { store });

        const addYearEl = vm.$el.querySelector('.add-year');

        simulate(addYearEl, 'click');

        expect(vm.modalOpen).to.equal(true);
    });

    it('should render cards for each year', () => {
        const vm = mount(HomePage, { store });

        const cards = vm.$el.querySelectorAll('.card-container');

        // test rendering
        expect(cards).to.be.lengthOf(3); // 2 cards for years, 1 card for add-year
        expect(cards[0].textContent).to.contain('Test Year 1');
        expect(cards[1].textContent).to.contain('Test Year 2');
    });

    it('should add a card', () => {
        const vm = mount(HomePage, { store });

        let cards = vm.$el.querySelectorAll('.card-container');

        expect(cards.length).to.equal(3);

        vm.addYear({ filename: 'Test 3' });

        vm.$nextTick(() => {
            cards = vm.$el.querySelectorAll('.card-container');

            expect(cards.length).to.equal(4);
        });
    });
});
