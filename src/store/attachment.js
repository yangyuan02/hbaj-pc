const state = {
    isOpenDialog: false
};

const mutations = {
    SETATTDIALOG(state, show) {
        state.isOpenDialog = show;
    }
};

export default {
    state,
    mutations
};
