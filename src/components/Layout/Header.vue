<template>
    <header>
        <div class="logo">
            <div class="thumb">
                <img src="./images/logo.png" alt="" />
            </div>
            <div class="logo-text">
                <span>海宝安检</span>
            </div>
        </div>
        <div class="crumbs">
            <span>{{ crumbs }}</span>
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
        padding-left: 36px;
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
    .crumbs {
        margin-left: 20px;
        span {
            font-size: 16px;
        }
    }
}
</style>
