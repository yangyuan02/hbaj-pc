<template>
    <div class="audio-class">
        <div class="title">{{ title }}</div>
        <div class="panel-audio">
            <div class="audio">
                <audio
                    id="audioPlayer"
                    :src="globalConfig.imagePath + src"
                    controlsList="nodownload"
                    controls="controls"
                    ref="audio"
                ></audio>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            // 音频资源标题
            default: "默认标题",
            type: String
        },
        src: {
            // 音频资源链接
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
.audio-class {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    .panel-audio {
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
    }
}
</style>
