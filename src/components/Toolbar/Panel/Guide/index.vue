<template>
    <!-- <el-drawer
        title="我是标题"
        :visible.sync="drawerGuideContent"
        :with-header="false"
        :size="296"
        :before-close="handleClose"
        :modal="false"
        :wrapperClosable="false"
    > -->
    <div class="panel_sidebar" v-if="drawerGuideContent">
        <div class="attachment common">
            <div class="title">
                <span>编辑对话或独白</span>
                <i class="iconfont icontubiaoweb-24 cursor" @click="addGuide"></i>
            </div>
            <div class="attachment_list">
                <div class="header">
                    <span style="width:14%">内容</span>
                    <span style="width:170px">概要</span>
                    <span>操作</span>
                </div>
                <div class="body">
                    <div
                        class="item"
                        v-for="(item, index) in attachmentList"
                        :key="index"
                        @click="select(index)"
                        :class="{ active: index === currentIndex }"
                    >
                        <div class="link" style="width:13%">
                            <i
                                class="iconfont icontubiaoweb-29 cursor"
                                @click="openHotspotConent(item)"
                            ></i>
                        </div>
                        <div
                            class="link_name ellipsis cursor"
                            @click="editOpenEditAttachmentName(item)"
                        >
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
                            <i class="iconfont icontubiaoweb-28" @click="edit(item, index)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="triangle-right" @click="closeDrawer"></div>

        <HotspotConent
            :visible.sync="shows.isOpenHotspotConent"
            :data="currentItem"
            :onSuccess="getAttachmentList"
        ></HotspotConent>

        <!-- 修改附件弹窗 -->
        <editSceneDialog
            :visible.sync="shows.isOpenEditAttachment"
            :data="currentItem"
            :onSuccess="getAttachmentList"
        ></editSceneDialog>
    </div>
    <!-- </el-drawer> -->
</template>

<script>
import { mapState } from "vuex";

// 批量新增弹窗
import HotspotConent from "./Dialog";

import editSceneDialog from "./editGuide";

import { hotspot, hotspotDetail, projectDetail, hotspotContentDetail } from "@/model/api";

import Bus from "@/components/bus/index.js";

export default {
    name: "Attachment",
    data() {
        return {
            shows: {
                // isOpenAttachment: false, // 附件弹窗
                isOpenHotspotConent: false, // 批量新增弹窗
                isOpenEditAttachment: false // 修改附件弹窗
            },
            attachmentList: [], // 获取附件列表
            newArr: [], //
            currentItem: {},
            currentIndex: null,
            isUpDown: false
        };
    },
    components: {
        HotspotConent,
        editSceneDialog
    },
    computed: {
        ...mapState({
            drawerGuideContent: state => state.toolbarStore.drawerGuideContent
        })
    },
    watch: {
        drawerGuideContent(newVal, oldVal) {
            if (newVal) {
                this.getAttachmentList().then(res => {
                    this.attachmentList.length > 0 && this.select(0);
                });
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
            this.$store.commit("TOGGLE_DRAWER", "drawerGuideContent");
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
        async getAttachmentList() {
            const projectId = this.$route.params.projectId;
            // 通过任务id获取项目的有关信息
            try {
                const { suceeded, data } = await hotspotDetail(
                    {
                        type: "GET",
                        data: {
                            projectId,
                            type: "GUIDE",
                            page: "1",
                            size: "1000"
                        }
                    },
                    "/all"
                );
                if (suceeded) {
                    this.attachmentList = data || [];
                    const currentIndex = this.currentIndex;
                    if (this.attachmentList[currentIndex]) {
                        this.editOpenEditAttachmentName(this.attachmentList[currentIndex]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
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
                this.isUpDown = true;
                this.currentIndex = index + 1;
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
            const { locationX, locationY, sceneId } = data;
            if (sceneId) {
                window.backFindHotspotId && backFindHotspotId(sceneId, locationX, locationY);
            }
            this.$store.commit("SETGuIDELIST", data);
        },
        edit(data) {
            // 修改附件名称弹窗
            this.currentItem = data;
            this.shows.isOpenEditAttachment = true;
            console.log(data);
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
            const getScenePara = window.getScenePara && window.getScenePara();

            hotspot({
                type: "post",
                data: {
                    projectId,
                    type: "GUIDE",
                    title: "请修改脚本介绍",
                    locationX: getScenePara[2], //获取的热点横坐标
                    locationY: getScenePara[3], //获取的热点垂向坐标,
                    sceneId: getScenePara[4], //场景ID
                    locationFov: getScenePara[1] //场景的视角
                }
            }).then(res => {
                if (res.suceeded) {
                    this.defualtAddContent(res.data.id);
                }
            });
        },
        defualtAddContent(hotspotId) {
            // 默认添加
            const image = {
                // 参数
                content: "upaction", // 内容
                extra: "static/app/gudiance/up.png", // 附件url
                hotspotId, //
                title: "引导标识", // 标题
                type: "IMAGE" // 类型
            };
            const audio = {
                // 参数
                content: "请添加语音说明", // 内容
                extra: "static/app/sound/defaultguide_001.wav", // 默认值
                hotspotId, //
                title: "请添加内容提示", // 标题
                type: "AUDIO" // 类型
            };
            const hotspotContentList = [image, audio];

            const params = {
                hotspotContentList
            };
            hotspotContentDetail({
                type: "post",
                data: params
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
        openHotspotConent(data) {
            this.currentItem = data;
            this.shows.isOpenHotspotConent = true;
        },
        initBus() {
            Bus.$on("updetaSuccess", () => {
                this.getAttachmentList();
            });
        }
    },
    mounted() {
        this.initBus();
        window._hban_addGuide = () => {
            if (!this.drawerGuideContent) {
                Bus.$emit("toolbar-hander", { type: "drawerGuideContent", index: 4 });
            }
            this.addGuide();
        };
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
                            width: 170px;
                            text-align: left;
                            font-size: 12px;
                            font-family: MicrosoftYaHei;
                            color: rgba(102, 102, 102, 1);
                            line-height: 19px;
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
