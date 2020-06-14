<template>
    <div class="recommend_list">
        <NewsItem v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8]" :key="index"></NewsItem>
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
.recommend_list {
    padding: 0 16px;
    margin-top: 4px;
    background: #fff;
}
</style>
