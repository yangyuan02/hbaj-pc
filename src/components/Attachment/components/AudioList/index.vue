<template>
    <div class="images-list-containter">
        <template v-if="list.length">
            <div class="images-list-item" v-for="(item, index) in list" :key="index">
                <div class="images-header">
                    <div class="images-title">
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="operate_btn">
                        <div class="sort common">
                            <i class="iconfont iconpaixu cursor" @click="sort"></i>
                        </div>
                        <div class="edit common cursor" @click="edit(item)">
                            <i class="iconfont icontubiaoweb-07"></i>
                        </div>
                        <div class="del common cursor" @click="del(item)">
                            <i class="iconfont icontubiaoweb-27"></i>
                        </div>
                    </div>
                </div>
                <div class="images">
                    <div class="audio-box"></div>
                    <audio
                        id="audioPlayerGuide"
                        :src="globalConfig.imagePath + item.extra"
                        controlsList="nodownload"
                        controls="controls"
                        ref="audio"
                    ></audio>
                    <!-- <img :src="globalConfig.imagePath + item.extra" :alt="item.title" /> -->
                </div>
                <div class="images-body">
                    <div class="content">
                        <p>{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </template>

        <Empty v-else />

        <SortList
            :visible.sync="isOpenSort"
            :list="list"
            :hotspotId="hotspotId"
            :onSuccess="getList"
        />
    </div>
</template>

<script>
import { hotspotContent } from "@/model/api";
import Empty from "@/components/Empty";
import SortList from "../SortList/index";
import Bus from "@/components/bus/index.js";
export default {
    components: {
        Empty,
        SortList
    },
    data() {
        return {
            list: [],
            loading: false,
            isOpenSort: false
        };
    },
    props: {
        hotspotId: {
            type: [String, Number],
            required: true
        },
        engType: {
            type: Boolean,
            default: false
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
            this.$store.commit("SETDELANDEDIT", true);
            this.loading = true;
            hotspotContent(
                {
                    type: "get",
                    data: {
                        hotspotId: this.hotspotId,
                        type: "AUDIO",
                        size: 1000,
                        page: 1
                    }
                },
                "all"
            ).then(res => {
                if (res.suceeded) {
                    this.list = res.data || [];
                    this.loading = false;
                    if (!this.engType && this.list.length >= 1) {
                        this.$store.commit("SETADDDISABLED", true);
                    } else {
                        this.$store.commit("SETADDDISABLED", false);
                    }
                } else {
                    this.loading = false;
                }
            });
        },
        del(data) {
            const hotspotContentId = data.id;
            this.$confirm(`此操作将永久删 ${data.title}, 是否继续?`, "提示", {
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
        edit(data) {
            Bus.$emit("update-item", data);
        },
        sort() {
            this.isOpenSort = true;
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.images-list-item {
    // height: 150px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 12px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .images-header {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .images-title {
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
            }
        }
        .operate_btn {
            display: flex;
            .common {
                width: 18px;
                height: 18px;
                &:hover {
                    i {
                        color: #409eff;
                    }
                }
                i {
                    font-size: 18px;
                }
            }
            .edit {
                margin: 0px 10px;
            }
        }
    }
    .images-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // height: 100px;
        .content {
            flex: 1;
            p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 24px;
                color: rgba(102, 102, 102, 1);
            }
        }
        .images {
            width: 80px;
            height: 80px;
            margin-left: 8px;
            // .audio-box {
            //     width: 80px;
            //     height: 80px;
            //     border-radius: 50%;
            //     background: red;
            // }
            img {
                width: 100%;
                height: 100%;
                max-width: 100%;
            }
        }
    }
}
</style>
