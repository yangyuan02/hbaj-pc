<template>
    <el-dialog
        title="附件管理"
        :visible.sync="visible"
        @open="open"
        @close="close"
        append-to-body
        :close-on-click-modal="false"
    >
        <main v-loading="loading.detail" class="attchment_dialog">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="attach_model">
                <el-tab-pane label="文本" name="text">
                    <TextList :list="display.textList"></TextList>
                </el-tab-pane>
                <el-tab-pane label="图片" name="image">
                    <ImagesList :list="display.imageList"></ImagesList>
                </el-tab-pane>
                <el-tab-pane label="音频" name="audio">
                    <AudioHban :src="display.audioList[0].extra"></AudioHban>
                </el-tab-pane>
                <el-tab-pane label="视频" name="video">
                    <VideoHban :src="display.videoList[0].extra"></VideoHban>
                </el-tab-pane>
                <el-tab-pane label="富文本" name="richtext">
                    <RichTextBox></RichTextBox>
                </el-tab-pane>
            </el-tabs>
            <div class="operate">
                <el-button type="primary" @click="editDialog()">添加</el-button>
            </div>
        </main>
        <TextDialog
            :visible.sync="shows.isOpenTextDialog"
            :id="attchmentId"
            :onSuccess="getAttachmentText"
        ></TextDialog>
        <ImageDialog
            :visible.sync="shows.isOpenImagesDialog"
            :id="attchmentId"
            :onSuccess="getAttachmentImages"
        ></ImageDialog>
        <AudioDialog
            :visible.sync="shows.isOpenAudioDialog"
            :id="attchmentId"
            :onSuccess="getAttachmentAudio"
        ></AudioDialog>
        <VideoDialog
            :visible.sync="shows.isOpenVideoDialog"
            :id="attchmentId"
            :onSuccess="getAttachmentVideo"
        ></VideoDialog>
        <div slot="footer">
            <el-button @click="close">关闭</el-button>
            <!-- <el-button type="primary" :loading="loading.save" @click="save">保存</el-button> -->
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

import TextList from "../List/Text";
import ImagesList from "../List/Images";

import { hotspotContent } from "@/model/api";

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
            },
            params: {}, // 参数
            attchmentId: "", // 附件id
            display: {
                textList: [], // 文本列表
                imageList: [], // 图文列表
                audioList: [
                    {
                        extra: ""
                    }
                ], // 音频列表
                videoList: [
                    {
                        extra: ""
                    }
                ] // 视频列表
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        }
    },
    components: {
        RichTextBox,
        AudioHban,
        VideoHban,

        TextDialog,
        ImageDialog,
        AudioDialog,
        VideoDialog,

        TextList,
        ImagesList
    },
    watch: {
        data(newVal) {
            console.log(newVal);
            this.params = newVal;
        }
    },
    methods: {
        open() {
            console.log("打开");
            this.getAttachmentText("text");
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            console.log("保存");
        },
        handleClick(tab, event) {
            const name = tab.name.toLocaleUpperCase();
            this.handerAttachment(name);
        },
        editDialog() {
            this.attchmentId = this.params.id;
            if (this.activeName === "text") {
                this.shows.isOpenTextDialog = true;
            }
            if (this.activeName === "image") {
                this.shows.isOpenImagesDialog = true;
            }
            if (this.activeName === "audio") {
                this.shows.isOpenAudioDialog = true;
            }
            if (this.activeName === "video") {
                this.shows.isOpenVideoDialog = true;
            }
        },
        handerAttachment(type) {
            // 获取具体的附件信息
            const { id } = this.params;
            this.loading.detail = true;
            this.typeTab = type;
            hotspotContent(
                {
                    type: "get",
                    data: {
                        hotspotId: id,
                        type,
                        size: 1000,
                        page: 1
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    this.loading.detail = false;
                    let type = this.typeTab.toLocaleLowerCase();
                    this.display[type + "List"] = res.data || [];
                }
            });
        },
        getAttachmentText() {
            // 获取文本
            this.handerAttachment("TEXT");
        },
        getAttachmentImages() {
            // 获取图文
            this.handerAttachment("IMAGE");
        },
        getAttachmentAudio() {
            // 获取音频
            this.handerAttachment("AUDIO");
        },
        getAttachmentVideo() {
            // 获取视频
            this.handerAttachment("VIDEO");
        },
        getAttachmentHTML() {
            // 获取富文本
            this.handerAttachment("HTML");
        }
    }
};
</script>

<style lang="less">
.attchment_dialog {
    position: relative;
    .operate {
        position: absolute;
        right: 0;
        top: 0;
    }
    .attach_model {
        .el-dialog__body {
            padding-top: 0px;
        }
    }
}
</style>
