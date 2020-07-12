<template>
    <div class="bg_nav" id="pano">
        <!-- <Nav></Nav> -->
    </div>
</template>

<script>
// import Nav from "@/components/common/Nav";
export default {
    data() {
        return {};
    },
    methods: {
        initPano() {
            this.$nextTick(() => {
                embedpano({
                    id: "kr",
                    swf: "/pano/tour.swf",
                    xml: "/pano/main_fp.xml",
                    target: "pano",
                    html5: "prefer",
                    mobilescale: 1.0,
                    passQueryParameters: true
                });
            });
        }
    },
    components: {
        // Nav
    },
    mounted() {
        this.initPano();
    }
};
</script>

<style lang="less">
.bg_nav {
    // width: 749px;
    flex: 1;
    height: 100%;
    background: url("./images/nav.png") no-repeat;
    background-size: 100%;
    margin-left: 14px;
    // padding-top: 62px;
    // padding-left: 24px;
    cursor: move;
    position: relative;
    nav {
        position: absolute;
        left: 24px;
        top: 62px;
        z-index: 10;
    }
}
</style>
