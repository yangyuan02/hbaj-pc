<template>
    <el-dialog
        title="附件管理"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
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
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: ""
            }
        };
    }
};
</script>

<style lang="less"></style>
