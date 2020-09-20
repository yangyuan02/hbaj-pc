const state = {
    isOpenLogin: false,
    isOpenForget: false,
    user: {}
};

const mutations = {
    TOGGLE_LOGIN(state) {
        state.isOpenLogin = !state.isOpenLogin;
    },
    SET_USER_INFO(state, { plylaod }) {
        console.log("设置用户新", plylaod);
        state.user = plylaod;
    },
    TOGGLE_FORGET(state) {
        state.isOpenForget = !state.isOpenForget;
    }
};

export default {
    state,
    mutations
};
