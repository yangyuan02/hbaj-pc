<template>
    <div class="hban-pc">
        <Header class="header"></Header>
        <Main class="main">
            <Sidebar class="sidebar"></Sidebar>
            <div class="container-main">
                <router-view></router-view>
            </div>
            <Toolbar></Toolbar>
        </Main>
        <!-- <Footer class="footer"></Footer> -->
        <!-- 登录弹窗 -->
        <LoginDialog :visible.sync="isOpenLoggin"></LoginDialog>
        <!-- 右侧工具条 -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./Header";
// import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Toolbar from "../Toolbar";
import LoginDialog from "@/components/Dialog/LoginDialog";
export default {
    data() {
        return {};
    },
    components: {
        Header,
        // Footer,
        Sidebar,
        LoginDialog,
        Toolbar
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
        .container-main {
            flex: 1;
            padding-left: 24px;
            padding-top: 24px;
            background: rgba(240, 242, 245, 1);
        }
    }
}
</style>
