<template>
    <aside>
        <div class="login">
            <div class="person">
                <div class="thumb"></div>
                <div class="name">
                    <!-- <span>船福</span> -->
                    <span @click="$store.commit('TOGGLE_LOGIN')">请登录</span>
                </div>
            </div>
        </div>
        <div class="menu">
            <ul>
                <li
                    v-for="(item, index) in menu"
                    :key="index"
                    :class="{
                        active: $route.path.startsWith(item.path) || item.name === $route.name
                    }"
                    @click="goTo(item.path)"
                >
                    <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
                    <span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    text: "主页",
                    icon: "icontubiaoweb-01",
                    path: "/home",
                    name: "Index"
                },
                {
                    text: "公共课件",
                    icon: "icontubiaoweb-02",
                    path: "/course"
                },
                {
                    text: "海宝资讯",
                    icon: "icontubiaoweb-03",
                    path: "/news"
                },
                {
                    text: "我的信息",
                    icon: "icontubiaoweb-06",
                    path: "/my/person"
                },
                {
                    text: "我的课件",
                    icon: "icontubiaoweb-04",
                    path: "/my/course"
                },
                {
                    text: "我的任务",
                    icon: "icontubiaoweb-05",
                    path: "/my/task"
                },
                {
                    text: "我的通知",
                    icon: "icontubiaoweb-06",
                    path: "/my/message"
                }
            ]
        };
    },
    methods: {
        goTo(path) {
            this.$router.push({
                path
            });
        }
    }
};
</script>

<style lang="less">
aside {
    width: 255px;
    height: 100%;
    background: rgba(15, 79, 168, 1);
    flex-shrink: 0;
    .login {
        width: 100%;
        .person {
            width: 100%;
            .thumb {
                width: 76px;
                height: 76px;
                background: url("./images/user_default.png") no-repeat;
                background-size: 100%;
                border-radius: 50%;
                margin: 0 auto;
                margin-top: 26px;
                margin-bottom: 4px;
            }
            .name {
                margin: 0 auto;
                text-align: center;
                font-size: 20px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 26px;
                -webkit-background-clip: text;
            }
        }
    }
    .menu {
        margin-top: 77px;
        text-align: center;
        li {
            margin-bottom: 53px;
            cursor: pointer;
            &.active {
                i {
                    color: rgba(255, 213, 26, 1);
                }
                span {
                    color: rgba(255, 213, 26, 1);
                }
            }
            i {
                color: rgba(255, 255, 255, 1);
                font-size: 26px;
            }
            span {
                font-size: 24px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 31px;
                -webkit-background-clip: text;
                margin-left: 20px;
                width: 96px;
                display: inline-block;
                text-align-last: justify;
            }
        }
    }
}
</style>
