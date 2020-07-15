<template>
    <div class="home">
        <div class="home_container">
            <Banner :bannerList="bannerList"></Banner>
            <div class="scroll">
                <div class="home_news">
                    <Title title="海宝资讯" :onClick="toMoreNews"></Title>
                    <div class="home_news_list" v-loading="loading">
                        <NewsItem
                            v-for="(item, index) in newsList"
                            :key="index"
                            :item="item"
                        ></NewsItem>
                    </div>
                </div>
                <div class="home_course">
                    <Title title="公共课件" :onClick="toMoreCourse"></Title>
                    <div class="home_course_list" v-loading="loading">
                        <CourseItem
                            v-for="(item, index) in recommendProjectList"
                            :key="index"
                            :item="item"
                        ></CourseItem>
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

import { home } from "@/model/api";
import store from "@/widget/store";

export default {
    data() {
        return {
            bannerList: [],
            recommendProjectList: [],
            items: [],
            loading: false
        };
    },
    components: {
        BgNav,
        Banner,
        Title,
        NewsItem,
        CourseItem
    },
    computed: {
        newsList: function() {
            return this.items.slice(0, 2);
        }
    },
    methods: {
        getHome() {
            this.loading = true;
            home({ type: "GET" }, "app/pageInfo").then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const {
                        recommendProject,
                        navImage,
                        newsList,
                        newsDefaultImage,
                        blockModuleList
                    } = res.data;
                    const hash = {};
                    const modulesList = [];
                    this.recommendProjectList = Object.freeze(recommendProject);
                    this.bannerList = Object.freeze(
                        navImage.map(item => (item = JSON.parse(item)))
                    );
                    this.items = Object.freeze(newsList);
                    store.set("newsDefaultImage", newsDefaultImage, "local");
                    blockModuleList.forEach(item => {
                        item.classList.unshift({ id: -1, moduleId: item.id, name: "全部" });
                        if (!hash[item.name]) {
                            hash[item.name] = item.name;
                        }
                    });
                    Object.keys(hash).forEach(item => {
                        const data = {
                            name: item
                        };
                        data.children = blockModuleList.filter(k => k.name === item);
                        modulesList.push(data);
                    });
                    this.modulesList = modulesList;
                    store.set("modulesList", modulesList, "local");
                }
            });
        },
        toNewsDetail(id) {
            this.$router.push({
                name: "newsDetail",
                params: {
                    id
                }
            });
        },
        goTo(path) {
            this.$router.push({ path });
        },
        toMoreNews() {
            this.$router.push({ path: "/news" });
        },
        toMoreCourse() {
            const { name, children } = store.get("modulesList", "local")[0];
            const query = {
                name
            };
            if (children && children.length > 0) {
                query.moduleId = children[0].id;
                query.blockId = children[0].blockId;
                if (children[0].classList && children[0].classList.length > 0) {
                    query.classListId = children[0].classList[0].id;
                }
            }
            this.$router.push({
                path: "/course",
                query
            });
        }
    },
    mounted() {
        this.getHome();
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
