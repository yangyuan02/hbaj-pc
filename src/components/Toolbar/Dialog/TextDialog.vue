<template>
    <el-dialog
        title="文本信息"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="30%"
        append-to-body
    >
        <el-form ref="form" :model="params" :rules="rules" label-width="80px" label-position="left">
            <el-form-item label="标题" prop="title">
                <el-input v-model="params.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input
                    type="textarea"
                    :rows="2"
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
import { hotspotContentDetail } from "@/model/api";

export default {
    data() {
        return {
            params: {
                // 参数
                content: "", // 内容
                // extra: "string", // 附件url
                hotspotId: 0, // 附件id
                // id: 0,
                // seq: 0, // 排序
                title: "", // 标题
                type: "TEXT" // 类型
            },
            loading: {
                save: false
            },
            rules: {
                content: [{ required: true, message: "请输入内容", trigger: "blur" }],
                title: [{ required: true, message: "请输入标题", trigger: "blur" }]
            }
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
                    this.addText();
                }
            });

            console.log("保存");
        },
        addText() {
            // 新增文本内容
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

<style lang="less"></style>
