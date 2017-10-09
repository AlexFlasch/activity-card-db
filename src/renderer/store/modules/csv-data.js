import { ipcRenderer } from 'electron';

const state = {
    selectedCsvFile: '',
    columns: [],
    rows: [],
};

function noop() { }

const mutations = {
    SELECT_FILE(state, filename, rows) {
        state.selectedCsvFile = filename;
        state.rows = rows;
    },
    DESELECT_FILE(state) {
        state.selectedCsvFile = '';
        state.rows = [];
    },
    SET_COLUMNS(state, columns) {
        state.columns = columns;
    },
    ADD_ROW(state, row) {
        state.rows.push(row);
    },
    UPDATE_ROW(state, row) {
        let matchedRowIndex;

        state.rows.forEach((r, i) => {
            if(row.index === r.index) {
                matchedRowIndex = i;
            }
        });

        state.rows[matchedRowIndex] = row;
    },
    REMOVE_ROW(state, row) {
        let matchedRowIndex;

        state.rows.forEach((r, i) => {
            if(row.index === r.index) {
                matchedRowIndex = i;
            }
        });

        state.rows.splice(matchedRowIndex, 1);
    },
};

const actions = {
    async selectCsvFile({ commit }, filename) {
        ipcRenderer.send('get-csv-file', filename);

        ipcRenderer.once('found-csv-file', (event, arg) => {
            if(arg === false) {
                noop();
            } else {
                commit('SELECT_FILE', filename, arg);
            }
        });
    },
    deselectCsvFile({ commit }) {
        commit('DESELECT_FILE');
    },
    setCsvColumns({ commit }, columns) {
        commit('SET_COLUMNS', columns);
    },
    updateCsvColumns({ commit }, columns) {
        ipcRenderer.send('update-csv-columns', columns);

        ipcRenderer.once('csv-columns-updated', (event, arg) => {
            arg === true
                ? commit('SET_COLUMNS', columns)
                : noop();
        });
    },
    addRow({ commit }, row) {
        ipcRenderer.send('add-row', row);

        ipcRenderer.once('row-added', (event, arg) => {
            arg === true
                ? commit('ADD_ROW', row)
                : noop();
        });
    },
    updateRow({ commit }, row) {
        ipcRenderer.send('update-row', row);

        ipcRenderer.once('row-updated', (event, arg) => {
            arg === true
                ? commit('UPDATE_ROW', row)
                : noop();
        });
    },
    removeRow({ commit }, row) {
        ipcRenderer.send('remove-row', row);

        ipcRenderer.once('row-removed', (event, arg) => {
            arg === true
                ? commit('REMOVE_ROW', row)
                : noop();
        });
    },
};

const getters = {
    selectedCsvFile(state) {
        return state.selectedCsvFile;
    },
    columns(state) {
        return state.columns;
    },
    rows(state) {
        return state.rows;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
