<template>
    <aside>
        <div class="login">
            <div class="person">
                <div
                    class="thumb cursor"
                    @click="goMy"
                    :style="{
                        backgroundImage: user.avatar
                            ? `url(${globalConfig.imagePath + user.avatar})`
                            : './images/user_default.png'
                    }"
                ></div>
                <div class="name cursor">
                    <span v-if="user.sgname" @click="goMy">{{ user.sgname }}</span>
                    <span @click="$store.commit('TOGGLE_LOGIN')" v-else>请登录</span>
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
import { mapState } from "vuex";
import { user, messageDetail } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            menu: [
                {
                    text: "海宝主页",
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
                    icon: "icongerenxinxi",
                    path: "/my/person",
                    name: "MySetting"
                },
                {
                    text: "我的课件",
                    icon: "icontubiaoweb-04",
                    path: "/my/course"
                },
                {
                    text: "我的任务",
                    icon: "icontubiaoweb-05",
                    path: "/my/task",
                    name: "panoEditor"
                },
                {
                    text: "我的通知",
                    icon: "icontubiaoweb-06",
                    path: "/my/message"
                }
            ],
            modulesList: store.get("modulesList", "local")
        };
    },
    computed: {
        ...mapState({
            user: state => state.loginStore.user
        })
    },

    methods: {
        goTo(path) {
            if (path.indexOf("/my") !== -1) {
                if (!window.localStorage.getItem("authorization")) {
                    return this.$store.commit("TOGGLE_LOGIN");
                }
            }

            if (path === "/course" || path === "/my/course") {
                const { name, children } = store.get("modulesList", "local")[0];
                const query = {
                    name
                };
                if (children && children.length > 0) {
                    query.moduleId = children[1].id;
                    query.blockId = children[1].blockId;
                    if (children[0].classList && children[0].classList.length > 0) {
                        query.classListId = children[0].classList[0].id;
                    }
                }
                this.$router.push({
                    path,
                    query
                });
            } else {
                this.$router.push({ path });
            }
        },
        getUserDetail() {
            if (window.localStorage.getItem("authorization")) {
                this.$nextTick(() => {
                    user(
                        {
                            type: "get"
                        },
                        "personal"
                    ).then(res => {
                        if (res.suceeded) {
                            if (res.data.userType === 1) {
                                this.menu.push({
                                    text: "远程核查",
                                    icon: "iconjiankong",
                                    path: "/my/agora"
                                });
                            }
                            store.set("userId", res.data.id, "local");
                            this.$store.commit({
                                type: "SET_USER_INFO",
                                plylaod: res.data
                            });
                        }
                    });
                });
            }
        },
        goMy() {
            if (!this.user.sgname) {
                this.$store.commit("TOGGLE_LOGIN");
                return;
            }
            this.$router.push({ path: "/my/person" });
        }
    },
    mounted() {
        this.getUserDetail();
    }
};
</script>

<style lang="less">
aside {
    width: 190px;
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
                background-size: cover;
                border-radius: 50%;
                margin: 0 auto;
                margin-top: 26px;
                margin-bottom: 4px;
                background-position: center center;
            }
            .name {
                margin: 0 auto;
                margin-top: 15px;
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
            margin-bottom: 30px;
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
                font-size: 18px;
            }
            span {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 31px;
                -webkit-background-clip: text;
                margin-left: 20px;
                width: 96px;
                display: inline-block;
                // text-align-last: justify;
                text-align: left;
                letter-spacing: 2px;
            }
        }
    }
}
</style>
