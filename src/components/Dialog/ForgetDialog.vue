<template>
    <el-dialog
        title="忘记密码"
        :visible.sync="isOpenForget"
        width="350px"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
        class="loginDialog"
        top="0vh"
    >
        <div class="login_dialog">
            <div class="head">
                <div class="logo">
                    <img src="../Layout/images/logo.png" alt="" />
                </div>
                <div class="logo_text">
                    <span>海宝安检</span>
                </div>
            </div>
            <el-form
                ref="loginForm"
                :model="form"
                :rules="rules"
                label-position="left"
                label-width="0px"
            >
                <el-form-item label="" prop="mobile">
                    <el-input
                        v-model="form.mobile"
                        maxlength="11"
                        placeholder="请输入手机号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="" prop="code" class="code">
                    <el-input v-model="form.code" placeholder="验证码" maxlength="6" type="text">
                        <el-button slot="append">发送验证码</el-button>
                    </el-input>
                    <!-- <span></span> -->
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item class="login_btn">
                    <el-button type="primary" @click="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { user, messageDetail } from "@/model/api";
import validate from "@/widget/validate";
import store from "@/widget/store";
import { mapState } from "vuex";

export default {
    data() {
        return {
            form: {
                mobile: "",
                password: "",
                code: ""
            },
            rules: {
                mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            isOpenForget: state => state.loginStore.isOpenForget
        })
    },
    methods: {
        open() {
            console.log("打开");
        },
        close() {
            this.$store.commit("TOGGLE_FORGET");
        }
    }
};
</script>

<style lang="less">
.loginDialog {
    /deep/.el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 400px;
        border-radius: 4px;
        .el-dialog__body {
            // height: 350px;
            padding: 20px 20px !important;
            .login_dialog {
                .head {
                    width: 100%;
                    .logo {
                        // width: 82px;
                        height: 32px;
                        max-width: 100%;
                        margin: 0 auto;
                        display: flex;
                        justify-content: center;
                        img {
                            width: 100;
                            height: 100%;
                            max-width: 100%;
                        }
                    }
                    .logo_text {
                        width: 100%;
                        text-align: center;
                        margin: 10px 0px;
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
        }
        .el-dialog__header {
            border-bottom: 1px solid #eee;
        }
    }
}
</style>
