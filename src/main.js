import Vue from "vue";
import Application from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.prototype.globalConfig = window.globalConfig;

router.beforeEach((to, from, next) => {
    if (to.name == "login" && window.localStorage.getItem("authorization")) {
        //解决登陆后 用户输入登录地址重定向到首页
        next({ path: "/home" });
    }

    if (to.meta.requireLogin) {
        // 是需要登录的页面
        if (window.localStorage.getItem("authorization")) {
            // token存在 且token没有过期
            next();
        } else {
            window.fromToPage = to.fullPath;
            store.commit("TOGGLE_LOGIN");
            next(false);
            // next();
        }
    } else {
        // 不需要登录的直接next()
        next();
    }
});

router.afterEach(to => {
    document.title = to.meta.title;
});
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(Application)
});
