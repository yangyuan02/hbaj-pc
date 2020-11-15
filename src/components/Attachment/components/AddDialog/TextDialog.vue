<template>
    <el-dialog
        title="文本信息"
        :visible="isOpenDialog"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="580px"
        append-to-body
        class="addTextdialog"
        top="0vh"
    >
        <el-form ref="form" :model="params" :rules="rules" label-width="80px" label-position="left">
            <el-form-item label="标题" prop="title">
                <el-input v-model="params.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content" class="add_text_textarea">
                <el-input
                    type="textarea"
                    :rows="12"
                    placeholder="请输入内容"
                    v-model="params.content"
                >
                </el-input>
            </el-form-item>
        </el-form>
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
                title: "" // 标题
            },
            loading: {
                save: false
            },
            rules: {
                content: [{ required: true, message: "请输入内容", trigger: "blur" }],
                title: [{ required: true, message: "请输入标题", trigger: "blur" }]
            },
            type: ""
        };
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
    computed: {
        isOpenDialog() {
            return this.$store.state.attachmentStore.isOpenDialog;
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
                    this.id ? this.editText() : this.addText();
                }
            });

            console.log("保存");
        },
        addText() {
            // 新增文本内容
            this.params.type = "TEXT";
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
                    this.onSuccess && this.onSuccess();
                }
            });
        },
        editText() {
            // 修改文本
            this.params.type = "TEXT";
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
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        }
    }
};
</script>

<style lang="less">
.addTextdialog {
    .el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .el-dialog__body {
        height: 370px;
        .add_text_textarea {
            .el-form-item__content {
                .el-textarea {
                    textarea {
                        resize: none;
                    }
                }
            }
        }
    }
}
</style>
