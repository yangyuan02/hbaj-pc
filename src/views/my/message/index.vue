<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="我的消息" :isMore="false"></Title>
            <div class="message_list">
                <message-item v-for="item in list" :key="item.id" :item="item"></message-item>
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import MessageItem from "./item.vue";
import Title from "@/components/common/Title";
import BgNav from "@/components/common/BgNav";
import { messageDetail } from "@/model/api";
import store from "@/widget/store";
import utils from "@/widget/utils";
export default {
    data() {
        return {
            userId: store.get("userId", "local"),
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            pageTotal: 0,
            showLoading: false
        };
    },
    components: {
        MessageItem,
        Title,
        BgNav
    },
    methods: {
        getMessageList() {
            const { pageIndex } = this;
            messageDetail(
                {
                    type: "get",
                    data: {
                        page: pageIndex,
                        size: "10",
                        receiver: this.userId
                    }
                },
                "private"
            ).then(res => {
                if (res.suceeded) {
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
                    this.getMessageList();
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
        this.getMessageList();
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
    .message_info {
        width: 363px;
        .message_list {
            overflow-y: scroll;
            height: 100%;
        }
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
