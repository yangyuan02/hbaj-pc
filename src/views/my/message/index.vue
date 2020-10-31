<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="我的消息" :isMore="false">
                <el-radio-group v-model="status" @change="changeStatus" size="mini">
                    <el-radio-button :label="0" type="primary">
                        未读
                    </el-radio-button>
                    <el-radio-button :label="1" type="primary">
                        已读
                    </el-radio-button>
                </el-radio-group>
            </Title>
            <div class="message_list scroll-view-wrapper" v-loading="loading">
                <template v-if="list.length > 0">
                    <message-item
                        v-for="item in list"
                        :key="item.id"
                        :item="item"
                        :onSuccess="getMessageList"
                    ></message-item>
                </template>
                <Empty v-else />
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
import Empty from "@/components/Empty";
export default {
    data() {
        return {
            userId: store.get("userId", "local"),
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            pageTotal: 0,
            showLoading: false,
            loading: false,
            status: 0
        };
    },
    components: {
        MessageItem,
        Title,
        BgNav,
        Empty
    },
    methods: {
        changeStatus() {
            this.pageIndex = 1;
            this.getMessageList();
        },
        getMessageList() {
            const { pageIndex } = this;
            this.loading = true;
            messageDetail(
                {
                    type: "get",
                    data: {
                        page: pageIndex,
                        size: "10",
                        receiver: this.userId,
                        status: this.status
                    }
                },
                "private"
            ).then(res => {
                if (res.suceeded) {
                    const { content, total } = res.data;
                    this.loading = false;
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
    overflow: hidden;
    .message_info {
        width: 367px;
        .message_list {
            overflow-y: scroll;
            height: calc(100% - 55px);
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
        }
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
