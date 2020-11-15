<template>
    <component
        :is="defaultTabName"
        ref="tab-child"
        :hotspotId="hotspotId"
        :id="id"
        :onSuccess="onSuccess"
        :title="title"
        :content="content"
        :extra="extra"
    />
</template>

<script>
import AudioDialog from "./AudioDialog";
import AudioEngDialog from "./AudioEngDialog";
import ImageDialog from "./ImageDialog";
import TextDialog from "./TextDialog";
import VideoDialog from "./VideoDialog";
export default {
    components: {
        TextDialog,
        ImageDialog,
        AudioDialog,
        VideoDialog,
        AudioEngDialog
    },
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
        currentTabOrder: {
            // 动态组件的哪一个
            type: String,
            default: "1"
        },
        title: {
            type: [String]
        },
        content: {
            type: [String]
        },
        extra: {
            type: [String]
        },
        engType: {
            // 是否是专业英语
            type: Boolean,
            default: false
        }
    },
    computed: {
        defaultTabName() {
            const componentsData = this.tabs.find(item => item.order === this.currentTabOrder);
            return (componentsData && componentsData.component) || "TextDialog";
        }
    },
    data() {
        return {
            tabs: [
                { component: "TextDialog", name: "文本弹窗", order: "1", class: "TextDialog" },
                { component: "ImageDialog", name: "图片弹窗", order: "2", class: "ImageDialog" },
                {
                    component: this.engType ? "AudioEngDialog" : "AudioDialog",
                    name: "音频弹窗",
                    order: "3",
                    class: this.engType ? "AudioEngDialog" : "AudioDialog"
                },
                { component: "VideoDialog", name: "视频弹窗", order: "4", class: "VideoDialog" }
                // { component: RichTextBox, name: "富文本", order: "5", class: "RichTextBox" }
            ]
        };
    }
};
</script>
