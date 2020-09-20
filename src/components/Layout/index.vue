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
        <!-- 忘记密码 -->
        <ForgetDialog :visible.sync="isOpenForget"></ForgetDialog>
        <!-- 重置密码 -->
        <ResetPasswordDialog
            :visible.sync="isOpenFesetPassword"
            :mobile="mobile"
        ></ResetPasswordDialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import LoginDialog from "@/components/Dialog/LoginDialog";
import ForgetDialog from "@/components/Dialog/ForgetDialog";
import ResetPasswordDialog from "@/components/Dialog/ResetPasswordDialog";

export default {
    data() {
        return {};
    },
    components: {
        Header,
        Footer,
        Sidebar,
        LoginDialog,
        ForgetDialog,
        ResetPasswordDialog
    },
    computed: {
        ...mapState({
            isOpenLoggin: state => state.loginStore.isOpenLogin,
            isOpenForget: state => state.loginStore.isOpenForget,
            isOpenFesetPassword: state => state.loginStore.isOpenFesetPassword,
            mobile: state => state.loginStore.mobile
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
    }
}
</style>
