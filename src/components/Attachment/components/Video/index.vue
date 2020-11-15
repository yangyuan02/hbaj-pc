<template>
    <div class="video-contant" v-loading="loading">
        <template v-if="info.title">
            <div class="title">
                <p>{{ info.title || "此内容为空" }}</p>
            </div>
            <div class="video" style="">
                <video
                    id="videoPlayer"
                    :src="globalConfig.imagePath + info.extra"
                    ref="video"
                    controls="controls"
                ></video>
            </div>

            <div class="desc">
                <p>{{ info.content }}</p>
            </div>
        </template>
        <Empty v-else />
    </div>
</template>

<script>
import { hotspotContent } from "@/model/api";
import Empty from "@/components/Empty";

export default {
    components: {
        Empty
    },
    data() {
        return {
            loading: false,
            info: {
                title: "",
                extra: "",
                content: ""
            }
        };
    },
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
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
                        type: "VIDEO",
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
                        this.$store.commit("SETDELANDEDIT", false);
                    } else {
                        this.info.title = "";
                        this.info.extra = "";
                        this.info.content = "";
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
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.video-contant {
    .title {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        font-size: 16px;
        padding-left: 14px;
    }
    .video {
        margin: 10px 0px;
        video {
            height: 300px;
        }
    }
}
</style>
