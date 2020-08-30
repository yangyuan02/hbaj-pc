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
                            @click="isOpenAction = true"
                            :class="{ 'ui-lazyLoad-pic': !selectData.img1 }"
                        >
                            <img :src="selectData.img1" alt="" v-if="selectData.img1" />
                        </div>
                        <div class="digest">
                            <div class="title">
                                <span>简介</span>
                            </div>
                            <div class="text">
                                <p>{{ data.title }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="内容"
                            v-model="textContent"
                        ></el-input>
                    </div>
                </div>
                <div class="hostcontent_right">
                    <div class="hostcontent_audio">
                        <audio
                            id="audioPlayerGuide"
                            :src="textSrc"
                            controlsList="nodownload"
                            controls="controls"
                            ref="audio"
                        ></audio>
                    </div>
                    <div class="operator">
                        <i class="iconfont icontubiaoweb-34 cursor" @click="audition"></i>
                        <i
                            class="iconfont icontubiaoweb-33 cursor"
                            @click="shows.isOpenVideoDialog = true"
                        ></i>
                        <i class="iconfont icontubiaoweb-27 cursor" @click="deleteItem"></i>
                    </div>
                </div>
            </div>
        </main>
        <SelectAction :visible.sync="isOpenAction" :onConfirm="onConfirm"></SelectAction>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
        <VideoDialog
            :visible.sync="shows.isOpenVideoDialog"
            :id="attchmentId"
            :editData="editData"
            :onSuccess="getAttachmentVideo"
            :editType="editType"
        ></VideoDialog>
        <Audition
            :visible.sync="shows.isOpenAudition"
            :src="textTransform"
            :onConfirmAudio="onConfirmAudio"
        ></Audition>
    </el-dialog>
</template>

<script>
import SelectAction from "./SelectAction.vue";
import VideoDialog from "./VideoDialog";
import Audition from "./audition";
import { hotspotContentDetail, hotspotContent } from "@/model/api";

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
        VideoDialog,
        Audition
    },
    data() {
        return {
            textContent: "",
            textTransform: "", // 生成的url
            textSrc: "", // 确定之后的url
            shows: {
                isOpenVideoDialog: false,
                isOpenAudition: false
            },
            isOpenAction: false,
            loading: {
                save: false,
                detail: false
            },
            selectData: {
                img1: "",
                img2: ""
            },
            params: {
                // 参数
                content: "", // 内容
                // extra: "string", // 附件url
                hotspotId: 0, // 附件id
                // id: 0,
                // seq: 0, // 排序
                title: "", // 标题
                type: "TEXT" // 类型
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
            this.add();
        },
        deleteItem() {
            this.$confirm(`此操作文件, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.textSrc = "";
                    this.textContent = "";
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
        audition() {
            if (!this.textContent) {
                return this.$message.error("请输入文字");
            }
            youdao(this.textContent).then(res => {
                this.textTransform = res;
                this.shows.isOpenAudition = true;
                console.log("生成成功", res);
            });
        },
        onConfirmAudio(src) {
            // 试听之后确定回调
            this.textSrc = src;
        },
        add() {
            // 新增文本内容
            this.params.id = "";
            this.params.content = "upaction";
            this.params.hotspotId = this.data.id; // 列表中id
            this.params.extra = this.textSrc;
            this.params.title = "引导标识";
            this.params.type = "IMAGE";
            const hotspotContentList = [this.params];
            const params = {
                hotspotContentList
            };
            hotspotContentDetail({
                type: "post",
                data: params
            }).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        },
        edit() {
            // 修改文本
            hotspotContent(
                {
                    type: "post",
                    data: this.params
                },
                this.params.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                    this.onSuccess && this.onSuccess();
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
                        width: 96px;
                        height: 96px;
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
                .operator {
                    margin-top: 30px;
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
            height: 250px;
        }
    }
}
</style>
