<template>
    <el-dialog
        title="附件管理"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @open="open"
        @close="close"
    >
        <main v-loading="loading.detail">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="attach_model">
                <el-tab-pane label="文本" name="text">文本</el-tab-pane>
                <el-tab-pane label="图片" name="images">图片</el-tab-pane>
                <el-tab-pane label="音频" name="audio">
                    <AudioHban></AudioHban>
                </el-tab-pane>
                <el-tab-pane label="视频" name="video">
                    <VideoHban></VideoHban>
                </el-tab-pane>
                <el-tab-pane label="富文本" name="richtext">
                    <RichTextBox></RichTextBox>
                </el-tab-pane>
            </el-tabs>
        </main>

        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";
import AudioHban from "@/components/common/Audio";
import VideoHban from "@/components/common/Video";
export default {
    data() {
        return {
            activeName: "text",
            loading: {
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
        RichTextBox,
        AudioHban,
        VideoHban
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
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style lang="less">
.attach_model {
    .el-dialog__body {
        padding-top: 0px;
    }
}
</style>
