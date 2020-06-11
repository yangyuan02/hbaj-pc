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
        }
    }
};
</script>

<style lang="less"></style>
