<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="我的任务" :isMore="false">
                <el-radio-group v-model="status" @change="changeStatus" size="mini">
                    <el-radio-button :label="1" type="primary">
                        进行中
                    </el-radio-button>
                    <el-radio-button :label="2" type="primary">
                        已完成
                    </el-radio-button>
                    <el-radio-button :label="3" type="primary">
                        已到期
                    </el-radio-button>
                </el-radio-group>
            </Title>
            <!-- <Calendar></Calendar> -->
            <div class="task_list scroll-view-wrapper" v-loading="loading">
                <template v-if="list.length > 0">
                    <TaskItem v-for="(item, index) in list" :key="index" :item="item"></TaskItem>
                </template>
                <Empty v-else />
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import Calendar from "@/components/Calendar";
import TaskItem from "./item";
import BgNav from "@/components/common/BgNav";
import Empty from "@/components/Empty";

import { task } from "@/model/api";
import utils from "@/widget/utils";
import store from "@/widget/store";

export default {
    data() {
        return {
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            showLoading: false,
            pageTotal: 0,
            loading: false,
            status: 1
        };
    },
    components: {
        // MessageItem,
        Title,
        Calendar,
        TaskItem,
        BgNav,
        Empty
    },
    methods: {
        changeStatus() {
            this.pageIndex = 1;
            this.list = [];
            this.getTaskList();
        },
        getTaskList() {
            const { pageIndex } = this;
            this.loading = true;
            const userId = store.get("userId", "local");
            task({
                type: "GET",
                data: {
                    page: pageIndex,
                    size: 10,
                    userId,
                    status: this.status
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content, total } = res.data;
                    if (pageIndex > 1) {
                        setTimeout(() => {
                            this.showLoading = false;
                            this.isScrollLoad = true;
                            this.list = this.list.concat(content || []);
                        }, 500);
                    } else {
                        this.list = content || [];
                    }
                    this.pageTotal = total;
                    if (pageIndex == Math.ceil(total / 10) || !content.length) {
                        this.showLoading = false;
                    }
                }
            });
        },
        scrollLoadList() {
            const winHeight = window.innerHeight;
            const scrollTop = document.scrollingElement.scrollTop;
            const scrollViewHeight =
                document.querySelector(".scroll-view-wrapper").offsetHeight - 50;
            const realFunc = () => {
                if (
                    winHeight + scrollTop >= scrollViewHeight &&
                    this.list.length < this.pageTotal
                ) {
                    this.showLoading = true;
                    this.pageIndex += 1;
                    this.getTaskList();
                } else {
                    this.isScrollLoad = true;
                }
            };
            if (this.isScrollLoad) {
                this.isScrollLoad = false;
                this.timer = window.requestAnimationFrame(realFunc);
            }
        }
    },
    mounted() {
        this.getTaskList();
        window.addEventListener(
            "scroll",
            this.scrollLoadList,
            utils.isPassive() ? { passive: true, capture: true } : true
        );
    },
    beforeDestroy() {
        cancelAnimationFrame(this.timer);
        window.removeEventListener(
            "scroll",
            this.scrollLoadList,
            utils.isPassive() ? { passive: true, capture: true } : true
        );
    }
};
</script>

<style lang="less">
.message_container {
    display: flex;
    height: 100%;
    overflow: hidden;

    .message_info {
        width: 367px;
        padding-bottom: 5px;
        .task_list {
            margin-top: 20px;
            overflow-y: scroll;
            height: calc(100% - 65px);
            position: relative;
            padding-right: 4px;
            &::-webkit-scrollbar {
                width: 4px;
                /*height: 4px;*/
            }
            // &::-webkit-scrollbar-thumb {
            //     border-radius: 10px;
            //     -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            //     background: rgba(0, 0, 0, 0.2);
            // }
            // &::-webkit-scrollbar-track {
            //     -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            //     border-radius: 0;
            //     background: rgba(0, 0, 0, 0.1);
            // }
            padding-bottom: 10px;
        }
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
