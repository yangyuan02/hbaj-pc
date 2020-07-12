<template>
    <div class="home">
        <div class="home_container">
            <Banner></Banner>
            <div class="scroll">
                <div class="home_news">
                    <Title title="海宝资讯"></Title>
                    <div class="home_news_list">
                        <NewsItem v-for="(item, index) in [1, 2]" :key="index"></NewsItem>
                    </div>
                </div>
                <div class="home_course">
                    <Title title="公共课件"></Title>
                    <div class="home_course_list">
                        <CourseItem v-for="(item, index) in [1, 2, 3]" :key="index"></CourseItem>
                    </div>
                </div>
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import BgNav from "@/components/common/BgNav";
import Title from "@/components/common/Title";
import Banner from "./banner.vue";
import NewsItem from "@/components/news";
import CourseItem from "@/components/course";

export default {
    data() {
        return {};
    },
    components: {
        BgNav,
        Banner,
        Title,
        NewsItem,
        CourseItem
    }
};
</script>

<style lang="less">
.home {
    display: flex;
    height: 100%;
    .home_container {
        height: 100%;
        .scroll {
            overflow-y: scroll;
            height: calc(100% - 258px);
        }
        .home_news,
        .home_course {
            background: #fff;
            .home_news_list,
            .home_course_list {
                padding: 0px 16px;
            }
        }
        .home_course {
            margin-top: 16px;
        }
    }
}
</style>
