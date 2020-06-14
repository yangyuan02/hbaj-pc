const state = {
    isOpenLogin: false
};

const mutations = {
    TOGGLE_LOGIN(state) {
        state.isOpenLogin = !state.isOpenLogin;
    }
};

export default {
    state,
    mutations
};
