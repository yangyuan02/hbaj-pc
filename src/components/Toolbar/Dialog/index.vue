<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @open="open"
        @close="close"
        append-to-body
        :close-on-click-modal="false"
        class="attchment"
        lock-scroll
        top="0vh"
        width="700px"
    >
        <main v-loading="loading.detail" class="attchment_dialog">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="attach_model">
                <el-tab-pane label="文章" name="html" v-if="isShowHtml">
                    <el-input
                        type="text"
                        placeholder="请输入标题"
                        class="richTitle"
                        v-model="RichTextValue"
                    ></el-input>
                    <RichTextBox ref="RichTextBox"></RichTextBox>
                </el-tab-pane>

                <el-tab-pane label="文本" name="text" v-if="isShowText">
                    <TextList
                        :list="display.textList"
                        :onSuccess="getAttachmentText"
                        :onNotifiy="notifiy"
                        :onSortOpen="onSortOpen"
                    ></TextList>
                </el-tab-pane>

                <el-tab-pane label="图片" name="image" v-if="isShowImage">
                    <ImagesList
                        :list="display.imageList"
                        :onSuccess="getAttachmentImages"
                        :onNotifiy="notifiy"
                        :onSortOpen="onSortOpen"
                    ></ImagesList>
                </el-tab-pane>

                <el-tab-pane label="音频" name="audio">
                    <!-- <AudioHban
                        :src="display.audioList[0].extra"
                        :title="display.audioList[0].title"
                    ></AudioHban> -->
                    <div
                        class="title"
                        style="border-bottom:1px solid #ccc; padding:8px;font-size:16px;padding-left:14px;"
                    >
                        <p>{{ display.audioList[0].title || "此内容为空" }}</p>
                    </div>
                    <div class="audio" style="margin:10px 0px">
                        <audio
                            id="audioPlayer"
                            :src="globalConfig.imagePath + display.audioList[0].extra"
                            controlsList="nodownload"
                            controls="controls"
                            ref="audio"
                        ></audio>
                    </div>

                    <div class="desc">
                        <p>{{ display.audioList[0].content }}</p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="视频" name="video">
                    <!-- <VideoHban
                        :src="display.videoList[0].extra"
                        :title="display.videoList[0].title"
                    ></VideoHban> -->

                    <div
                        class="title"
                        style="border-bottom:1px solid #ccc; padding:8px;font-size:16px;padding-left:14px;"
                    >
                        <p>{{ display.videoList[0].title || "此内容为空" }}</p>
                    </div>
                    <div class="video" style="margin:10px 0px">
                        <video
                            id="videoPlayer"
                            :src="globalConfig.imagePath + display.videoList[0].extra"
                            ref="video"
                            controls="controls"
                            style="height:300px"
                        ></video>
                    </div>

                    <div class="desc">
                        <p>{{ display.videoList[0].content }}</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="operate">
                <el-button type="danger" @click="deleteItem()" v-if="isDelete">删除</el-button>
                <el-button type="primary" @click="editDialog()">{{ buttonText }}</el-button>
            </div>
        </main>
        <TextDialog
            :visible.sync="shows.isOpenTextDialog"
            :id="id || attchmentId"
            :editData="editData"
            :onSuccess="getAttachmentText"
            :editType="editType"
        ></TextDialog>
        <ImageDialog
            :visible.sync="shows.isOpenImagesDialog"
            :id="id || attchmentId"
            :editData="editData"
            :onSuccess="getAttachmentImages"
            :editType="editType"
        ></ImageDialog>
        <AudioDialog
            :visible.sync="shows.isOpenAudioDialog"
            :id="id || attchmentId"
            :editData="editData"
            :onSuccess="getAttachmentAudio"
            :editType="editType"
        ></AudioDialog>
        <VideoDialog
            :visible.sync="shows.isOpenVideoDialog"
            :id="id || attchmentId"
            :editData="editData"
            :onSuccess="getAttachmentVideo"
            :editType="editType"
        ></VideoDialog>
        <SortList
            :visible.sync="shows.isOpenSortTextList"
            :id="id || attchmentId"
            :getType="getType"
            :onSuccess="type => handerAttachment(type)"
            :list="sortList"
        ></SortList>
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
import SortList from "./SortList";

