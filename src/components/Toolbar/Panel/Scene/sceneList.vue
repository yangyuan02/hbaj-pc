<template>
    <div class="scene_list" v-if="isOpenScene">
        <div class="attachment common">
            <div class="title">
                <span>场景热点列表</span>
                <i class="iconfont icontubiaoweb-24" @click="addAttachment"></i>
            </div>
            <div class="attachment_list">
                <div class="header">
                    <span>链接内容</span>
                    <span>场景名称</span>
                    <span>操作</span>
                </div>
                <div class="body">
                    <div class="item" v-for="(item, index) in list" :key="index">
                        <div class="link" @click="editAttachment(item)">
                            <i class="iconfont icontubiaoweb-29"></i>
                        </div>
                        <div class="link_name ellipsis" @click="editOpenEditAttachmentName(item)">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="item.title"
                                placement="top-start"
                            >
                                <span>{{ item.title }}</span>
                            </el-tooltip>
                        </div>
                        <div class="operate">
                            <i
                                class="iconfont icontubiaoweb-21"
                                @click="handleDel(item, index)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-22"
                                @click="up(attachmentList, index)"
                            ></i>
                            <i
                                class="iconfont icontubiaoweb-23"
                                @click="down(attachmentList, index)"
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        isOpenScene: function() {
            // 打开的时候应该还需要一点动画
            return this.$store.state.toolbarStore.openScene;
        },
        list: function() {
            return this.$store.state.toolbarStore.sceneList;
        }
    }
};
</script>

<style lang="less">
.scene_list {
    position: absolute;
    width: 296px;
    height: 100%;
    right: 306px;
    top: 0px;
    background: #fff;
    padding: 0 24px;
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
                            width: 70px;
                            text-align: left;
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
}
</style>
