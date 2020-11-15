const state = {
    isOpenDialog: false,
    isDelAndEdit: true
};

const mutations = {
    SETATTDIALOG(state, show) {
        state.isOpenDialog = show;
    },
    SETDELANDEDIT(state, show) {
        state.isDelAndEdit = show;
    }
};

export default {
    state,
    mutations
};
