<template>
    <!-- <el-drawer
        title="我是标题"
        :visible.sync="drawerHotContent"
        :with-header="false"
        :size="296"
        :before-close="handleClose"
        :modal="false"
        :wrapperClosable="false"
    > -->
    <div class="panel_sidebar" v-if="drawerHotContent">
        <div class="attachment common">
            <div class="title">
                <span>添加场景资源</span>
                <i class="iconfont icontubiaoweb-24 cursor" @click="addScene"></i>
            </div>
            <div class="attachment_list">
                <div class="header">
                    <!-- <span>链接内容</span> -->
                    <span style="text-align:left">场景名称</span>
                    <span>操作</span>
                </div>
                <div class="body">
                    <div
                        class="item"
                        v-for="(item, index) in attachmentList"
                        :key="index"
                        @click="select(index, item)"
                        :class="{ active: index === currentIndex }"
                    >
                        <!-- <div class="link" @click="editOpenEditAttachmentName(item)">
                                <i class="iconfont icontubiaoweb-29"></i>
                            </div> -->
                        <div class="link_name ellipsis" @click="loadpanoscene(item)">
                            <el-tooltip
                                class="item"
                                effect="light"
                                :content="item.name"
                                placement="left"
                                offset="30"
                                :enterable="false"
                            >
                                <span>{{ item.name }}</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="triangle-right" @click="closeDrawer"></div>
    </div>
    <!-- </el-drawer> -->
</template>

<script>
import { mapState } from "vuex";

import { hotspot, hotspotDetail, projectDetail } from "@/model/api";

import Bus from "@/components/bus/index.js";

export default {
    name: "Attachment",
    data() {
        return {
            attachmentList: [], // 获取附件列表
            newArr: [], //
            currentItem: {},
            currentIndex: null,
            isUpDown: false
        };
    },
    components: {
        // AttachmentComponent
        // editSceneDialog
    },
    computed: {
        ...mapState({
            drawerHotContent: state => state.toolbarStore.drawerHotContent
        })
    },
    watch: {
        drawerHotContent(newVal, oldVal) {
            if (newVal) {
                this.getAttachmentList().then(res => {
                    this.attachmentList.length > 0 && this.select(0, this.attachmentList[0]);
                });
            }
        }
    },
    methods: {
        select(index, data) {
            console.log("111");
            if (this.isUpDown) {
                // bug
                return false;
            }
            this.loadpanoscene(data);
            this.currentIndex = index;
        },
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerHotContent");
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
            this.$confirm(`此操作仅删除${item.name}场景，场景标签将被暂时保留, 是否继续?`, "提示", {
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
        async getAttachmentList() {
            const projectId = this.$route.params.projectId;
            // 通过任务id获取项目的有关信息
            try {
                const { suceeded, data } = await projectDetail(
                    {
                        type: "GET",
                        data: {
                            projectId,
                            page: "1",
                            size: "1000"
                        }
                    },
                    `${projectId}/panoInfo`
                );
                if (suceeded) {
                    this.attachmentList = data;
                }
            } catch (error) {
                console.error(error);
            }
        },
        sortAttachment() {
            const projectId = this.$route.params.projectId;
            const sceneIds = this.newArr.map(item => item.id);
            projectDetail(
                {
                    type: "post",
                    data: {
                        sceneIds,
                        projectId
                    }
                },
                `${projectId}/scene/changeSeq`
            ).then(res => {
                if (res.suceeded) {
                    this.getAttachmentList();
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
        editOpenEditAttachmentName(data) {
            this.$store.commit("SETSCENELIST", { id: data.id, code: data.code });
        },
        loadpanoscene(data) {
            window.loadpanoscene && window.loadpanoscene(data.id, data.code);
            this.editOpenEditAttachmentName(data);
        },
        addScene() {
            // 新增场景
            const sceneId = window.getScenePara && window.getScenePara()[4];
            const isScene = this.attachmentList.find(item => sceneId === item.id);
            const sceneIds = this.attachmentList.map(item => item.id);
            sceneIds.push(sceneId);
            if (!isScene) {
                const projectId = this.$route.params.projectId;
                projectDetail(
                    {
                        type: "post",
                        data: {
                            projectId,
                            sceneIds: [sceneId]
                        }
                    },
                    `${projectId}/scene`
                ).then(res => {
                    if (res.suceeded) {
                        this.getAttachmentList();
                    }
                });
            } else {
                this.$message({
                    type: "error",
                    message: "已经在场景列表中了"
                });
            }
        },
        closeDrawer() {
            this.$store.commit("TOGGLE_DRAWER", "drawerHotContent");
            if (this.$store.state.toolbarStore.openScene) {
                this.$store.commit("TOGGLE_DRAWER", "openScene");
            }
        },
        isCloseScene(code) {
            // 是否关闭场景列表
            if (code) {
                const index = this.attachmentList.findIndex(
                    item => item.id.toString() === code.toString()
                );
                if (index === -1) {
                    this.$store.commit("SETOPENSCENE");
                    // this.$store.state.toolbarStore.openScene = false;
                } else {
                    const data = this.attachmentList[index];
                    this.select(index, data);
                }
            }
        }
    },
    mounted() {
        window._hban_addScene = () => {
            if (!this.drawerHotContent) {
                Bus.$emit("toolbar-hander", { type: "drawerHotContent", index: 3 });
            }
            this.getAttachmentList().then(res => {
                this.addScene();
            });
        };
        window.isCloseScene = this.isCloseScene;
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
                    text-align: left;
                    &:last-child {
                        text-align: center;
                    }
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
                            width: 170px;
                            text-align: left;
                            font-size: 14px;
                            font-family: MicrosoftYaHei;
                            color: rgba(102, 102, 102, 1);
                            line-height: 19px;
                            cursor: pointer;
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
                .active {
                    background: rgb(255, 165, 0);
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
