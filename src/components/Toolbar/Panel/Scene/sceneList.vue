<template>
    <div class="scene_list" v-if="isOpenScene">
        <div class="attachment common">
            <div class="title">
                <span>添加场景标签</span>
                <i class="iconfont icontubiaoweb-24 cursor" @click="addHotScene"></i>
            </div>
            <div class="attachment_list">
                <div class="header">
                    <span style="width:13%">内容</span>
                    <span style="width:170px">标签名称</span>
                    <span>操作</span>
                </div>
                <div class="body" v-if="list && list.length" v-loading="loading">
                    <div
                        class="item"
                        v-for="(item, index) in list"
                        :key="index"
                        :class="{ active: index === currentIndex }"
                    >
                        <div class="link" style="width:13%">
                            <i
                                class="iconfont icontubiaoweb-29 cursor"
                                @click="editAttachment(item)"
                            ></i>
                        </div>
                        <div
                            class="link_name ellipsis cursor"
                            @click="backFindHotspot(item, index)"
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
                                class="iconfont icontubiaoweb-26 cursor"
                                @click="updateHotspot(item)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-21 cursor"
                                @click="handleDel(item)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-28 cursor"
                                @click="editOpenEditAttachmentName(item)"
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="triangle-right" @click="closeDrawer"></div>
        <!-- 修改附件弹窗 -->
        <editAttachmentDialog
            :visible.sync="isOpenEditAttachment"
            :data="currentItem"
            :onSuccess="() => getsceneList(this.$store.state.toolbarStore.id)"
        ></editAttachmentDialog>

        <!-- 附件弹窗 -->
        <AttachmentComponent
            :visible.sync="isOpenAttachment"
            :hotspotId="currentItem.id"
            dialogTitle="场景标签内容编辑"
            v-if="currentItem.id"
            :orderList="orderList"
            :engType="engType"
        ></AttachmentComponent>
    </div>
</template>

<script>
import { hotspot, hotspotDetail } from "@/model/api";
import editAttachmentDialog from "./editScene";
import AttachmentComponent from "@/components/Attachment";

export default {
    data() {
        return {
            list: [],
            loading: false,
            isOpenEditAttachment: false,
            isOpenAttachment: false,
            currentItem: {},
            id: "",
            engType: false, // 是否专业英语
            orderList: [],
            currentIndex: 0
        };
    },
    computed: {
        isOpenScene: function() {
            // 打开的时候应该还需要一点动画
            return this.$store.state.toolbarStore.openScene;
        },
        isDrawerHotContent() {
            return this.$store.state.toolbarStore.drawerHotContent;
        }
    },
    components: {
        editAttachmentDialog,
        AttachmentComponent
    },
    watch: {
        "$store.state.toolbarStore.id": function(newval) {
            if (newval) {
                this.getsceneList(newval);
            }
        }
    },
    methods: {
        // 获取场景列表
        getsceneList(id) {
            const projectId = this.$route.params.projectId;
            this.loading = true;
            hotspot({
                type: "get",
                data: {
                    projectId,
                    sceneId: id,
                    type: "DEFAULT",
                    page: 1,
                    size: 1000
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const list = res.data.content || [];
                    this.list = list;
                    const id = this.$store.state.toolbarStore.id;
                    const code = this.$store.state.toolbarStore.code;
                    window.loadpanoscene && window.loadpanoscene(id, code);
                }
            });
        },
        backFindHotspot(item, index) {
            // 这个做啥的，暂时不知道
            const { locationX, locationY } = item;
            const getScenePara = window.getScenePara && window.getScenePara();

            window.backFindHotspot && backFindHotspot(getScenePara[0], locationX, locationY);
            this.currentIndex = index;
        },
        updateHotspot(data) {
            const id = data.id;
            const getScenePara = window.getScenePara && window.getScenePara();
            const parasm = { ...data, locationX: getScenePara[2], locationY: getScenePara[3] };
            hotspotDetail({ type: "put", data: parasm }, id).then(res => {
                if (res.suceeded) {
                    this.getsceneList(this.$store.state.toolbarStore.id);
                    this.$message({
                        type: "success",
                        message: "更新成功!"
                    });
                }
            });
        },
        delScenel(id) {
            // 删除附件
            hotspotDetail({ type: "delete" }, id).then(res => {
                if (res.suceeded) {
                    this.getsceneList(this.$store.state.toolbarStore.id);
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
                    this.delScenel(item.id);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        editOpenEditAttachmentName(data) {
            console.log(data, "data");
            // 修改附件名称弹窗
            this.currentItem = data;
            this.isOpenEditAttachment = true;
        },
        addHotScene() {
            const getScenePara = window.getScenePara && window.getScenePara();
            const projectId = this.$route.params.projectId;
            const data = {
                locationFov: getScenePara[1], //场景的视角
                locationX: getScenePara[2], //获取的热点横坐标
                locationY: getScenePara[3], //获取的热点垂向坐标
                projectId, //项目ID
                sceneId: getScenePara[4], //场景ID
                title: "新增热点标签", //热点名称
                type: "DEFAULT" //热点类型
            };

            hotspot({ type: "post", data }).then(res => {
                if (res.suceeded) {
                    const id = this.$store.state.toolbarStore.id;
                    const code = this.$store.state.toolbarStore.code;
                    console.log(this.$store.state.toolbarStore, "toolbar");
                    this.getsceneList(id);
                    window.loadpanoscene && window.loadpanoscene(id, code);
                    this.$message({
                        type: "success",
                        message: "新增成功!"
                    });
                }
            });
        },
        editAttachment(data) {
            this.currentItem = {};
            this.currentItem = data;
            this.id = data.id;
            const modules = this.$route.params.modules;
            console.log(data, "data");
            if (modules && modules === "专业英语") {
                this.orderList = ["音频", "图片"];
                this.engType = true;
                this.isOpenAttachment = true;
            } else {
                this.orderList = ["文本", "图片", "音频", "视频"];
                this.engType = false;
                this.isOpenAttachment = true;
            }
        },
        closeDrawer() {
            this.$store.commit("TOGGLE_DRAWER", "drawerHotContent");
            this.$store.commit("TOGGLE_DRAWER", "openScene");
        }
    },
    mounted() {
        window._hban_addHotScene = () => {
            // 需要判断一级面板是否打开且选中
            if (!this.isDrawerHotContent) {
                return false;
            }
            this.addHotScene();
            return true;
        };
    }
};
</script>

<style lang="less">
.scene_list {
    position: absolute;
    width: 296px;
    height: 100%;
    right: 346px;
    // top: 0px;
    background: #fff;
    padding: 0 24px;
    z-index: 10;
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
                    .link {
                        display: flex;
                        justify-content: space-around;
                    }
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
}
</style>
