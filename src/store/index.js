import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./login";
import toolbarStore from "./toolbar";
import histroyStore from "./histroy";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loginStore,
        toolbarStore,
        histroyStore
    }
});
