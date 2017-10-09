import { ipcRenderer } from 'electron';

const state = {
    csvFiles: [],
    csvHeaders: {},
};

function noop() { }

const mutations = {
    SET_CSV_HEADERS: (state, csvHeaders) => {
        state.csvHeaders = csvHeaders;
    },
    SET_CSV_FILE_ARR: (state, files) => {
        state.csvFiles = files;
    },
    UPDATE_CSV_FILE_ARR: (state, files) => {
        state.csvFiles = files;
    },
    ADD_CSV_FILE: (state, file) => {
        state.csvFiles.push(file);
    },
    UPDATE_CSV_FILE: (state, file) => {
        let fileIndex;
        state.csvFiles.find((f, index) => {
            fileIndex = index;
            return f.filename === file.filename;
        });

        state.csvFiles[fileIndex] = file;
    },
    REMOVE_CSV_FILE: (state, file) => {
        let fileIndex;
        state.csvFiles.find((f, index) => {
            fileIndex = index;
            return f.filename === file.filename;
        });

        state.csvFiles.splice(fileIndex, 1);
    },
};

const actions = {
    setCsvHeaders({ commit }, csvHeaders) {
        commit('SET_CSV_HEADERS', csvHeaders);
    },
    setCsvFiles({ commit }, fileArr) {
        commit('SET_CSV_FILE_ARR', fileArr);
    },
    getCsvFiles({ commit }) {
        ipcRenderer.send('get-csv-files');

        ipcRenderer.once('found-csv-files', (event, arg) => {
            commit('UPDATE_CSV_FILE_ARR', arg);
        });
    },
    addCsvFile({ commit }, fileData) {
        ipcRenderer.send('create-csv-file', fileData);

        ipcRenderer.once('csv-file-created', (event, arg) => {
            // blame this comparison on eslint
            arg === true
                ? commit('ADD_CSV_FILE', fileData.filename)
                : noop();
        });
    },
    updateCsvFile({ commit }, fileData) {
        ipcRenderer.send('update-csv-file', fileData);

        ipcRenderer.once('csv-file-updated', (event, arg) => {
            arg === true
                ? commit('UPDATE_CSV_FILE', fileData)
                : noop();
        });
    },
    removeCsvFile({ commit }, fileData) {
        // this doesn't actually delete the file off the system
        // it simply hides the file from being shown in the application
        ipcRenderer.send('remove-csv-file', fileData.filename);

        ipcRenderer.once('csv-file-removed', (event, arg) => {
            arg === true
                ? commit('REMOVE_CSV_FILE', fileData)
                : noop();
        });
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
