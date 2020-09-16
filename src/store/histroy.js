let data;

try {
    const local = sessionStorage.getItem("TAGS_KEY") || [];
    data = JSON.parse(local);
} catch (error) {
    data = [];
}

const state = {
    histroy: data || [] // 访问记录
};

const isHistroy = path => state.histroy.find(item => item.path === path); // 是否在历史记录里面

const mutations = {
    SETHISTROY(state, item) {
        if (isHistroy(item.path)) return false;
        state.histroy = [...state.histroy, item];
        sessionStorage.setItem("TAGS_KEY", JSON.stringify(state.histroy));
    },
    CLEARHISTROY() {
        sessionStorage.removeItem("TAGS_KEY");
        state.histroy = [];
    }
};

export default {
    state,
    mutations
};
