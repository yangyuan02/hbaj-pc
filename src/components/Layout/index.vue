<template>
    <div class="hban-pc">
        <Header class="header"></Header>
        <Main class="main">
            <Sidebar class="sidebar"></Sidebar>
            <div class="container-main">
                <router-view></router-view>
            </div>
        </Main>
        <!-- <Footer class="footer"></Footer> -->
        <!-- 登录弹窗 -->
        <LoginDialog :visible.sync="isOpenLoggin"></LoginDialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./Header";
// import Footer from "./Footer";
import Sidebar from "./Sidebar";
import LoginDialog from "@/components/Dialog/LoginDialog";
export default {
    data() {
        return {};
    },
    components: {
        Header,
        // Footer,
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
        .container-main {
            flex: 1;
        }
    }
}
</style>
