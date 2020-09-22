<template>
    <div class="p_editor_container" :style="{ paddingRight: isShowToobar ? '46px' : '0px' }">
        <div id="p_editor" :style="{ width: isOpenedWidth.width }"></div>
        <SceneList ref="SceneList" v-if="isShowToobar"></SceneList>
        <GuideList v-if="isShowToobar"></GuideList>
        <!-- 右侧工具条 -->
        <Toolbar v-if="isShowToobar"></Toolbar>
    </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import SceneList from "@/components/Toolbar/Panel/Scene/sceneList";
import GuideList from "@/components/Toolbar/Panel/Guide/guideList.vue";
export default {
    data() {
        return {};
    },
    components: {
        Toolbar,
        SceneList,
        GuideList
    },
    methods: {
        initPano() {
            const projectId = this.$route.params.projectId;
            this.$nextTick(() => {
                embedpano({
                    id: "kr",
                    swf: "/pano/tour.swf",
                    xml: `/pano/${this.isShowToobar ? "main" : "main_c"}.xml`,
                    target: "p_editor",
                    html5: "prefer",
                    mobilescale: 1.0,
                    passQueryParameters: true,
                    onready: buildProject(projectId)
                });
            });
        }
        // getZindex() {
        //     const zIndex = document.querySelector(".el-drawer__open").parentElement.style.zIndex;
        //     return parseInt(zIndex, 10);
        // }
    },
    computed: {
        isOpenedWidth: function() {
            const data = this.$store.state.toolbarStore;
            const toolbarList = [
                "drawerAttachment",
                "drawerIntro",
                "drawerPerson",
                "drawerHotContent",
                "drawerGuideContent"
            ];
            const isOpenListValue = toolbarList.map(item => data[item]).some(item => item);

            return {
                width: `calc(100% - ${
                    isOpenListValue
                        ? this.isOpenScene || this.isOpenGuideScene
                            ? "600px"
                            : "296px"
                        : "0px"
                })`
            };
        },
        isOpenScene: function() {
            return this.$store.state.toolbarStore.openScene;
        },
        isOpenGuideScene: function() {
            return this.$store.state.toolbarStore.openGuideScene;
        },
        isShowToobar: function() {
            // 1 我的任务过 2课件过来
            return this.$route.params.from === "1";
        }
    },
    beforeDestroy() {
        window.removepano && window.removepano("kr");
        this.$store.commit("SETTOGGLETOOLBR", "all");
    },
    mounted() {
        this.initPano();
    }
};
</script>

<style lang="less">
.p_editor_container {
    height: 100%;
    display: flex;
    position: relative;
    padding-right: 46px;
    #p_editor {
        // flex: 1;
        margin-right: 6px;
        transition: width 300ms;
        // position: relative;
    }
    .panel_sidebar {
        width: 296px;
        height: 100%;
        background: #fff;
        padding: 0 24px;
        // transform: translateX(296px);
        // display: none;
        position: absolute;
        top: 0;
        right: 46px;
        // overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 4px;
            /*height: 4px;*/
        }
        // &::-webkit-scrollbar-thumb {
        //     border-radius: 10px;
        //     -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        //     background: rgba(0, 0, 0, 0.2);
        // }
        // &::-webkit-scrollbar-track {
        //     -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        //     border-radius: 0;
        //     background: rgba(0, 0, 0, 0.1);
        // }
        .common {
            h2 {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
                padding: 10px 0;
            }
            .el-form-item {
                .el-form-item__label {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    line-height: 21px;
                }
            }
        }
    }
}
</style>
