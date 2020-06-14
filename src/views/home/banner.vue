<template>
    <div class="home_banner">
        <div class="title">
            <h2>主页内容</h2>
        </div>
        <div class="banner"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="less">
.home_banner {
    width: 363px;
    background: #fff;
    .title {
        padding-left: 16px;
        padding-top: 14px;
        padding-bottom: 14px;
        h2 {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
            line-height: 24px;
            -webkit-background-clip: text;
        }
    }
    .banner {
        width: 363px;
        height: 206px;
        background: url("./images/banner.png") no-repeat;
        background-size: 100%;
    }
}
</style>
