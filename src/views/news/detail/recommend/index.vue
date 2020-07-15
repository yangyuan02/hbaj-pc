<template>
    <div class="recommend_list scroll-view-wrapper" v-loading="loading">
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
            const { pageIndex } = this;
            this.loading = true;
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
.recommend_list {
    padding: 0 16px;
    margin-top: 4px;
    background: #fff;
    overflow-y: scroll;
    height: calc(100% - 55px);
}
</style>