import TextList from "../List/Text";
import ImagesList from "../List/Images";

import { hotspotContent, hotspotContentDetail } from "@/model/api";

export default {
    data() {
        return {
            activeName: this.isShowHtml ? "html" : "text",
            RichTextValue: "", // 富文本标题
            loading: {
                detail: false
            },
            shows: {
                isOpenTextDialog: false, // 文本信息
                isOpenImagesDialog: false, //图片
                isOpenAudioDialog: false, // 音频
                isOpenVideoDialog: false, // 视频
                isOpenSortTextList: false // 排序
            },
            params: {}, // 参数
            attchmentId: "", // 附件id
            editData: {}, // 编辑数据
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
                ], // 视频列表
                richText: {} // 富文本
            },
            sortList: [], // 排序列表
            editType: "" // 编辑类型
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
        },
        dialogTitle: {
            type: String,
            default: "附件参考内容编辑"
        },
        isShowText: {
            type: Boolean,
            default: true
        },
        isShowHtml: {
            type: Boolean,
            default: true
        },
        isShowImage: {
            type: Boolean,
            default: true
        },
        id: {
            type: [String, Number],
            default: ""
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
        SortList,

        TextList,
        ImagesList
    },
    watch: {
        data(newVal) {
            console.log(newVal);
            this.params = newVal;
        },
        id(newVal) {
            this.id = newVal;
        }
    },
    computed: {
        buttonText: function() {
            if (this.activeName === "html" && this.display.richText.id) {
                return "修改";
            }
            if (this.activeName === "audio" && this.display.audioList[0].extra) {
                return "修改";
            }
            if (this.activeName === "video" && this.display.videoList[0].extra) {
                return "修改";
            }

            return "添加";
        },
        isDelete: function() {
            if (this.activeName === "audio" && this.display.audioList[0].extra) {
                return true;
            }
            if (this.activeName === "video" && this.display.videoList[0].extra) {
                return true;
            }
            if (this.activeName === "html" && this.display.richText.id) {
                return true;
            }
            return false;
        }
    },
    methods: {
        clearDialog() {
            this.display.textList = [];
            this.display.imageList = [];
            this.display.audioList = [{ extra: "" }];
            this.display.videoList = [{ extra: "" }];
            this.display.richText = {};
            this.clearHtml();
        },
        open() {
            if (!this.isShowHtml) {
                this.activeName = "text";
                this.getAttachmentText("text");
            } else {
                this.activeName = "html";
                this.getAttachmentHTML("html");
            }
        },
        close() {
            this.clearDialog();
            this.$emit("update:visible", false);
        },
        save() {
            console.log("保存");
        },
        clearHtml() {
            this.$refs.RichTextBox && this.$refs.RichTextBox.setHtml("");
            this.RichTextValue = "";
            this.display.richText = {};
        },
        deleteItem() {
            // 清空html
            let type = this.activeName === "audio" ? "audioList" : "videoList";
            let hotspotContentId = this.display[type][0].id;
            if (this.activeName === "html") {
                hotspotContentId = this.display.richText.id;
                type = "html";
            }

            this.$confirm(`将删除该文件,是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    hotspotContent({ type: "delete" }, hotspotContentId).then(res => {
                        if (res.suceeded) {
                            if (type === "audioList") {
                                this.getAttachmentAudio();
                            }

                            if (type === "videoList") {
                                this.getAttachmentVideo();
                            }
                            if (this.activeName === "html") {
                                this.clearHtml();
                                this.getAttachmentHTML();
                            }
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        handleClick(tab, event) {
            this.clearDialog();
            const name = tab.name.toLocaleUpperCase();
            this.handerAttachment(name);
        },
        editDialog() {
            if (this.activeName === "html") {
                // 富文本
                this.display.richText.id ? this.handleRichTextEdit() : this.hadnleRichtext();
                return;
            }
            this.attchmentId = this.params.id;
            // this.editData = {}; // 清空了会有bug

            if (this.buttonText !== "修改") {
                this.editData.id = "";
            }
            this.editType = "";
            if (this.activeName === "text") {
                this.shows.isOpenTextDialog = true;
            }
            if (this.activeName === "image") {
                this.shows.isOpenImagesDialog = true;
            }
            if (this.activeName === "audio") {
                if (this.buttonText === "修改") {
                    this.editData = this.display.audioList[0];
                    this.editType = "audio";
                }
                this.shows.isOpenAudioDialog = true;
            }
            if (this.activeName === "video") {
                if (this.buttonText === "修改") {
                    this.editData = this.display.videoList[0];
                    this.editType = "video";
                }
                this.shows.isOpenVideoDialog = true;
            }
        },
        hadnleRichtext() {
            // 保存富文本
            const RichTextBox = this.$refs.RichTextBox;
            const getHtml = RichTextBox.getHtml();
            const RichTextValue = this.RichTextValue;
            console.log(this.data, "dada");
            const params = {
                // 参数
                content: getHtml, // 内容
                // extra: "string", // 附件url
                hotspotId: this.params.id, // 附件id
                // id: 0,
                // seq: 0, // 排序
                title: RichTextValue, // 标题
                type: "HTML" // 类型
            };
            const hotspotContentList = [params];
            hotspotContentDetail({
                type: "post",
                data: { hotspotContentList }
            }).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getAttachmentHTML();
                }
            });
        },
        handleRichTextEdit() {
            const RichTextBox = this.$refs.RichTextBox;
            const getHtml = RichTextBox.getHtml();
            const RichTextValue = this.RichTextValue;
            const params = {
                // 参数
                content: getHtml, // 内容
                // extra: "string", // 附件url
                hotspotId: this.params.id, // 附件id
                // id: 0,
                // seq: 0, // 排序
                title: RichTextValue, // 标题
                type: "HTML" // 类型
            };
            // 修改富文本
            hotspotContent(
                {
                    type: "post",
                    data: params
                },
                this.display.richText.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                }
            });
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
                        hotspotId: id || this.id,
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
                    if (res.data.length === 0 && (type === "audio" || type === "video")) {
                        this.display[type + "List"].push({ extra: "" });
                    }
                    if (this.activeName === "html") {
                        // 富文本
                        if (res.data.length > 0) {
                            this.$refs.RichTextBox.setHtml(res.data[0].content);

                            this.RichTextValue = res.data[0].title || "";
                            this.display.richText = res.data[0];
                        }
                    }
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
        },
        notifiy(data, type) {
            this.editData = { ...data };
            this.editType = type;
            // 列表回调通知
            if (type === "text") {
                this.shows.isOpenTextDialog = true;
            }
            if (type === "image") {
                this.shows.isOpenImagesDialog = true;
            }
            if (type === "audio") {
                this.shows.isOpenAudioDialog = true;
            }
            if (type === "video") {
                this.shows.isOpenVideoDialog = true;
            }
        },
        onSortOpen(data, type) {
            this.attchmentId = this.params.id;
            this.sortList = [];
            if (type === "text" || type === "image") {
                this.getType = type.toLocaleUpperCase();
                this.shows.isOpenSortTextList = true;
                this.sortList = data.map(item => ({ id: item.id, name: item.title }));
            }
        }
    }
};
</script>

<style lang="less">
.attchment {
    .el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .el-dialog__body {
        // height: 500px;

        overflow: hidden; // 小心bug
        main {
            height: 500px;
            padding-bottom: 10px;
            position: relative;
        }
    }
    .attchment_dialog {
        position: relative;

        .el-tabs__content {
            max-height: 500px;
            overflow-y: scroll;
        }
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
    .richTitle {
        input {
            margin-bottom: 10px;
            border: none !important;
            border-bottom: 1px solid #ccc !important;
            border-radius: 0 !important;
        }
    }
}
</style>
