<template>
    <div class="panel_sidebar" v-if="drawerAttachment">
        <div class="attachment common">
            <div class="title">
                <span>添加课件参考</span>
                <i class="iconfont icontubiaoweb-24 cursor" @click="addAttachment"></i>
            </div>
            <div class="attachment_list">
                <div class="attachment-header">
                    <span style="width:14%">详情</span>
                    <span style="width:170px">课件参考</span>
                    <span>操作</span>
                </div>
                <div class="attachment-body">
                    <div
                        class="item"
                        v-for="(item, index) in attachmentList"
                        :key="index"
                        :class="{ active: index === currentIndex }"
                        @click="select(index)"
                    >
                        <div class="link" @click="editAttachment(item)" style="width:13%">
                            <i class="iconfont icontubiaoweb-29 cursor"></i>
                        </div>
                        <div class="link_name ellipsis cursor">
                            <el-tooltip
                                class="item"
                                effect="light"
                                :content="item.title"
                                placement="left"
                                offset="30"
                                :enterable="false"
                            >
                                <span>{{ item.title }}</span>
                            </el-tooltip>
                        </div>
                        <div class="operate">
                            <i
                                class="iconfont icontubiaoweb-21 cursor"
                                @click="handleDel(item, index)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-22 cursor"
                                @click="up(attachmentList, index)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-23 cursor"
                                @click="down(attachmentList, index)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-28 cursor"
                                @click="editOpenEditAttachmentName(item, index)"
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AttachmentComponent
            :visible.sync="shows.isOpenAttachment"
            :hotspotId="currentItem.id"
            v-if="currentItem.id"
            :orderList="['文章', '音频', '视频']"
        ></AttachmentComponent>

        <!-- 修改附件弹窗 -->
        <editAttachmentDialog
            :visible.sync="shows.isOpenEditAttachment"
            :data="currentItem"
            :onSuccess="getAttachmentList"
        ></editAttachmentDialog>
    </div>
</template>

<script>
import { mapState } from "vuex";

import AttachmentComponent from "@/components/Attachment";

import editAttachmentDialog from "./editAttachment";

import { hotspot, hotspotDetail, projectDetail } from "@/model/api";
import Bus from "@/components/bus/index.js";

export default {
    name: "Attachment",
    data() {
        return {
            shows: {
                isOpenAttachment: false, // 附件弹窗
                isOpenEditAttachment: false // 修改附件弹窗
            },
            attachmentList: [], // 获取附件列表
            newArr: [], //
            currentItem: {},
            isUpDown: false,
            currentIndex: null // 当前选择行
        };
    },
    components: {
        AttachmentComponent,
        editAttachmentDialog
    },
    computed: {
        ...mapState({
            drawerAttachment: state => state.toolbarStore.drawerAttachment
        })
    },
    watch: {
        drawerAttachment(newVal, oldVal) {
            if (newVal) {
                this.getAttachmentList();
            }
        }
    },
    methods: {
        select(index) {
            console.log("111");
            if (this.isUpDown) {
                // bug
                return false;
            }
            this.currentIndex = index;
        },
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerAttachment");
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
                    title: "新增课件参考",
                    type: "ATTACHMENT"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.$message({
                        type: "success",
                        message: "操作成功"
                    });
                    this.getAttachmentList();
                }
            });
        },
        getAttachmentList() {
            const projectId = this.$route.params.projectId;
            // 通过任务id获取项目的有关信息
            hotspotDetail(
                {
                    type: "GET",
                    data: {
                        projectId,
                        type: "ATTACHMENT",
                        page: "1",
                        size: "1000"
                    }
                },
                "/all"
            ).then(res => {
                if (res.suceeded) {
                    this.attachmentList = res.data;
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
                        hotspotIds,
                        projectId
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
                this.isUpDown = true;
                this.currentIndex = index - 1;
                this.sortAttachment();
                setTimeout(() => {
                    this.isUpDown = false;
                }, 0);
            }
        },
        down(arr, index) {
            if (arr.length > 1 && index !== arr.length - 1) {
                this.newArr = this.swapItems(arr, index, index + 1);
                this.currentIndex = index + 1;
                this.isUpDown = true;
                this.sortAttachment();
                setTimeout(() => {
                    this.isUpDown = false;
                }, 0);
            }
        },
        swapItems(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
        editOpenEditAttachmentName(data, index) {
            // 修改附件名称弹窗
            this.currentIndex = index;
            this.currentItem = {};
            this.currentItem = data;
            this.shows.isOpenEditAttachment = true;
            console.log(data);
        },
        editAttachment(data) {
            this.currentItem = data;
            this.shows.isOpenAttachment = true;
        }
    },
    mounted() {
        // 暴露给全景
        window._hban_addAttachment = () => {
            if (!this.drawerAttachment) {
                Bus.$emit("toolbar-hander", { type: "drawerAttachment", index: 2 });
            }
            this.addAttachment();
        };
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
        .attachment-header {
            display: flex;
            // justify-content: space-between;
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
        .attachment-body {
            .item {
                display: flex;
                // justify-content: space-between;
                align-items: center;
                height: 42px;
                // min-height: 42px;
                border-bottom: 1px solid #eee;
                & > div {
                    width: 33%;
                    text-align: center;
                    &.link_name {
                        width: 170px;
                        text-align: left;
                        font-size: 12px;
                        font-family: MicrosoftYaHei;
                        color: rgba(102, 102, 102, 1);
                        line-height: 19px;
                        margin-left: 4px;
                    }
                    &.operate {
                        display: flex;
                        justify-content: space-around;
                    }
                    i {
                        font-size: 12px;
                        color: rgba(15, 79, 168, 1);
                    }
                }
            }
            .active {
                background: rgb(255, 165, 0);
            }
        }
    }
}
</style>
