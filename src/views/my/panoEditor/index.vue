<template>
    <div class="p_editor_container">
        <div id="p_editor"></div>
        <!-- 右侧工具条 -->
        <Toolbar></Toolbar>
    </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
export default {
    data() {
        return {};
    },
    components: {
        Toolbar
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
        flex: 1;
        margin-right: 14px;
    }
}
</style>
