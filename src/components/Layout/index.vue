<template>
    <div class="hban-pc">
        <Header class="header"></Header>
        <Main class="main">
            <Sidebar class="sidebar"></Sidebar>
            <div class="container-main">
                <router-view></router-view>
            </div>
        </Main>
        <Footer class="footer"></Footer>
    </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default {
    data() {
        return {};
    },
    components: {
        Header,
        Footer,
        Sidebar
    }
};
</script>

<style lang="less">
.hban-pc {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
    }
    .main {
        flex: 1;
        display: flex;
        .sidebar {
        }
        .container-main {
            flex: 1;
        }
    }
    .footer {
    }
}
</style>
