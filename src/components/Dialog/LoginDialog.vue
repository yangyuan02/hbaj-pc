<template>
    <el-dialog
        title="登录"
        :visible.sync="visible"
        width="30%"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
    >
        <div v-loading="loading" class="login_dialog">
            <div class="head">
                <div class="logo">
                    <img src="../Layout/images/logo.png" alt="" />
                </div>
                <div class="logo_text">
                    <span>海宝安检</span>
                </div>
            </div>
            <el-form ref="form" :model="form">
                <el-form-item label="手机号">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item class="login_btn">
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            form: {
                tel: "",
                password: ""
            },
            loading: false
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        open() {
            console.log("打开");
        },
        close() {
            this.$emit("update:visible", false);
            this.$store.commit("TOGGLE_LOGIN");
        }
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
