<template>
    <div class="course">
        <div class="course_nav">
            <Title title="公共课件" :isMore="false"></Title>
            <div class="course_list">
                <Nav :modulesList="modulesList" path="/my/course"></Nav>
            </div>
        </div>
        <div class="course_content">
            <Submenu :modulesList="modulesList" path="/my/course"></Submenu>
            <div class="course_list" v-loading="loading">
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
import Submenu from "../../course/Submenu";
import CourseItem from "@/components/course";
import { project } from "@/model/api";
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
            pageTotal: 0,
            loading: false
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
            this.loading = true;
            let { moduleId, blockId, classListId } = this.$route.query;
            classListId = classListId.toString() === "-1" ? "" : classListId;
            this.recommendProjectList = []; // 清空
            project({
                type: "GET",
                data: {
                    page: pageIndex,
                    size: 10,
                    moduleId,
                    classId: classListId,
                    blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
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
    overflow: hidden;
    .course_nav {
        width: 294px;
        height: 100%;
        .course_list {
            background: #fff;
            height: 100%;
            & > nav {
                ul {
                    li {
                        margin: 0 auto;
                        margin-top: 40px;
                        &.active {
                            transform: scale(1.1);
                            // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
                        }
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
            height: calc(100% - 206px);
            padding-right: 10px;
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
