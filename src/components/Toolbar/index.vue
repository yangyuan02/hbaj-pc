<template>
    <div id="toolbar">
        <div
            class="item-toolbar"
            v-for="(item, index) in toolbarList"
            :key="index"
            @click="toolbarHander(item.type)"
        >
            <el-tooltip class="item" effect="dark" :content="item.text" placement="left">
                <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
            </el-tooltip>
        </div>
        <!-- 富文本编辑器 -->
        <RichTextBoxDialog :visible.sync="shows.isOpenRichTextBoxDialog"></RichTextBoxDialog>
        <!-- 音频资源 -->
        <AudioDialog :visible.sync="shows.isOpenAudioDialog"></AudioDialog>
    </div>
</template>

<script>
import RichTextBoxDialog from "./Dialog/RichTextBoxDialog";
import AudioDialog from "./Dialog/AudioDialog";
export default {
    data() {
        return {
            toolbarList: [
                {
                    text: "简介",
                    icon: "icontubiaoweb-12",
                    type: ""
                },
                {
                    text: "制作人员",
                    icon: "icontubiaoweb-13",
                    type: ""
                },
                {
                    text: "附件参考",
                    icon: "icontubiaoweb-14",
                    type: "attachment"
                },
                {
                    text: "热点内容",
                    icon: "icontubiaoweb-15",
                    type: ""
                },
                {
                    text: "引导内容",
                    icon: "icontubiaoweb-16",
                    type: ""
                },
                {
                    text: "课件评论",
                    icon: "icontubiaoweb-17",
                    type: ""
                },
                {
                    text: "启动引导",
                    icon: "icontubiaoweb-18",
                    type: ""
                },
                {
                    text: "内容摘要",
                    icon: "icontubiaoweb-19",
                    type: ""
                },
                {
                    text: "快速通道",
                    icon: "icontubiaoweb-20",
                    type: ""
                }
            ],
            shows: {
                isOpenRichTextBoxDialog: false, // 富文本弹窗
                isOpenAudioDialog: false // 音频资源
            }
        };
    },
    components: {
        RichTextBoxDialog,
        AudioDialog
    },
    methods: {
        toolbarHander(type) {
            if (type === "attachment") {
                this.shows.isOpenRichTextBoxDialog = true;
            }
        }
    }
};
</script>

<style lang="less">
#toolbar {
    width: 72px;
    height: 100%;
    background: rgba(54, 64, 68, 1);
    padding-top: 60px;
    .item-toolbar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        i {
            font-size: 26px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
