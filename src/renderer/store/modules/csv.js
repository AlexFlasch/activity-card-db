import { ipcRenderer } from 'electron';

const state = {
    csvFiles: [],
};

const mutations = {
    GET_CSV_FILE_ARR: async function getCSVFileArr(state) {
        ipcRenderer.send('get-csv-files');

        const response = await ipcRenderer.on('get-csv-files');

        debugger;

        state.csvFiles = response;
    },
};

const actions = {
    getCsvFiles({ commit }) {
        // do something async
        commit('GET_CSV_FILE_ARR');
    },
};

export default {
    state,
    mutations,
    actions,
};
