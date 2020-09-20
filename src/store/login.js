const state = {
    isOpenLogin: false,
    isOpenForget: false,
    isOpenFesetPassword: false,
    user: {},
    mobile: ""
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
    },
    TOGGLE_RESETPASSWORD(state) {
        state.isOpenFesetPassword = !state.isOpenFesetPassword;
    },
    SETMOBILE(state, mobile) {
        state.mobile = mobile;
    }
};

export default {
    state,
    mutations
};
