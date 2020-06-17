const state = {
    drawerIntro: false // 简介
};

const mutations = {
    TOGGLE_DRAWER(state) {
        state.drawerIntro = !state.drawerIntro;
    }
};

export default {
    state,
    mutations
};
