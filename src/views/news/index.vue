<template>
    <div class="news">
        <div class="home_container">
            <Title title="海宝资讯"></Title>
            <List></List>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import BgNav from "@/components/common/BgNav";
import Title from "@/components/common/Title";
import NewsItem from "@/components/news";
import List from "./list.vue";

export default {
    data() {
        return {};
    },
    components: {
        BgNav,
        Title,
        NewsItem,
        List
    }
};
</script>

<style lang="less">
.news {
    display: flex;
}
</style>
