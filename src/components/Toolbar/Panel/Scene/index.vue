<template>
    <el-drawer
        title="我是标题"
        :visible.sync="drawerHotContent"
        :with-header="false"
        :size="296"
        :before-close="handleClose"
    >
        <div class="panel_sidebar">
            <div class="attachment common">
                <div class="title">
                    <span>场景列表</span>
                    <i class="iconfont icontubiaoweb-24" @click="addAttachment"></i>
                </div>
                <div class="attachment_list">
                    <div class="header">
                        <span>链接内容</span>
                        <span>附件名称</span>
                        <span>操作</span>
                    </div>
                    <div class="body">
                        <div class="item" v-for="(item, index) in attachmentList" :key="index">
                            <div class="link" @click="editAttachment(item)">
                                <i class="iconfont icontubiaoweb-29"></i>
                            </div>
                            <div
                                class="link_name ellipsis"
                                @click="editOpenEditAttachmentName(item)"
                            >
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="item.title"
                                    placement="top-start"
                                >
                                    <span>{{ item.title }}</span>
                                </el-tooltip>
                            </div>
                            <div class="operate">
                                <i
                                    class="iconfont icontubiaoweb-21"
                                    @click="handleDel(item, index)"
                                ></i>
                                <i
                                    class="iconfont icontubiaoweb-22"
                                    @click="up(attachmentList, index)"
                                ></i>
                                <i
                                    class="iconfont icontubiaoweb-23"
                                    @click="down(attachmentList, index)"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 富文本编辑器 -->
            <!-- <RichTextBoxDialog :visible.sync="shows.isOpenRichTextBoxDialog"></RichTextBoxDialog> -->
            <!-- 音频资源 -->
            <!-- <AudioDialog :visible.sync="shows.isOpenAudioDialog"></AudioDialog> -->
            <!-- 视频资源 -->
            <!-- <VideoDialog :visible.sync="shows.isOpenVideoDialog"></VideoDialog> -->

            <AttachmentComponent
                :visible.sync="shows.isOpenAttachment"
                :data="currentItem"
            ></AttachmentComponent>

            <!-- 修改附件弹窗 -->
            <editAttachmentDialog
                :visible.sync="shows.isOpenEditAttachment"
                :data="currentItem"
                :onSuccess="getAttachmentList"
            ></editAttachmentDialog>
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from "vuex";

// import RichTextBoxDialog from "../Dialog/RichTextBoxDialog";
// import AudioDialog from "../Dialog/AudioDialog";
// import VideoDialog from "../Dialog/VideoDialog";

import AttachmentComponent from "../../Dialog";

import editSceneDialog from "./editScene";

import { hotspot, hotspotDetail, projectDetail } from "@/model/api";

export default {
    name: "Attachment",
    data() {
        return {
            shows: {
                isOpenRichTextBoxDialog: false, // 富文本弹窗
                isOpenAudioDialog: false, // 音频资源
                isOpenVideoDialog: false, // 视频资源
                isOpenAttachment: false, // 附件弹窗
                isOpenEditAttachment: false // 修改附件弹窗
            },
            attachmentList: [], // 获取附件列表
            newArr: [], //
            currentItem: {}
        };
    },
    components: {
        // RichTextBoxDialog,
        // AudioDialog,
        // VideoDialog,
        AttachmentComponent,
        editSceneDialog
    },
    computed: {
        ...mapState({
            drawerHotContent: state => state.toolbarStore.drawerHotContent
        })
    },
    watch: {
        drawerHotContent(newVal, oldVal) {
            if (newVal) {
                this.getAttachmentList();
            }
        }
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerHotContent");
        },
        delAttach(id) {
            // 删除附件
            hotspotDetail({ type: "delete" }, id).then(res => {
                if (res.suceeded) {
                    this.getAttachmentList();
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                }
            });
        },
        handleDel(item, index) {
            this.$confirm(`此操作将永久删 ${item.title}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.delAttach(item.id);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        addAttachment() {
            const projectId = this.$route.params.projectId;
            hotspot({
                type: "post",
                data: {
                    projectId,
                    title: "请修改附件名称",
                    type: "ATTACHMENT"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.getAttachmentList();
                }
            });
        },
        getAttachmentList() {
            const projectId = this.$route.params.projectId;
            // 通过任务id获取项目的有关信息
            hotspot({
                type: "GET",
                data: {
                    projectId,
                    type: "ATTACHMENT",
                    page: "1",
                    size: "1000"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.attachmentList = res.data.content;
                    console.log(res.data, "attach");
                } else {
                }
            });
        },
        sortAttachment() {
            const projectId = this.$route.params.projectId;
            const hotspotIds = this.newArr.map(item => item.id);
            projectDetail(
                {
                    type: "post",
                    data: {
                        hotspotIds
                    }
                },
                `${projectId}/hotspot/changeSeq`
            ).then(res => {
                if (res.suceeded) {
                    this.getAttachmentList();
                    console.log(res);
                }
            });
        },
        up(arr, index) {
            if (arr.length > 1 && index !== 0) {
                this.newArr = this.swapItems(arr, index, index - 1);
                this.sortAttachment();
            }
        },
        down(arr, index) {
            if (arr.length > 1 && index !== arr.length - 1) {
                this.newArr = this.swapItems(arr, index, index + 1);
                this.sortAttachment();
            }
        },
        swapItems(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
        editOpenEditAttachmentName(data) {
            // 修改附件名称弹窗
            this.currentItem = data;
            this.shows.isOpenEditAttachment = true;
            console.log(data);
        },
        editAttachment(data) {
            this.currentItem = data;
            this.shows.isOpenAttachment = true;
        }
    }
};
</script>

<style lang="less">
.attachment {
    .title {
        height: 88px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 24px;
        }
        i {
            font-size: 24px;
            color: rgba(15, 79, 168, 1);
        }
    }
    .attachment_list {
        .header {
            display: flex;
            justify-content: space-between;
            height: 32px;
            align-items: center;
            background: rgba(248, 248, 248, 1);
            span {
                width: 33%;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 19px;
                text-align: center;
            }
        }
        .body {
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 42px;
                border-bottom: 1px solid #eee;
                & > div {
                    width: 33%;
                    text-align: center;
                    &.link_name {
                        width: 70px;
                        text-align: left;
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        color: rgba(102, 102, 102, 1);
                        line-height: 19px;
                    }
                    &.operate {
                        display: flex;
                        justify-content: space-around;
                    }
                    i {
                        font-size: 16px;
                        color: rgba(15, 79, 168, 1);
                    }
                }
            }
        }
    }
}
</style>
