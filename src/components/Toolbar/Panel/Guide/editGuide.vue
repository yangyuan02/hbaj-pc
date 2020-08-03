<template>
    <el-dialog
        title="修改附件名称"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="30%"
        append-to-body
    >
        <div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="附件名称">
                    <el-input v-model="form.title"></el-input>
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
import { hotspotDetail } from "@/model/api";
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        },
        onSuccess: {
            type: Function,
            default: () => {}
        }
    },
    watch: {
        data(newVal) {
            this.form.id = newVal.id;
            this.form.title = newVal.title;
            console.log(newVal);
        }
    },
    data() {
        return {
            form: {
                title: "", // 附件名称
                id: "" // id
            },
            rules: {
                title: [{ required: true, message: "请输入附件名称", trigger: "blur" }]
            },
            loading: {
                save: false
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
            this.editAttachment();
        },
        editAttachment() {
            const { title, id } = this.form;
            hotspotDetail(
                {
                    type: "put",
                    data: {
                        title
                    }
                },
                id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        }
    }
};
</script>

<style scoped lang="scss"></style>
