<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="less"></style>
