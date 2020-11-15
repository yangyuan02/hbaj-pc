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
                />
            </el-tab-pane>
        </el-tabs>
        <div class="operate">
            <el-button type="danger" @click="deleteItem()" v-if="isDelete">删除</el-button>
            <el-button type="primary" @click="addDialog">添加</el-button>
            <el-button type="primary" @click="editDialog">修改</el-button>
        </div>
        <AddDialog
            :hotspotId="hotspotId"
            :id="id"
            :onSuccess="onSuccess"
            :currentTabOrder="defaultTabName"
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
export default {
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        },
        orderList: {
            type: Array,
            default: () => ["文本", "图片", "音频", "视频", "富文本"]
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
            tabs: [
                { component: TextList, name: "文本", order: "1", class: "TextList" },
                { component: ImagesList, name: "图片", order: "2", class: "ImagesList" },
                { component: AudioList, name: "音频", order: "3", class: "Audio" },
                { component: Video, name: "视频", order: "4", class: "Video" },
                { component: RichTextBox, name: "富文本", order: "5", class: "RichTextBox" }
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
            this.defaultTabName = tabs[0].order;
            return tabs;
        },
        buttonText() {
            return "添加";
        },
        isDelete() {
            return true;
        }
    },
    methods: {
        onSuccess() {
            // 确定之后的回调
            this.$refs.tabChild[0].getList();
        },
        addDialog() {
            this.$store.commit("SETATTDIALOG", true);
        },
        editDialog() {
            console.log("编辑");
        }
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
