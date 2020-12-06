<template>
    <div class="guideList" v-if="openGuideScene">
        <div class="attachment common">
            <div class="title">
                <span>定位概要位置</span>
                <!-- <i class="iconfont icontubiaoweb-24" @click="addScene"></i> -->
            </div>
            <div class="attachment_list">
                <div class="header">
                    <span style="width:13%">定位</span>
                    <span style="width:170px">场景名称</span>
                    <!-- <span>操作</span> -->
                </div>
                <div class="body">
                    <div
                        class="item cursor"
                        v-for="(item, index) in attachmentList"
                        :key="index"
                        @click="select(item, index)"
                        :class="{ active: index === currentIndex }"
                    >
                        <div class="link" style="width:13%">
                            <i
                                class="iconfont icontubiaoweb-26 cursor"
                                @click="updateHotspot(item)"
                                v-if="currentIndex === index"
                            ></i>
                        </div>
                        <div
                            class="link_name ellipsis cursor"
                            @click="loadpanoscene(item, index)"
                            style="width:170px"
                        >
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
                        <!-- <div class="operate">
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
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div id="triangle-right" @click="closeDrawer"></div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import { hotspot, hotspotDetail, projectDetail } from "@/model/api";
import Bus from "@/components/bus/index.js";

export default {
    name: "Attachment",
    data() {
        return {
            shows: {
                isOpenAttachment: false // 附件弹窗
            },
            attachmentList: [], // 获取附件列表
            newArr: [], //
            currentItem: {},
            currentIndex: null
        };
    },
    computed: {
        ...mapState({
            openGuideScene: state => state.toolbarStore.openGuideScene
        })
    },
    watch: {
        openGuideScene(newVal, oldVal) {
            if (newVal) {
                this.getAttachmentList();
            }
        },
        "$store.state.toolbarStore.GuideData.sceneId": function() {
            this.setCurrent(this.attachmentList);
        }
    },
    methods: {
        select(data, index) {
            this.currentIndex = index;
            this.loadpanoscene(data, index);
        },
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerHotContent");
        },
        setCurrent(list) {
            if (!list.length) {
                return false;
            }
            const GuideData = this.$store.state.toolbarStore.GuideData;
            const sceneId = GuideData.sceneId;
            const currentIndex = list.findIndex(item => item.id === sceneId);
            if (currentIndex || currentIndex === 0) {
                this.currentIndex = currentIndex;
            }
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
            projectDetail(
                {
                    type: "GET",
                    data: {
                        projectId,
                        page: "1",
                        size: "1000"
                    }
                },
                `${projectId}/panoInfo`
            ).then(res => {
                if (res.suceeded) {
                    this.attachmentList = res.data;
                    this.setCurrent(this.attachmentList);
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
            this.$store.commit("SETSCENELIST", data.id, data.code);
        },
        loadpanoscene(data, index) {
            window.loadpanoscene && window.loadpanoscene(data.id, data.code);
            this.currentIndex = index;
            // this.editOpenEditAttachmentName(data);
        },
        updateHotspot(newData) {
            const getScenePara = window.getScenePara && window.getScenePara();
            const projectId = this.$route.params.projectId;
            const GuideData = this.$store.state.toolbarStore.GuideData;
            const data = {
                locationFov: getScenePara[1], //场景的视角
                locationX: getScenePara[2], //获取的热点横坐标
                locationY: getScenePara[3], //获取的热点垂向坐标
                projectId, //项目ID
                sceneId: getScenePara[4], //场景ID
                id: GuideData.id, // 引导脚本列表id
                // title: "默认场景名称", //热点名称
                type: "GUIDE" //热点类型
            };

            hotspotDetail({ type: "put", data }, GuideData.id).then(res => {
                if (res.suceeded) {
                    this.getAttachmentList();
                    window.loadpanoscene && window.loadpanoscene(newData.id, newData.code);
                    this.currentIndex = null;
                    Bus.$emit("updetaSuccess");
                    this.$message({
                        type: "success",
                        message: "更新成功!"
                    });
                }
            });
        },
        closeDrawer() {
            this.$store.commit("TOGGLE_DRAWER", "drawerGuideContent");
            this.$store.commit("TOGGLE_DRAWER", "openGuideScene");
        }
    },
    mounted() {
        window._hban_addScene = this.addScene;
    }
};
</script>

<style lang="less">
.guideList {
    position: absolute;
    width: 296px;
    height: 100%;
    right: 346px;
    top: 0px;
    background: #fff;
    padding: 0 24px;
    z-index: 10;
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
                // text-align: left;
            }
            i {
                font-size: 24px;
                color: rgba(15, 79, 168, 1);
            }
        }
        .attachment_list {
            .header {
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
