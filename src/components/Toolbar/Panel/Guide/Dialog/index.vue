<template>
    <el-dialog
        title="添加解说内容"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="680px"
        append-to-body
        class="addGuidedialog"
        top="0vh"
    >
        <main>
            <div class="hostcontent">
                <div class="hostcontent_left">
                    <div class="info">
                        <div
                            class="action "
                            @click="openAction"
                            :class="{ 'ui-lazyLoad-pic': !selectData.img1 }"
                        >
                            <img
                                :src="globalConfig.imagePath + selectData.img1"
                                alt=""
                                v-if="selectData.img1"
                            />
                        </div>
                        <!-- <div class="digest">
                            <div class="title">
                                <span>简介</span>
                            </div>
                            <div class="text">
                                <p>{{ data.title }}</p>
                            </div>
                        </div> -->
                    </div>
                    <div class="content">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="内容"
                            v-model="AUDIO.title"
                        ></el-input>
                        <!-- {{ data.title }} -->
                    </div>
                </div>
                <div class="hostcontent_right">
                    <div class="hostcontent_audio">
                        <audio
                            id="audioPlayerGuide"
                            :src="globalConfig.imagePath + AUDIO.extra"
                            controlsList="nodownload"
                            controls="controls"
                            ref="audio"
                        ></audio>
                    </div>
                    <div class="lang">
                        <el-radio-group v-model="langType" size="mini">
                            <el-radio-button label="zh-CHS">中文</el-radio-button>
                            <el-radio-button label="en">英文</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="operator">
                        <i class="iconfont icontubiaoweb-34 cursor" @click="audition"></i>
                        <i class="iconfont icontubiaoweb-33 cursor" @click="addAudio"></i>
                        <i class="iconfont icontubiaoweb-27 cursor" @click="deleteItem"></i>
                    </div>
                    <div class="text-content-container">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="内容"
                            v-model="AUDIO.content"
                            class="inputNoResize"
                        ></el-input>
                    </div>
                </div>
            </div>
        </main>
        <SelectAction
            :visible.sync="isOpenAction"
            :onConfirm="onConfirm"
            :id="attchmentId"
            :editData="editData"
        ></SelectAction>
        <div slot="footer">
            <!-- <el-button @click="close">关闭</el-button> -->
            <el-button type="primary" @click="save">保存</el-button>
        </div>
        <AudioDialog
            :visible.sync="shows.isOpenAudioDialog"
            :id="attchmentId"
            :editData="editData"
            :onSuccess="onSuccess"
            :editType="editType"
        ></AudioDialog>
        <Audition
            :visible.sync="shows.isOpenAudition"
            :src="textTransform"
            :onConfirmAudio="onConfirmAudio"
            :id="attchmentId"
            :editData="editData"
            :onSuccess="onSuccess"
        ></Audition>
    </el-dialog>
</template>

<script>
import SelectAction from "./SelectAction.vue";
import AudioDialog from "./AudioDialog";
import Audition from "./audition";
import { hotspotContentDetail, hotspotContent, youdao } from "@/model/api";

export default {
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
        SelectAction,
        AudioDialog,
        Audition
    },
    data() {
        return {
            langType: "zh-CHS",
            textTransform: "", // 生成的url
            textSrc: "", // 确定之后的url
            shows: {
                isOpenAudioDialog: false,
                isOpenAudition: false
            },
            isOpenAction: false,
            selectData: {
                img1: ""
            },
            IMAGE: {},
            AUDIO: {},
            attchmentId: "",
            editData: {},
            editType: ""
        };
    },
    methods: {
        open() {
            this.handerAttachment("IMAGE");
            this.handerAttachment("AUDIO");
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            this.editAudio();
        },
        editAudio() {
            // 修改
            const saveParams = this.AUDIO;
            if (this.textSrc) {
                saveParams.extra = this.textSrc;
            }
            hotspotContent(
                {
                    type: "post",
                    data: saveParams
                },
                saveParams.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                }
            });
        },
        deleteItem() {
            this.$confirm(`此操作文件, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.textSrc = "";
                    this.AUDIO.content = "";
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        onConfirm(data) {
            Object.assign(this.selectData, data);
            console.log(data);
        },
        onSuccess(src) {
            console.log(src, "src");
            this.$set(this.AUDIO, "extra", src);
        },
        openAction() {
            this.attchmentId = this.data.id;
            this.editData = this.IMAGE;
            this.isOpenAction = true;
        },
        audition() {
            if (!this.AUDIO.content) {
                return this.$message.error("请输入文字");
            }
            youdao(
                {
                    type: "post"
                },
                `?text=${this.AUDIO.content}&langType=${this.langType}`
            ).then(res => {
                this.textTransform = res.data;
                this.shows.isOpenAudition = true;
                this.attchmentId = this.data.id;
                this.editData = this.AUDIO;
                console.log("生成成功", res);
            });
        },
        addAudio() {
            if (!this.AUDIO.content) {
                return this.$message.error("请输入文字");
            }
            this.attchmentId = this.data.id;
            this.editData = this.AUDIO;
            this.editType = "audio";
            this.shows.isOpenAudioDialog = true;
        },
        onConfirmAudio(src) {
            // 试听之后确定回调
            this.textSrc = src;
            this.AUDIO.extra = src;
        },
        handerAttachment(type) {
            // 获取具体的附件信息
            hotspotContent(
                {
                    type: "get",
                    data: {
                        hotspotId: this.data.id,
                        type,
                        size: 1000,
                        page: 1
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    if (type === "AUDIO" && res.data && res.data[0]) {
                        this.AUDIO = res.data[0];
                    }
                    if (type === "IMAGE" && res.data && res.data[0]) {
                        this.IMAGE = res.data[0];
                        this.selectData.img1 = this.IMAGE.extra;
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.addGuidedialog {
    /deep/.el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .hostcontent {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .hostcontent_left {
                width: 50%;
                // border-right: 1px solid rgba(245, 245, 245, 1);
                margin-right: 10px;
                .info {
                    display: flex;
                    .action {
                        width: 166px;
                        height: 166px;
                        // background: rgba(216, 216, 216, 1) center center;
                        background-position: center center;
                        background-size: 100%;
                        img {
                            width: 100%;
                            max-width: 100%;
                        }
                    }
                    .digest {
                        margin-left: 10px;
                    }
                }
                .content {
                    margin-top: 10px;
                    .el-textarea {
                        textarea {
                            resize: none;
                        }
                    }
                }
            }
            .hostcontent_right {
                // display: flex;
                // align-items: center;
                .lang {
                    margin: 30px 0;
                    margin-bottom: 20px;
                }
                .operator {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    i {
                        font-size: 20px;
                    }
                }
            }
        }
        .el-dialog__body {
            height: 350px;
        }
    }
}
</style>
