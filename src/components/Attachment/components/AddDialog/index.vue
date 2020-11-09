<template>
    <component
        :is="tag.component"
        ref="tab-child"
        v-if="defaultTabName === tag.order"
        :hotspotId="hotspotId"
        :id="id"
        :onSuccess="onSuccess"
        :visible.sync="visible"
    />
</template>

<script>
import AudioDialog from "./AudioDialog";
import AudioEngDialog from "./AudioEngDialog";
import ImageDialog from "./ImageDialog";
import TextDialog from "./TextDialog";
import VideoDialog from "./VideoDialog";
export default {
    props: {
        hotspotId: {
            // 热点id
            type: [String, Number],
            required: true
        },
        id: {
            // 具体的某一个id
            type: [String, Number]
        },
        onSuccess: {
            // 确定之后的回调
            type: Function,
            default: () => {}
        },
        visible: {
            type: Boolean,
            default: false
        },
        defaultTabName: {
            // 动态组件的哪一个
            type: String,
            default: "1"
        }
    },
    data() {
        return {
            tabs: [
                { component: TextDialog, name: "文本弹窗", order: "1", class: "TextDialog" },
                { component: ImageDialog, name: "图片弹窗", order: "2", class: "ImageDialog" },
                { component: AudioDialog, name: "音频弹窗", order: "3", class: "AudioDialog" },
                { component: VideoDialog, name: "视频弹窗", order: "4", class: "VideoDialog" }
                // { component: RichTextBox, name: "富文本", order: "5", class: "RichTextBox" }
            ]
        };
    }
};
</script>
