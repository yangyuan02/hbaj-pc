<template>
    <el-dialog
        title="音频文件"
        :visible.sync="visible"
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
                <el-form-item label="上传" prop="extra">
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
                </el-form-item>
                <el-form-item label="描述" prop="content" class="title">
                    <el-input
                        type="textarea"
                        :rows="9"
                        placeholder="请输入描述"
                        v-model="params.content"
                        disabled
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
    </el-dialog>
</template>

<script>
import { hotspotContentDetail, hotspotContent } from "@/model/api";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            // 音频资源标题
            default: "",
            type: String
        },
        id: {
            type: [String, Number],
            default: ""
        },
        onSuccess: {
            type: Function,
            default: () => {}
        },
        editData: {
            type: Object,
            default: {}
        },
        editType: {
            // 编辑类型
            type: String,
            default: ""
        }
    },
    watch: {
        id(newVal) {
            this.params.hotspotId = newVal;
        },
        editData(newVal) {
            this.$nextTick(() => {
                this.params = { ...newVal };
                this.fileList = [
                    {
                        name: "音频内容",
                        url: newVal.extra
                    }
                ];
            });
        },
        editType(newVal) {
            this.type = newVal;
        }
    },
    computed: {
        uploadUrl() {
            const projectId = this.$route.params.projectId;
            const url = `/api/file/upload?fileName=default&relatedId=${projectId}&fileType=HOTSPOT_AUDIO`;
            return url;
        }
    },
    data() {
        return {
            params: {
                // 参数
                content: "", // 内容
                extra: "", // 附件url
                hotspotId: 0, // 附件id
                // id: 0,
                // seq: 0, // 排序
                title: "", // 标题
                type: "AUDIO" // 类型
            },
            rules: {
                title: [{ required: true, message: "请输入标题", trigger: "blur" }],
                extra: [{ required: true, message: "请上传音频" }],
                content: [{ required: true, message: "请输入内容", trigger: "blur" }]
            },
            fileList: [
                // {
                //     name: "food.jpeg",
                //     url:
                //         "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                // }
            ],
            loading: {
                save: false,
                detail: false
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
                    this.type && this.type === "audio" ? this.editAudio() : this.addAudio();
                }
            });
            console.log("保存");
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            this.params.extra = res.data.path;
        },
        editAudio() {
            // 修改
            hotspotContent(
                {
                    type: "post",
                    data: this.params
                },
                this.params.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.onSuccess && this.onSuccess(this.params.extra);
                    this.close();
                }
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
    }
}
</style>
