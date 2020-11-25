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
            <draggable @end="end" handle=".handler">
                <div class="item" v-for="(item, index) in sortList" :key="index">
                    <div class="handler">
                        <i class="iconfont iconpaixu cursor"></i>
                    </div>
                    <div class="title">
                        <p class="ellipsis">{{ item.name }}</p>
                    </div>
                </div>
            </draggable>
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
            params: {
                hotspotId: 0 // 附件id
            },
            loading: {
                save: false
            },
            newIds: []
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
        },
        list: {
            type: Array,
            default: []
        },
        getType: {
            type: String,
            default: ""
        }
    },
    watch: {
        id(newVal) {
            this.params.hotspotId = newVal;
        },
        list(val) {
            this.sortList = val;
        }
    },
    computed: {
        sortList: function() {
            return this.list;
        }
    },
    methods: {
        open() {
            console.log("打开", this.list);
        },
        close() {
            this.sortList = [];
            this.list = [];
            this.$emit("update:visible", false);
        },
        save() {
            let hotspotContentIds = [];
            if (this.newIds.length > 0) {
                hotspotContentIds = this.newIds;
            } else {
                hotspotContentIds = this.sortList.map(item => item.id);
            }

            const data = {
                hotspotContentIds,
                hotspotId: this.params.hotspotId
            };
            hotspotContent(
                {
                    type: "post",
                    data
                },
                "changeSeq"
            ).then(res => {
                if (res.suceeded) {
                    this.onSuccess && this.onSuccess(this.getType);
                    this.close();
                }
            });
        },
        end({ oldIndex, newIndex }) {
            console.log(this.sortList, oldIndex, newIndex);
            this.newIds = [];
            this.newIds = this.sortList.map(item => item.id);
            this.move(this.newIds, oldIndex, newIndex);
        },
        move(arr, oldIndex, newIndex) {
            //如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
            //我们再把数组之前的那个拖动的元素删除掉，所以要len+1
            if (oldIndex > newIndex) {
                arr.splice(newIndex, 0, arr[oldIndex]);
                arr.splice(oldIndex + 1, 1);
            } else {
                //如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
                //这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
                arr.splice(newIndex + 1, 0, arr[oldIndex]);
                arr.splice(oldIndex, 1);
            }
            return arr;
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
            height: 40px;
            border-top: 1px solid #eee;
            background: #fff;
            .handler {
                margin-right: 10px;
                cursor: move;
                i {
                    cursor: move;
                    &:hover {
                        color: #409eff;
                    }
                }
            }
            &:last-child {
                border-bottom: 1px solid #eee;
            }
        }
    }
}
</style>
