<template>
    <el-dialog
        title="排序"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="580px"
        append-to-body
        class="addSortdialog"
        top="0vh"
    >
        <div class="sort-content">
            <div class="item" v-for="(item, index) in sortList" :key="index">
                <div class="name">
                    <p class="ellipsis">{{ item.title }}</p>
                </div>
                <div class="operate">
                    <i class="cursor" @click="handleUp(index)" v-if="index !== 0">上移</i>
                    <i class="cursor" @click="handleDown(index)" v-if="index !== list.length - 1"
                        >下移</i
                    >
                </div>
            </div>
        </div>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" :loading="loading.save" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { hotspotContent } from "@/model/api";
import draggable from "vuedraggable";
export default {
    data() {
        return {
            loading: {
                save: false
            },
            sortList: []
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        hotspotId: {
            type: [String, Number]
        },
        onSuccess: {
            type: Function,
            default: () => {}
        },
        list: {
            type: Array,
            default: []
        }
    },
    methods: {
        open() {
            const cloneSortList = JSON.stringify(this.list);
            this.sortList = JSON.parse(cloneSortList);
        },
        close() {
            this.$emit("update:visible", false);
        },
        changeSort(index, type) {
            this.sortList.splice(
                type ? index : index - 1,
                1,
                ...this.sortList.splice(
                    type ? index + 1 : index,
                    1,
                    this.sortList[type ? index : index - 1]
                )
            );
        },
        // 上移
        handleUp(index) {
            this.changeSort(index, 0);
        },
        // 下移
        handleDown(index) {
            this.changeSort(index, 1);
        },
        save() {
            const hotspotContentIds = this.sortList.map(item => item.id);
            const data = {
                hotspotContentIds,
                hotspotId: this.hotspotId
            };
            hotspotContent(
                {
                    type: "post",
                    data
                },
                "changeSeq"
            ).then(res => {
                if (res.suceeded) {
                    this.onSuccess && this.onSuccess();
                    this.close();
                }
            });
        }
    }
};
</script>

<style lang="less">
.addSortdialog {
    /deep/ .el-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .title {
            textarea {
                resize: none;
            }
        }
    }
    /deep/.el-dialog__body {
        height: 370px;
    }
    .sort-content {
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            border-top: 1px solid #eee;
            background: #fff;
            i {
                font-size: 16px;
                color: rgba(15, 79, 168, 1);
            }
            &:last-child {
                border-bottom: 1px solid #eee;
            }
        }
    }
}
</style>
