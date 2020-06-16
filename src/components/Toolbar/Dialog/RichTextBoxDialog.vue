<template>
    <el-dialog
        title="富文本编辑器"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
    >
        <div v-loading="loading.detail">
            <RichTextBox></RichTextBox>
        </div>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";
export default {
    data() {
        return {
            loading: {
                save: false,
                detail: false
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        RichTextBox
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
