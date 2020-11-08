<template>
    <div class="RichTextBox">
        <div class="title">
            <p>{{ info.title || "此内容为空" }}</p>
        </div>
        <RichTextBox ref="RichTextBox"></RichTextBox>
    </div>
</template>

<script>
import RichTextBox from "@/components/common/RichTextBox";
import { hotspotContent } from "@/model/api";

export default {
    components: {
        RichTextBox
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
                        type: "HTML",
                        size: 1000,
                        page: 1
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    if (res.data.length) {
                        const { title, extra, content } = res.data[0];
                        this.info = { ...this.info, title, extra, content };
                        this.$refs.RichTextBox.setHtml(content);
                    } else {
                        this.info.title = "";
                        this.info.extra = "";
                        this.info.content = "";
                        this.$refs.RichTextBox.setHtml("");
                    }
                    this.loading = false;
                } else {
                    this.loading = false;
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
.RichTextBox {
    .title {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        font-size: 16px;
        padding-left: 14px;
    }
}
</style>
