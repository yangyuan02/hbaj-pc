<template>
    <div class="news_list scroll-view-wrapper" v-loading="loading">
        <NewsItem v-for="item in list" :key="item.id" :item="item"></NewsItem>
    </div>
</template>

<script>
import NewsItem from "@/components/news";
import { news } from "@/model/api";
import utils from "@/widget/utils";
export default {
    data() {
        return {
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            pageTotal: 0,
            showLoading: false,
            loading: false
        };
    },
    components: {
        NewsItem
    },
    methods: {
        getNewsList() {
            this.loading = true;
            const { pageIndex } = this;
            news({
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
                    this.getNewsList();
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
        this.getNewsList();
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
.news_list {
    background: #fff;
    padding: 0 16px;
    overflow-y: scroll;
    height: calc(100% - 55px);
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
</style>
