import { ipcRenderer } from 'electron';

const state = {
    csvFiles: [],
};

const mutations = {
    GET_CSV_FILE_ARR: function getCSVFileArr(state, files) {
        state.csvFiles = files;
    },
    ADD_CSV_FILE: function addCSVFile(state, file) {
        state.csvFiles.push(file);
    },
};

const actions = {
    async getCsvFiles({ commit }) {
        ipcRenderer.send('get-csv-files');

        const response = await ipcRenderer.on('get-csv-files');

        debugger;

        commit('GET_CSV_FILE_ARR', response);
    },
    async addCsvFile({ commit }, fileOptions) {
        ipcRenderer.send('add-csv-file', fileOptions);

        const response = await ipcRenderer.on('add-csv-file');

        debugger;

        commit('ADD_CSV_FILE', response);
    },
};

const getters = {
    csvFiles(state) {
        return state.csvFiles;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
