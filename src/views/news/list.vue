<template>
    <div class="news_list">
        <NewsItem v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7]" :key="index"></NewsItem>
    </div>
</template>

<script>
import NewsItem from "@/components/news";
export default {
    data() {
        return {};
    },
    components: {
        NewsItem
    }
};
</script>

<style lang="less">
.news_list {
    background: #fff;
    padding: 0 16px;
    overflow-y: scroll;
    height: 100%;
}
</style>
