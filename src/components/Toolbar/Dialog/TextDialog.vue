<template>
    <el-dialog
        title="附件管理"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="30%"
        append-to-body
    >
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: ""
            },
            loading: {
                save: false
            }
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
            console.log(this.$refs.a.style);
            this.$emit("update:visible", false);
        },
        save() {
            console.log("保存");
        }
    }
};
</script>

<style lang="less"></style>
