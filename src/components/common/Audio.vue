<template>
    <div class="audio-class">
        <div class="panel-audio">
            <span class="title"> {{ title }}</span>
            <div class="audio">
                <audio
                    id="audioPlayer"
                    :src="src"
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
            default: "",
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
<style lang="less"></style>
