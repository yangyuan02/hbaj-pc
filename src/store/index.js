import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    isOpenLogin: false // 登录弹窗状态
};

export default new Vuex.Store({
    state
});
