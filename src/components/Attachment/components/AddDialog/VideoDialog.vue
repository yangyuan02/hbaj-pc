<template>
    <el-dialog
        title="视频文件"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="580px"
        append-to-body
        class="addVideodialog"
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
                        <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="标题" prop="title" class="title">
                    <el-input
                        type="text"
                        placeholder="标题"
                        v-model="params.title"
                        style="margin-left: 0px;"
                    >
                    </el-input>
                </el-form-item>

                <el-form-item label="描述" prop="content" class="title">
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
                        name: "视频内容",
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
            const url = `/api/file/upload?fileName=default&relatedId=${projectId}&fileType=HOTSPOT_VIDEO`;
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
                type: "VIDEO" // 类型
            },
            rules: {
                title: [{ required: true, message: "请输入标题", trigger: "blur" }],
                content: [{ required: true, message: "请输入内容", trigger: "blur" }],
                extra: [{ required: true, message: "请上传视频" }]
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
            if (!this.params.id) {
                this.$nextTick(() => {
                    this.$refs["form"].resetFields();
                });
            }
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
        addAudio() {
            // 新增音频内容'
            this.params.type = "VIDEO";
            this.params.hotspotId = this.id;
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
            this.params.type = "VIDEO";
            hotspotContent(
                {
                    type: "post",
                    data: this.params
                },
                this.params.id
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
        }
    }
};
</script>

<style scoped lang="scss">
.addVideodialog {
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
