<template>
    <div class="hban-pc">
        <Header class="header"></Header>
        <Main class="main">
            <Sidebar class="sidebar"></Sidebar>
            <div
                class="right"
                style="width:100%;display: flex;
    flex-direction: column;"
            >
                <div
                    class="container-main"
                    :style="{ paddingRight: $route.name === 'panoEditor' ? '0px' : '' }"
                >
                    <router-view></router-view>
                </div>
                <Footer class="footer"></Footer>
            </div>
        </Main>

        <!-- 登录弹窗 -->
        <LoginDialog :visible.sync="isOpenLoggin"></LoginDialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import LoginDialog from "@/components/Dialog/LoginDialog";

export default {
    data() {
        return {};
    },
    components: {
        Header,
        Footer,
        Sidebar,
        LoginDialog
    },
    computed: {
        ...mapState({
            isOpenLoggin: state => state.loginStore.isOpenLogin
        })
    }
};
</script>

<style lang="less">
.hban-pc {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main {
        flex: 1;
        display: flex;
        height: 100%; // TODO:会有bug
        overflow: hidden;
        .container-main {
            flex: 1;
            padding-left: 10px;
            padding-top: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
            background: rgba(240, 242, 245, 1);
            height: calc(100% - 40px);
        }
        .panel_sidebar {
            width: 296px;
            height: 100%;
            background: #fff;
            padding: 0 24px;
            // transform: translateX(296px);
            // display: none;
            .common {
                h2 {
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    line-height: 24px;
                    padding: 10px 0;
                }
                .el-form-item {
                    .el-form-item__label {
                        font-size: 16px;
                        font-family: MicrosoftYaHei;
                        color: rgba(51, 51, 51, 1);
                        line-height: 21px;
                    }
                }
            }
        }
    }
}
</style>
