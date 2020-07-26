<template>
    <el-dialog
        title="图片信息"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="30%"
        append-to-body
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
                        <img v-if="params.extra" :src="params.extra" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="params.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" class="mark" prop="content">
                    <el-input
                        type="textarea"
                        :rows="2"
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
import { hotspotContentDetail } from "@/model/api";

export default {
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
                type: "IMAGE" // 类型
            },
            loading: {
                save: false
            },
            rules: {
                content: [{ required: true, message: "请输入内容", trigger: "blur" }],
                title: [{ required: true, message: "请输入标题", trigger: "blur" }],
                extra: [{ required: true, message: "请上传图片" }]
            }
        };
    },
    computed: {
        uploadUrl() {
            const url = `/api/file/upload?fileName=${this.params.title}&fileType=HOTSPOT_IMAGE`;
            return url;
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
        onSuccess: {
            type: Function,
            default: () => {}
        }
    },
    watch: {
        id(newVal) {
            this.params.hotspotId = newVal;
        }
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
                    this.addImages();
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.params.extra = globalConfig.imagePath + res.data.path;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        addImages() {
            // 新增图片内容
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
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        }
    }
};
</script>

<style lang="less">
.mark {
    display: flex;
    .el-form-item__content {
        margin-left: 0 !important;
        margin-top: 20px;
        flex: 1;
    }
}
</style>
