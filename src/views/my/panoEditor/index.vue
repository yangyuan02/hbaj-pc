<template>
    <div class="p_editor_container">
        <div id="p_editor" :style="{ width: isOpenedWidth.width }"></div>
        <SceneList ref="SceneList"></SceneList>
        <GuideList></GuideList>
        <!-- 右侧工具条 -->
        <Toolbar></Toolbar>
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
            this.$nextTick(() => {
                embedpano({
                    id: "kr",
                    swf: "/pano/tour.swf",
                    xml: "/pano/main.xml",
                    target: "p_editor",
                    html5: "prefer",
                    mobilescale: 1.0,
                    passQueryParameters: true
                });
            });
        },
        getZindex() {
            const zIndex = document.querySelector(".el-drawer__open").parentElement.style.zIndex;
            return parseInt(zIndex, 10);
        }
    },
    computed: {
        isOpenedWidth: function() {
            const data = this.$store.state.toolbarStore;
            const isOpen = Object.values(data)
                .filter(item => item === false || item === true)
                .some(item => item);
            return {
                width: `calc(100% - ${
                    isOpen ? (this.isOpenScene || this.isOpenGuideScene ? "616px" : "0px") : "0px"
                })`
            };
        },
        isOpenScene: function() {
            return this.$store.state.toolbarStore.openScene;
        },
        isOpenGuideScene: function() {
            return this.$store.state.toolbarStore.openGuideScene;
        }
    },
    watch: {
        isOpenScene: function(val) {
            if (val) {
                this.$nextTick(() => {
                    const zIndex = this.getZindex() + 1;
                    const elesCene = document.querySelector(".scene_list");
                    if (elesCene) {
                        elesCene.style.zIndex = zIndex;
                    }
                });
            }
        },
        isOpenGuideScene: function(val) {
            if (val) {
                this.$nextTick(() => {
                    const zIndex = this.getZindex() + 1;
                    const eleGuide = document.querySelector(".guideList");
                    if (eleGuide) {
                        eleGuide.style.zIndex = zIndex;
                    }
                });
            }
        }
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
    #p_editor {
        // flex: 1;
        margin-right: 14px;
        transition: width 300ms;
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
