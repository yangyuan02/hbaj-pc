<template>
    <el-dialog
        title="音频文件"
        :visible="isOpenDialog"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="580px"
        append-to-body
        class="addAudiodialog"
        top="0vh"
    >
        <div v-loading="loading.detail">
            <el-form
                ref="form"
                :model="params"
                label-width="80px"
                :rules="rules"
                label-position="left"
            >
                <el-form-item label="上传" prop="extra" class="extra">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-success="handleAvatarSuccess"
                        :limit="1"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>

                        <div slot="tip" class="el-upload__tip">只能上传音频文件</div>
                    </el-upload>
                    <el-button size="small" type="primary" @click="audition" class="audition"
                        >试听</el-button
                    >
                </el-form-item>
                <el-form-item label="标题" prop="title" class="title">
                    <el-input
                        type="text"
                        placeholder="请输入例句"
                        v-model="params.title"
                        style="margin-left: 0px;"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="content" class="content inputNoResize">
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入描述"
                        v-model="params.content"
                        style="margin-left: 0px;"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>

        <Audition
            :visible.sync="shows.isOpenAudition"
            :src="textTransform"
            :onConfirmAudio="onConfirmAudio"
        ></Audition>
    </el-dialog>
</template>

<script>
import { hotspotContentDetail, hotspotContent, youdao } from "@/model/api";
import Audition from "./audition";

export default {
    components: {
        Audition
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        id: {
            type: [String, Number],
            default: ""
        },
        hotspotId: {
            type: [String, Number]
        },
        onSuccess: {
            type: Function,
            default: () => {}
        },
        title: {
            type: [String]
        },
        content: {
            type: [String]
        },
        extra: {
            type: [String]
        }
    },
    watch: {
        hotspotId(value) {
            if (value) {
                this.setOpen();
            }
        },
        id(value) {
            if (value) {
                this.setOpen();
            }
        }
    },
    computed: {
        uploadUrl() {
            const projectId = this.$route.params.projectId;
            const url = `/api/file/upload?fileName=default&relatedId=${projectId}&fileType=HOTSPOT_AUDIO`;
            return url;
        },
        isOpenDialog() {
            return this.$store.state.attachmentStore.isOpenDialog;
        }
    },
    data() {
        return {
            textTransform: "",
            shows: {
                isOpenAudition: false
            },
            params: {
                // 参数
                content: "", // 内容
                extra: "", // 附件url
                title: "" // 标题
            },
            rules: {
                title: [{ required: true, message: "请输入标题", trigger: "blur" }],
                content: [{ required: true, message: "请输入内容", trigger: "blur" }],
                extra: [{ required: true, message: "请上传音频" }]
            },
            fileList: [],
            loading: {
                save: false,
                detail: false
            }
        };
    },
    methods: {
        open() {
            this.setOpen();
        },
        setOpen() {
            if (!this.id) {
                this.$nextTick(() => {
                    this.$refs["form"].resetFields();
                    this.clear();
                });
            } else {
                this.setContent();
            }
        },
        // 编辑填充内容
        setContent() {
            if (this.id) {
                this.params.content = this.content;
                this.params.title = this.title;
                this.params.extra = this.extra;
                this.fileList = [
                    {
                        name: "音频内容",
                        url: this.params.extra
                    }
                ];
            }
        },
        clear() {
            this.params.content = "";
            this.params.title = "";
            this.params.extra = "";
            this.fileList = [];
        },
        close() {
            this.$store.commit("SETATTDIALOG", false);
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.id ? this.editAudio() : this.addAudio();
                }
            });
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            this.params.extra = res.data.path;
        },
        onConfirmAudio(val) {
            this.params.extra = val;
            this.fileList = [
                {
                    name: "音频内容",
                    url: val
                }
            ];
        },
        addAudio() {
            // 新增音频内容
            this.params.hotspotId = this.hotspotId;
            this.params.type = "AUDIO";
            const hotspotContentList = [this.params];
            const params = {
                hotspotContentList
            };
            hotspotContentDetail({
                type: "post",
                data: params
            }).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.$refs["form"].resetFields();
                    this.params.extra = "";
                    this.fileList = [];
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        },
        editAudio() {
            // 修改
            this.params.type = "AUDIO";
            this.params.hotspotId = this.hotspotId;
            hotspotContent(
                {
                    type: "post",
                    data: this.params
                },
                this.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.$refs["form"].resetFields();
                    this.params.extra = "";
                    this.fileList = [];
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        },
        audition() {
            if (!this.params.content) {
                return this.$message.error("请输入文字");
            }
            youdao(
                {
                    type: "post"
                },
                `?text=${this.params.content}&langType=en`
            ).then(res => {
                this.textTransform = res.data;
                this.shows.isOpenAudition = true;
                console.log("生成成功", res);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.addAudiodialog {
    /deep/ .el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .title {
            textarea {
                resize: none;
            }
        }
    }
    /deep/.el-dialog__body {
        height: 370px;
        .extra {
            position: relative;
            .audition {
                position: absolute;
                top: 5px;
                left: 100px;
            }
        }
    }
}
</style>
