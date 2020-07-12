<template>
    <div class="course">
        <div class="course_nav">
            <Title title="公共课件" :isMore="false"></Title>
            <div class="course_list">
                <Nav :modulesList="modulesList" path="course"></Nav>
            </div>
        </div>
        <div class="course_content">
            <Submenu :modulesList="modulesList" path="course"></Submenu>
            <div class="course_list">
                <CourseItem
                    v-for="(item, index) in recommendProjectList"
                    :key="index"
                    :item="item"
                ></CourseItem>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/common/Nav";
import Title from "@/components/common/Title";
import Submenu from "./Submenu";
import CourseItem from "@/components/course";
import { home } from "@/model/api";
import store from "@/widget/store";
import utils from "@/widget/utils";
export default {
    data() {
        return {
            recommendProjectList: [],
            modulesList: store.get("modulesList", "local"),
            pageIndex: 1,
            isScrollLoad: true,
            showLoading: false,
            pageTotal: 0
        };
    },
    components: {
        Nav,
        Title,
        Submenu,
        CourseItem
    },
    methods: {
        getCourseList() {
            const { pageIndex } = this;
            let { moduleId, blockId, classListId } = this.$route.query;
            classListId = classListId.toString() === "-1" ? "" : classListId;
            home(
                {
                    type: "GET",
                    data: {
                        page: pageIndex,
                        size: 10,
                        moduleId,
                        classId: classListId,
                        blockId
                    }
                },
                "project"
            ).then(res => {
                if (res.suceeded) {
                    const { content, total } = res.data;
                    if (pageIndex > 1) {
                        setTimeout(() => {
                            this.showLoading = false;
                            this.isScrollLoad = true;
                            this.recommendProjectList = this.recommendProjectList.concat(
                                content || []
                            );
                        }, 500);
                    } else {
                        this.recommendProjectList = content || [];
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
                    this.recommendProjectList.length < this.pageTotal
                ) {
                    this.showLoading = true;
                    this.pageIndex += 1;
                    this.getCourseList();
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
    watch: {
        $route: function() {
            this.pageIndex = 1;
            this.getCourseList();
        }
    },
    mounted() {
        this.getCourseList();
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
.course {
    display: flex;
    height: 100%;
    .course_nav {
        width: 294px;
        .course_list {
            background: #fff;
            height: 100%;
            & > nav {
                ul {
                    li {
                        margin: 0 auto;
                        margin-top: 40px;
                    }
                }
            }
        }
    }
    .course_content {
        padding: 16px;
        margin-left: 16px;
        flex: 1;
        background: #fff;
        // height: 100%;
        .course_list {
            overflow-y: scroll;
            height: calc(100% - 151px);
            & > .course-content-item {
                .course-item-thumb {
                    width: 125px !important;
                    height: 125px !important;
                }
            }
        }
    }
}
</style>
