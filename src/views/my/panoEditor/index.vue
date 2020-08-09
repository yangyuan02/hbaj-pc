<template>
    <div class="p_editor_container">
        <div id="p_editor" :style="{ width: isOpenedWidth.width }"></div>
        <SceneList></SceneList>
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
        }
    },
    computed: {
        isOpenedWidth: function() {
            const data = this.$store.state.toolbarStore;
            const isOpen = Object.values(data)
                .filter(item => item === false || item === true)
                .some(item => item);
            return {
                width: `calc(100% - ${isOpen ? (this.isOpenScene ? "616px" : "310px") : "0px"})`
            };
        },
        isOpenScene: function() {
            return this.$store.state.toolbarStore.openScene;
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
