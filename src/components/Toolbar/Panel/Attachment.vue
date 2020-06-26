<template>
    <el-drawer
        title="我是标题"
        :visible.sync="drawerAttachment"
        :with-header="false"
        :size="296"
        :before-close="handleClose"
    >
        <div class="panel_sidebar">
            <div class="attachment common">
                <div class="title">
                    <span>项目附件</span>
                    <i class="iconfont icontubiaoweb-24" @click="addAttachment"></i>
                </div>
                <div class="attachment_list">
                    <div class="header">
                        <span>链接内容</span>
                        <span>附件名称</span>
                        <span>操作</span>
                    </div>
                    <div class="body">
                        <div class="item" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
                            <div class="link">
                                <i class="iconfont icontubiaoweb-29"></i>
                            </div>
                            <div class="link_name">
                                <span class="ellipsis">附件名称</span>
                            </div>
                            <div class="operate">
                                <i class="iconfont icontubiaoweb-21" @click="handleDel"></i>
                                <i class="iconfont icontubiaoweb-22"></i>
                                <i class="iconfont icontubiaoweb-23"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 富文本编辑器 -->
            <RichTextBoxDialog :visible.sync="shows.isOpenRichTextBoxDialog"></RichTextBoxDialog>
            <!-- 音频资源 -->
            <AudioDialog :visible.sync="shows.isOpenAudioDialog"></AudioDialog>
            <!-- 视频资源 -->
            <VideoDialog :visible.sync="shows.isOpenVideoDialog"></VideoDialog>

            <AttachmentComponent :visible.sync="shows.isOpenAttachment"></AttachmentComponent>
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from "vuex";

import RichTextBoxDialog from "../Dialog/RichTextBoxDialog";
import AudioDialog from "../Dialog/AudioDialog";
import VideoDialog from "../Dialog/VideoDialog";

import AttachmentComponent from "../Dialog";

export default {
    name: "Attachment",
    data() {
        return {
            shows: {
                isOpenRichTextBoxDialog: false, // 富文本弹窗
                isOpenAudioDialog: false, // 音频资源
                isOpenVideoDialog: false, // 视频资源
                isOpenAttachment: false // 附件弹窗
            }
        };
    },
    components: {
        RichTextBoxDialog,
        AudioDialog,
        VideoDialog,
        AttachmentComponent
    },
    computed: {
        ...mapState({
            drawerAttachment: state => state.toolbarStore.drawerAttachment
        })
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerAttachment");
        },
        handleDel() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        addAttachment() {
            this.shows.isOpenAttachment = true;
        }
    }
};
</script>

<style lang="less">
.attachment {
    .title {
        height: 88px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 24px;
        }
        i {
            font-size: 24px;
            color: rgba(15, 79, 168, 1);
        }
    }
    .attachment_list {
        .header {
            display: flex;
            justify-content: space-between;
            height: 32px;
            align-items: center;
            background: rgba(248, 248, 248, 1);
            span {
                width: 33%;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 19px;
                text-align: center;
            }
        }
        .body {
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 42px;
                border-bottom: 1px solid #eee;
                & > div {
                    width: 33%;
                    text-align: center;
                    &.link_name {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        color: rgba(102, 102, 102, 1);
                        line-height: 19px;
                    }
                    &.operate {
                        display: flex;
                        justify-content: space-around;
                    }
                    i {
                        font-size: 16px;
                        color: rgba(15, 79, 168, 1);
                    }
                }
            }
        }
    }
}
</style>
