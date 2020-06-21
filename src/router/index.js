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
        },
        {
            path: "/news/detail/:id",
            name: "newsDetail",
            component: () => import("@/views/news/detail"),
            meta: {
                title: "新闻详情"
            }
        },
        {
            path: "/course",
            name: "course",
            component: () => import("@/views/course"),
            meta: {
                title: "公共课件"
            }
        },
        {
            path: "/my/task",
            name: "MyTask",
            component: () => import("@/views/my/task"),
            meta: {
                title: "我的任务"
            }
        },
        {
            path: "/my/message",
            name: "MyMessage",
            component: () => import("@/views/my/message"),
            meta: {
                title: "我的消息"
            }
        }
    ]
});
