<template>
    <el-dialog
        title="音频文件"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
    >
        <div v-loading="loading.detail">
            <Audio :title="title" :src="src"></Audio>
        </div>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Audio from "@/components/common/Audio";
export default {
    components: {
        Audio
    },
    props: {
        title: {
            // 音频资源标题
            default: "",
            type: String
        },
        src: {
            // 音频资源链接
            default: "",
            type: String
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: {
                save: false,
                detail: false
            }
        };
    },
    methods: {
        open() {
            console.log("打开");
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            console.log("保存");
        }
    }
};
</script>

<style scoped lang="scss"></style>
