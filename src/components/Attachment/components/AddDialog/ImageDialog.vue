<template>
    <el-dialog
        title="图片信息"
        :visible="isOpenDialog"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="580px"
        append-to-body
        class="addImagedialog"
        top="0vh"
    >
        <main>
            <el-form
                ref="form"
                :model="params"
                label-width="80px"
                :rules="rules"
                label-position="left"
            >
                <el-form-item label="上传图片" prop="extra">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="params.extra"
                            :src="globalConfig.imagePath + params.extra"
                            class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题" prop="title" class="title">
                    <el-input v-model="params.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" class="mark" prop="content">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="params.content"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </main>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { hotspotContentDetail, hotspotContent } from "@/model/api";

export default {
    data() {
        return {
            params: {
                // 参数
                content: "", // 内容
                extra: "", // 附件url
                title: "" // 标题
            },
            loading: {
                save: false
            },
            rules: {
                content: [{ required: true, message: "请输入内容", trigger: "blur" }],
                title: [{ required: true, message: "请输入标题", trigger: "blur" }],
                extra: [{ required: true, message: "请上传图片" }]
            },
            type: ""
        };
    },
    computed: {
        uploadUrl() {
            const projectId = this.$route.params.projectId;
            const url = `/api/file/upload?fileName=default&relatedId=${projectId}&fileType=HOTSPOT_IMAGE`;
            return url;
        },
        isOpenDialog() {
            return this.$store.state.attachmentStore.isOpenDialog;
        }
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
            }
        },
        clear() {
            this.params.content = "";
            this.params.title = "";
            this.params.extra = "";
        },
        close() {
            this.$store.commit("SETATTDIALOG", false);
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.id ? this.editImages() : this.addImages();
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.params.extra = res.data.path;
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error("上传头像图片只能是 JPG 格式!");
            // }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        addImages() {
            // 新增图片内容
            this.params.type = "IMAGE";
            this.params.hotspotId = this.hotspotId;
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
                    this.close();
                    this.$refs["form"].resetFields();
                    this.params.extra = "";
                    this.onSuccess && this.onSuccess();
                }
            });
        },
        editImages() {
            // 修改文本
            this.params.type = "IMAGE";
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
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        }
    }
};
</script>

<style lang="less">
.addImagedialog {
    .el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .el-dialog__body {
        height: 370px;
        .title {
            margin-bottom: 0px;
        }
        .mark {
            display: flex;
            .el-form-item__content {
                margin-left: 0 !important;
                margin-top: 20px;
                flex: 1;
                textarea {
                    resize: none;
                }
            }
        }
    }
}
</style>
