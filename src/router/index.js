import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: "/",
            name: "Index",
            component: () => import("@/views/home"),
            meta: {
                title: "海宝安检首页"
            }
        },
        {
            path: "/home",
            name: "home",
            component: () => import("@/views/home"),
            meta: {
                title: "海宝安检首页"
            }
        },
        {
            path: "/news",
            name: "news",
            component: () => import("@/views/news"),
            meta: {
                title: "海宝安检资讯"
            }
        }
    ]
});
