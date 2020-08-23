<template>
    <el-dialog
        title="登录"
        :visible.sync="isOpenLoggin"
        width="350px"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
        class="loginDialog"
        top="0vh"
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
                password: ""
            },
            rules: {
                mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
            loading: false,
            isLoginAjax: false
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
            isOpenLoggin: state => state.loginStore.isOpenLogin
        })
    },
    methods: {
        open() {
            console.log("打开");
        },
        close() {
            // this.$emit("update:visible", false);
            if (this.isLoginAjax) {
                return;
            }
            this.$store.commit("TOGGLE_LOGIN");
        },
        submit() {
            if (!validate.isMobile(this.form.mobile)) {
                return this.$message.error("请输入正确的手机号");
            }
            const { mobile, password } = this.form;
            this.$refs["loginForm"].validate(valid => {
                if (valid) {
                    user({ type: "POST", data: { mobile, password } }, "login").then(res => {
                        if (res.suceeded) {
                            const {
                                suceeded,
                                data: { authorization, id }
                            } = res;

                            store.set("authorization", authorization, "local");
                            store.set("userId", id, "local");
                            store.set("user", res.data, "local");
                            this.isLoginAjax = true;
                            this.$store.commit("TOGGLE_LOGIN");
                            // this.isLoginAjax = false;
                            // if (window.fromToPage) {
                            //     this.$router.push({ path: window.fromToPage });
                            // }
                            this.$message.success("登录成功");
                            this.getUserDetail();
                            this.getMessageDetail();
                            window.location.href = "/";
                        } else {
                            res.message && this.$message.error(res.message);
                        }
                    });
                }
            });
        },
        getUserDetail() {
            const userId = store.get("userId", "local");
            user(
                {
                    type: "get"
                },
                userId
            ).then(res => {
                if (res.suceeded) {
                    this.$store.commit({
                        type: "SET_USER_INFO",
                        plylaod: res.data
                    });
                    this.user = res.data;
                }
            });
        },
        getMessageDetail() {
            messageDetail(
                {
                    type: "get"
                },
                "unreadCount"
            ).then(res => {
                if (res.suceeded) {
                    const { count } = res.data;
                    this.count = count;
                }
            });
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
        height: 340px;
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
