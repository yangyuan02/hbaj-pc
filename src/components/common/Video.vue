<template>
    <div class="video-class">
        <div class="title">{{ title }}</div>
        <div class="panel-video">
            <div class="video">
                <video
                    id="videoPlayer"
                    :src="globalConfig.imagePath + src"
                    ref="video"
                    controls="controls"
                ></video>
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
            default: "默认标题",
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
<style lang="less">
.panel-video {
    width: 600px;
    height: 263px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    // background: rgba(255, 255, 255, 1);
    // box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px 0px rgba(0, 0, 0, 0.05),
    //     0px 6px 16px -8px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    // border: 1px solid rgba(216, 216, 216, 1);
    .video {
        width: 100%;
        height: 100%;
        #videoPlayer {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
