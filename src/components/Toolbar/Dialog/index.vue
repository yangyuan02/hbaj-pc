<template>
    <el-dialog
        title="附件管理"
        :visible.sync="visible"
        @open="open"
        @close="close"
        append-to-body
        :close-on-click-modal="false"
    >
        <main v-loading="loading.detail">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="attach_model">
                <el-tab-pane label="文本" name="text">
                    <el-button type="primary" @click="editDialog('text')">添加</el-button>
                </el-tab-pane>
                <el-tab-pane label="图片" name="images">
                    <el-button type="primary" @click="editDialog('images')">添加</el-button>
                </el-tab-pane>
                <el-tab-pane label="音频" name="audio">
                    <el-button type="primary" @click="editDialog('audio')">添加</el-button>
                    <AudioHban></AudioHban>
                </el-tab-pane>
                <el-tab-pane label="视频" name="video">
                    <el-button type="primary" @click="editDialog('video')">添加</el-button>
                    <VideoHban></VideoHban>
                </el-tab-pane>
                <el-tab-pane label="富文本" name="richtext">
                    <RichTextBox></RichTextBox>
                </el-tab-pane>
            </el-tabs>
        </main>
        <TextDialog :visible.sync="shows.isOpenTextDialog"></TextDialog>
        <ImageDialog :visible.sync="shows.isOpenImagesDialog"></ImageDialog>
        <AudioDialog :visible.sync="shows.isOpenAudioDialog"></AudioDialog>
        <VideoDialog :visible.sync="shows.isOpenVideoDialog"></VideoDialog>
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

import TextDialog from "./TextDialog";
import ImageDialog from "./ImageDialog";
import AudioDialog from "./AudioDialog";
import VideoDialog from "./VideoDialog";
export default {
    data() {
        return {
            activeName: "text",
            loading: {
                detail: false
            },
            shows: {
                isOpenTextDialog: false, // 文本信息
                isOpenImagesDialog: false, //图片
                isOpenAudioDialog: false, // 音频
                isOpenVideoDialog: false // 视频
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
        VideoHban,

        TextDialog,
        ImageDialog,
        AudioDialog,
        VideoDialog
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
        },
        editDialog(type) {
            if (type === "text") {
                this.shows.isOpenTextDialog = true;
            }
            if (type === "images") {
                this.shows.isOpenImagesDialog = true;
            }
            if (type === "audio") {
                this.shows.isOpenAudioDialog = true;
            }
            if (type === "video") {
                this.shows.isOpenVideoDialog = true;
            }
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
