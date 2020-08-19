<template>
    <el-dialog
        title="添加解说内容"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="680px"
        append-to-body
        class="addGuidedialog"
        top="0vh"
    >
        <main>
            <div class="hostcontent">
                <div class="hostcontent_left">
                    <div class="info">
                        <div
                            class="action"
                            @click="isOpenAction = true"
                            :style="{
                                'background-image': `url(
                                    ${selectData.img1}
                                )`
                            }"
                        ></div>
                        <div class="digest">
                            <div class="title">
                                <span>简介</span>
                            </div>
                            <div class="text">
                                <p>文本附件这里是一段文本录入</p>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <el-input type="textarea" :rows="6" placeholder="内容"></el-input>
                    </div>
                </div>
                <div class="hostcontent_right">
                    <div class="hostcontent_audio">
                        <audio
                            id="audioPlayerGuide"
                            src="http://pano.vr2shipping.com/static/enterprise/null/hotspot/HOTSPOT_AUDIO_null_1595746249823_mydream.mp3"
                            controlsList="nodownload"
                            controls="controls"
                            ref="audio"
                        ></audio>
                    </div>
                    <div class="operator">
                        <i class="iconfont icontubiaoweb-24 cursor"></i>
                        <i class="iconfont icontubiaoweb-24 cursor"></i>
                    </div>
                </div>
            </div>
        </main>
        <SelectAction :visible.sync="isOpenAction" :onConfirm="onConfirm"></SelectAction>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import SelectAction from "./SelectAction.vue";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SelectAction
    },
    data() {
        return {
            isOpenAction: false,
            loading: {
                save: false,
                detail: false
            },
            selectData: {
                img1: "",
                img2: ""
            }
        };
    },
    methods: {
        open() {
            console.log("打开");
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.addAudio();
                }
            });
            console.log("保存");
        },
        onConfirm(data) {
            Object.assign(this.selectData, data);
            console.log(data);
        }
    }
};
</script>

<style scoped lang="less">
.addGuidedialog {
    /deep/.el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .hostcontent {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .hostcontent_left {
                width: 50%;
                // border-right: 1px solid rgba(245, 245, 245, 1);
                margin-right: 10px;
                .info {
                    display: flex;
                    .action {
                        width: 96px;
                        height: 96px;
                        background: rgba(216, 216, 216, 1) center center;
                        background-size: 100%;
                    }
                    .digest {
                        margin-left: 10px;
                    }
                }
                .content {
                    margin-top: 10px;
                    .el-textarea {
                        textarea {
                            resize: none;
                        }
                    }
                }
            }
            .hostcontent_right {
                // display: flex;
                // align-items: center;
            }
        }
        .el-dialog__body {
            height: 250px;
        }
    }
}
</style>
