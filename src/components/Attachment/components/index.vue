<template>
    <el-tabs v-model="defaultTabName" class="tag-container">
        <el-tab-pane :label="tag.name" :key="tag.order" :name="tag.order" v-for="tag in Tabs" :class="tag.class">
            <component :is="tag.component" ref="tab-child" v-if="defaultTabName === tag.order" :hotspotId="hotspotId" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import ImagesList from "./ImagesList";
import TextList from "./TextList";
import AudioList from "./AudioList";
import Video from "./Video";
import RichTextBox from "./RichTextBox";
export default {
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        },
        orderList: {
            type: Array,
            default: () => ["文本", "图片", "音频", "视频", "富文本"]
        }
    },
    data() {
        return {
            defaultTabName: "1",
            tabs: [
                { component: TextList, name: "文本", order: "1", class: "TextList" },
                { component: ImagesList, name: "图片", order: "2", class: "ImagesList" },
                { component: AudioList, name: "音频", order: "3", class: "Audio" },
                { component: Video, name: "视频", order: "4", class: "Video" },
                { component: RichTextBox, name: "富文本", order: "5", class: "RichTextBox" }
            ]
        };
    },
    computed: {
        Tabs() {
            // 计算tabs顺序
            const tabs = [];
            this.orderList.forEach(item => {
                this.tabs.forEach(k => {
                    if (item === k.name) {
                        tabs.push(k);
                    }
                });
            });
            this.defaultTabName = tabs[0].order;
            return tabs;
        }
    }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__content {
    max-height: 500px;
    height: 500px;
    overflow-y: scroll;
    .RichTextBox {
        height: calc(100% - 40px) !important;
    }
}
</style>
