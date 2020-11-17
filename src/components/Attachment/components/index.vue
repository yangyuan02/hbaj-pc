<template>
    <main class="attchment_dialog">
        <el-tabs v-model="defaultTabName" class="tag-container">
            <el-tab-pane
                :label="tag.name"
                :key="tag.order"
                :name="tag.order"
                v-for="tag in Tabs"
                :class="tag.class"
            >
                <component
                    :is="tag.component"
                    ref="tabChild"
                    v-if="defaultTabName === tag.order"
                    :hotspotId="hotspotId"
                    :engType="engType"
                />
            </el-tab-pane>
        </el-tabs>
        <div class="operate">
            <el-button type="danger" @click="deleteItem" v-if="!isDelAndEdit">删除</el-button>
            <el-button type="primary" @click="addDialog" v-if="isDelAndEdit" :disabled="disabled"
                >添加</el-button
            >
            <el-button type="primary" @click="editDialog" v-if="!isDelAndEdit">修改</el-button>
        </div>
        <AddDialog
            :hotspotId="hotspotId"
            :id="id"
            :title="title"
            :content="content"
            :extra="extra"
            :onSuccess="onSuccess"
            :currentTabOrder="defaultTabName"
            :engType="engType"
        />
    </main>
</template>

<script>
import ImagesList from "./ImagesList";
import TextList from "./TextList";
import AudioList from "./AudioList";
import Video from "./Video";
import RichTextBox from "./RichTextBox";
import AddDialog from "./AddDialog";
import Bus from "@/components/bus/index.js";
export default {
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        },
        orderList: {
            type: Array,
            default: () => ["文本", "图片", "音频", "视频", "文章"]
        },
        engType: {
            // 是否是专业英语
            type: Boolean,
            default: false
        }
    },
    components: {
        AddDialog
    },
    data() {
        return {
            defaultTabName: "1",
            id: "", // 某一条的id
            title: "", // 标题
            content: "", // 内容
            extra: "", // 链接
            tabs: [
                { component: TextList, name: "文本", order: "1", class: "TextList" },
                { component: ImagesList, name: "图片", order: "2", class: "ImagesList" },
                { component: AudioList, name: "音频", order: "3", class: "Audio" },
                { component: Video, name: "视频", order: "4", class: "Video" },
                { component: RichTextBox, name: "文章", order: "5", class: "RichTextBox" }
            ]
        };
    },
    computed: {
        Tabs() {
            // 计算tabs顺序
            const tabs = [];
            this.orderList.forEach(item => {
                this.tabs.forEach(k => {
                    if (item === k.name) {
                        tabs.push(k);
                    }
                });
            });
            return tabs;
        },
        buttonText() {
            return "添加";
        },
        isDelAndEdit() {
            return this.$store.state.attachmentStore.isDelAndEdit;
        },
        disabled() {
            console.log(this.defaultTabName);
            if (this.defaultTabName !== "3") {
                return false;
            }
            return this.$store.state.attachmentStore.disabled;
        }
    },
    watch: {
        Tabs: {
            handler(val) {
                if (val) {
                    this.defaultTabName = val[0].order;
                }
            },
            immediate: true
        }
    },
    methods: {
        onSuccess() {
            // 确定之后的回调
            this.$refs.tabChild[0].getList();
        },
        addDialog() {
            this.id = "";
            if (this.defaultTabName === "5") {
                // 富文本修改特殊处理
                return this.$refs.tabChild[0].addRich();
            }
            this.$store.commit("SETATTDIALOG", true);
        },
        editDialog(data) {
            let editData = data;
            if (this.defaultTabName === "4") {
                // 音频修改特殊处理
                editData = this.$refs.tabChild[0].info;
            }
            if (this.defaultTabName === "5") {
                // 富文本修改特殊处理
                return this.$refs.tabChild[0].editRich();
            }
            const { title, content, id, extra } = editData;
            this.id = id;
            this.title = title;
            this.content = content;
            this.extra = extra;

            this.$store.commit("SETATTDIALOG", true);
        },
        deleteItem() {
            this.$refs.tabChild[0].del();
        },
        initBus() {
            Bus.$on("update-item", data => {
                this.editDialog(data);
            });
        }
    },
    mounted() {
        this.initBus();
    }
};
</script>

<style lang="less" scoped>
.attchment_dialog {
    position: relative;

    /deep/ .el-tabs__content {
        max-height: 500px;
        height: 500px;
        overflow-y: scroll;
        .RichTextBox {
            height: calc(100% - 40px) !important;
        }
    }
    .operate {
        position: absolute;
        right: 0;
        top: 0;
    }
    .attach_model {
        .el-dialog__body {
            padding-top: 0px;
        }
    }
}
</style>
