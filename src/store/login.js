const state = {
    isOpenLogin: false,
    user: {}
};

const mutations = {
    TOGGLE_LOGIN(state) {
        state.isOpenLogin = !state.isOpenLogin;
    },
    SET_USER_INFO(state, { plylaod }) {
        console.log("设置用户新", plylaod);
        state.user = plylaod;
    }
};

export default {
    state,
    mutations
};
