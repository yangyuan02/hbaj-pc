<template>
    <div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import BgNav from "@/components/common/BgNav";
export default {
    data() {
        return {};
    },
    components: {
        BgNav
    }
};
</script>

<style lang="less">
.login_dialog {
    .head {
        width: 100%;
        .logo {
            width: 82px;
            height: 82px;
            margin: 0 auto;
            img {
                width: 100;
                height: 100%;
                max-width: 100%;
            }
        }
        .logo_text {
            width: 100%;
            text-align: center;
            margin: 20px 0px;
            span {
                font-size: 20px;
                font-family: MicrosoftYaHei;
                color: rgba(15, 79, 168, 1);
                line-height: 26px;
                -webkit-background-clip: text;
            }
        }
    }
    .login_btn {
        button {
            width: 100%;
        }
    }
}
</style>
