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
        <!-- 简介面板 -->
        <IntroPanel></IntroPanel>
        <!-- 课件参与人员 -->
        <PersonPanel></PersonPanel>
        <!-- 附件 -->
        <AttachmentPanel></AttachmentPanel>
    </div>
</template>

<script>
// 左侧面板
import IntroPanel from "../Toolbar/Panel/Intro";
import PersonPanel from "../Toolbar/Panel/Person";
import AttachmentPanel from "../Toolbar/Panel/Attachment";
export default {
    data() {
        return {
            toolbarList: [
                {
                    text: "简介",
                    icon: "icontubiaoweb-12",
                    type: "drawerIntro"
                },
                {
                    text: "制作人员",
                    icon: "icontubiaoweb-13",
                    type: "drawerPerson"
                },
                {
                    text: "附件参考",
                    icon: "icontubiaoweb-14",
                    type: "drawerAttachment"
                },
                {
                    text: "热点内容",
                    icon: "icontubiaoweb-15",
                    type: "drawerHotContent"
                },
                {
                    text: "引导内容",
                    icon: "icontubiaoweb-16",
                    type: "drawerGuideContent"
                },
                {
                    text: "课件评论",
                    icon: "icontubiaoweb-17",
                    type: "drawerComment"
                },
                {
                    text: "启动引导",
                    icon: "icontubiaoweb-18",
                    type: "drawerPlatGuide"
                },
                {
                    text: "内容摘要",
                    icon: "icontubiaoweb-19",
                    type: "drawerDigest"
                },
                {
                    text: "快速通道",
                    icon: "icontubiaoweb-20",
                    type: "drawerTrack"
                }
            ]
        };
    },
    components: {
        IntroPanel,
        PersonPanel,
        AttachmentPanel
    },
    methods: {
        toolbarHander(type) {
            if (type === "drawerAttachment") {
                this.$store.commit("TOGGLE_DRAWER", "drawerAttachment");
            }
            if (type === "drawerIntro") {
                this.$store.commit("TOGGLE_DRAWER", "drawerIntro");
            }
            if (type === "drawerPerson") {
                this.$store.commit("TOGGLE_DRAWER", "drawerPerson");
            }
            // if (type === "drawerPerson") {
            //     this.$store.commit("TOGGLE_DRAWER", "drawerPerson");
            // }
        }
    }
};
</script>

<style lang="less">
#toolbar {
    width: 46px;
    height: 100%;
    background: rgba(54, 64, 68, 1);
    padding-top: 30px;
    .item-toolbar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        i {
            font-size: 20px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
