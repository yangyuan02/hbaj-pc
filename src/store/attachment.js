const state = {
    isOpenDialog: false,
    isDelAndEdit: true,
    disabled: false
};

const mutations = {
    SETATTDIALOG(state, show) {
        state.isOpenDialog = show;
    },
    SETDELANDEDIT(state, show) {
        state.isDelAndEdit = show;
    },
    SETADDDISABLED(state, show) {
        state.disabled = show;
    }
};

export default {
    state,
    mutations
};
