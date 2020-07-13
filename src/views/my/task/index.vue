<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="我的任务" :isMore="false"></Title>
            <Calendar></Calendar>
            <div class="task_list" v-loading="loading">
                <TaskItem v-for="(item, index) in list" :key="index" :item="item"></TaskItem>
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

import { task } from "@/model/api";
import utils from "@/widget/utils";

export default {
    data() {
        return {
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            showLoading: false,
            pageTotal: 0,
            loading: false
        };
    },
    components: {
        // MessageItem,
        Title,
        Calendar,
        TaskItem,
        BgNav
    },
    methods: {
        getTaskList() {
            const { pageIndex } = this;
            this.loading = true;
            task({
                type: "GET",
                data: {
                    page: pageIndex,
                    size: 10
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
    .task_list {
        margin-top: 20px;
        overflow-y: scroll;
        height: calc(100% - 400px);
    }
    .message_info {
        width: 363px;
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
