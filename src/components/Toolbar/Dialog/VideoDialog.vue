<template>
    <el-dialog
        title="视频文件"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
    >
        <div v-loading="loading.detail">
            <video-hban :title="title" :src="src"></video-hban>
        </div>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import VideoHban from "@/components/common/Video";
export default {
    components: {
        VideoHban
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
