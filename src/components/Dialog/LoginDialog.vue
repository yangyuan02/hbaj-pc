<template>
    <el-dialog
        title="登录"
        :visible.sync="isOpenLoggin"
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
            <el-form ref="loginForm" :model="form" :rules="rules">
                <el-form-item label="手机号" prop="mobile">
                    <el-input
                        v-model="form.mobile"
                        maxlength="11"
                        placeholder="请输入手机号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
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
import { user } from "@/model/api";
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
                            $.cookie(
                                "authorization",
                                JSON.parse(window.localStorage.getItem("authorization"))
                            );

                            this.$store.commit("TOGGLE_LOGIN");
                            // this.isLoginAjax = false;
                            this.$message.success("登录成功");
                        }
                    });
                }
            });
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
