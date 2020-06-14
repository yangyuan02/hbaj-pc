import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./login";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loginStore
    }
});
