<template>
    <el-drawer
        title="我是标题"
        :visible.sync="drawerGuideContent"
        :with-header="false"
        :size="296"
        :before-close="handleClose"
        :modal="false"
        :wrapperClosable="false"
    >
        <div class="panel_sidebar">
            <div class="attachment common">
                <div class="title">
                    <span>引导脚本列表</span>
                    <i class="iconfont icontubiaoweb-24" @click="addGuide"></i>
                </div>
                <div class="attachment_list">
                    <div class="header">
                        <span>链接内容</span>
                        <span>脚本名称</span>
                        <span>操作</span>
                    </div>
                    <div class="body">
                        <div class="item" v-for="(item, index) in attachmentList" :key="index">
                            <div class="link">
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

            <AttachmentComponent
                :visible.sync="shows.isOpenAttachment"
                :data="currentItem"
            ></AttachmentComponent>
            <div id="triangle-right" @click="closeDrawer"></div>

            <!-- 修改附件弹窗 -->
            <!-- <editSceneDialog
                :visible.sync="shows.isOpenEditAttachment"
                :data="currentItem"
                :onSuccess="getAttachmentList"
            ></editSceneDialog> -->
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from "vuex";

import AttachmentComponent from "../../Dialog";

// import editSceneDialog from "./editScene";

import { hotspot, hotspotDetail, projectDetail } from "@/model/api";

export default {
    name: "Attachment",
    data() {
        return {
            shows: {
                isOpenAttachment: false // 附件弹窗
                // isOpenEditAttachment: false // 修改附件弹窗
            },
            attachmentList: [], // 获取附件列表
            newArr: [], //
            currentItem: {}
        };
    },
    components: {
        AttachmentComponent
        // editSceneDialog
    },
    computed: {
        ...mapState({
            drawerGuideContent: state => state.toolbarStore.drawerGuideContent
        })
    },
    watch: {
        drawerGuideContent(newVal, oldVal) {
            if (newVal) {
                this.getAttachmentList();
            }
        }
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerGuideContent");
        },
        delAttach(id) {
            // 删除附件
            const projectId = this.$route.params.projectId;
            projectDetail({ type: "delete" }, `${projectId}/scene/${id}`).then(res => {
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
            this.$confirm(`此操作将永久删 ${item.name}, 是否继续?`, "提示", {
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
        getAttachmentList() {
            const projectId = this.$route.params.projectId;
            // 通过任务id获取项目的有关信息
            hotspot({
                type: "GET",
                data: {
                    projectId,
                    type: "GUIDE",
                    page: "1",
                    size: "1000"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.attachmentList = res.data.content || [];
                    console.log(res.data, "attach");
                } else {
                }
            });
        },
        sortAttachment() {
            const projectId = this.$route.params.projectId;
            const sceneIds = this.newArr.map(item => item.id);
            projectDetail(
                {
                    type: "post",
                    data: {
                        sceneIds
                    }
                },
                `${projectId}/scene/changeSeq`
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
            this.$store.commit("SETGuIDELIST");
        },
        closeDrawer() {
            this.$store.commit("TOGGLE_DRAWER", "drawerGuideContent");
            if (this.$store.state.toolbarStore.openGuideScene) {
                this.$store.commit("TOGGLE_DRAWER", "openGuideScene");
            }
        },
        addGuide() {
            const projectId = this.$route.params.projectId;
            // 通过任务id获取项目的有关信息
            hotspot({
                type: "post",
                data: {
                    projectId,
                    type: "GUIDE",
                    title: "请修改脚本介绍"
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
        }
    }
};
</script>

<style lang="less">
.panel_sidebar {
    position: relative;
    box-shadow: none;
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
    #triangle-right {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-left: 20px solid #eee;
        border-bottom: 10px solid transparent;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50);
    }
}
</style>
