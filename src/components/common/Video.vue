<template>
    <div class="video-class">
        <div class="panel-video">
            <span class="title"> {{ title }}</span>
            <div class="video">
                <video id="videoPlayer" :src="src" ref="video" controls="controls"></video>
                <!-- <video :src="src" controls="controls"></video> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            // 视频资源标题
            default: "",
            type: String
        },
        src: {
            // 视频资源链接
            default: "",
            type: String
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less"></style>
