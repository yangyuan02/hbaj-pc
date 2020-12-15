<template>
    <div class="RichTextBox">
        <div class="title" style="margin-bottom:10px">
            <el-input
                type="text"
                placeholder="请输入标题"
                class="richTitle"
                v-model="info.title"
            ></el-input>
        </div>
        <RichTextBox ref="RichTextBox"></RichTextBox>
    </div>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";
import { hotspotContent, hotspotContentDetail } from "@/model/api";

export default {
    components: {
        RichTextBox
    },
    data() {
        return {
            loading: false,
            info: {
                title: "",
                content: ""
            }
        };
    },
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    watch: {
        // 切换的时候也需要更新
        hotspotId: function(val) {
            if (val) {
                this.getList();
            }
        }
    },
    methods: {
        getList() {
            this.loading = true;
            hotspotContent(
                {
                    type: "get",
                    data: {
                        hotspotId: this.hotspotId,
                        type: "HTML",
                        size: 1000,
                        page: 1
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    if (res.data.length) {
                        const { title, extra, content, id } = res.data[0];
                        this.info = { ...this.info, title, extra, content, id };
                        this.$refs.RichTextBox.setHtml(content);
                        this.$store.commit("SETDELANDEDIT", false);
                    } else {
                        this.info.title = "";
                        this.info.content = "";
                        this.$refs.RichTextBox.setHtml("");
                        this.$store.commit("SETDELANDEDIT", true);
                    }
                    this.loading = false;
                } else {
                    this.loading = false;
                }
            });
        },
        del() {
            const hotspotContentId = this.info.id;
            this.$confirm(`此操作将永久删 ${this.info.title}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    hotspotContent({ type: "delete" }, hotspotContentId).then(res => {
                        if (res.suceeded) {
                            this.$message.success("操作成功");
                            this.getList();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        editRich() {
            // 修改文本
            const RichTextBox = this.$refs.RichTextBox;
            const getHtml = RichTextBox.getHtml();
            const params = {
                // 参数
                content: getHtml, // 内容
                title: this.info.title, // 标题
                type: "HTML", // 类型
                hotspotId: this.hotspotId
            };
            const hotspotContentList = [params];
            hotspotContent(
                {
                    type: "post",
                    data: { hotspotContentList }
                },
                this.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                }
            });
        },
        addRich() {
            // 修改文本
            const RichTextBox = this.$refs.RichTextBox;
            const getHtml = RichTextBox.getHtml();
            const params = {
                // 参数
                content: getHtml, // 内容
                title: this.info.title, // 标题
                type: "HTML", // 类型
                hotspotId: this.hotspotId
            };
            const hotspotContentList = [params];
            hotspotContentDetail({
                type: "post",
                data: { hotspotContentList }
            }).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                }
            });
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="less" scoped>
/deep/ .RichTextBox {
    .title {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        font-size: 16px;
        padding-left: 14px;
        .richTitle {
            input {
                margin-bottom: 10px;
                border: none !important;
                border-bottom: 1px solid #ccc !important;
                border-radius: 0 !important;
            }
        }
    }
}
</style>
