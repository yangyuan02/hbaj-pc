<template>
    <header>
        <div class="logo">
            <div>
                <img src="./images/logo-2.jpg" alt="" height="36" />
            </div>
            <!-- <div class="logo-text">
                <span>海宝安检</span>
            </div> -->
        </div>
        <div class="header-right">
            <div class="crumbs">
                <span>{{ crumbs }}</span>
            </div>
            <div class="operate">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        快速操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <template v-if="histroy.length > 0">
                            <el-dropdown-item
                                icon="el-icon-close"
                                v-for="(item, index) in histroy"
                                :key="index"
                                :command="item"
                                >{{ item.params.name }}</el-dropdown-item
                            >
                        </template>

                        <el-dropdown-item divided command="logout" v-if="isLogin"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        crumbs: function() {
            return this.$route.meta.title;
        },
        histroy: function() {
            return this.$store.state.histroyStore.histroy;
        },
        isLogin: function() {
            return window.localStorage.getItem("authorization");
        }
    },
    methods: {
        goToPedit({ params }) {
            this.$router.push({
                name: "panoEditor",
                params
            });
        },
        handleCommand(command) {
            if (command === "logout") {
                const clear = ["authorization", "userId", "user", "TAGS_KEY"];
                clear.forEach(item => {
                    window.localStorage.removeItem(item);
                });
                this.$store.commit("CLEARHISTROY");
                window.location.href = "/";
                // this.$router.push("/");
            } else {
                this.goToPedit(command);
            }
        }
    }
};
</script>

<style lang="less">
header {
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex !important;
    align-items: center;
    .logo {
        width: 190px;
        height: 100%;
        background: rgba(15, 79, 168, 1);
        border-bottom: 1px solid #fff;
        display: flex;
        align-items: center;
        padding-left: 10px;
        .thumb {
            width: 48px;
            height: 27px;
            margin-right: 23px;
            img {
                width: 100%;
                max-height: 100%;
            }
        }
        .logo-text {
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 29px;
                -webkit-background-clip: text;
            }
        }
    }
    .header-right {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        .crumbs {
            margin-left: 20px;
            span {
                font-size: 16px;
            }
        }
        .operate {
            margin-right: 14px;
        }
    }
}
</style>
