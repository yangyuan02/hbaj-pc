<template>
    <div class="course">
        <div class="course_nav">
            <Title title="课件功能模块" :isMore="false"></Title>
            <div class="course_list">
                <Nav :modulesList="modulesList" path="course"></Nav>
            </div>
        </div>
        <div class="course_content">
            <Submenu :modulesList="modulesList" path="course"></Submenu>
            <div class="course_list" v-loading="loading">
                <template v-if="recommendProjectList.length > 0">
                    <CourseItem
                        v-for="(item, index) in recommendProjectList"
                        :key="index"
                        :item="item"
                    ></CourseItem>
                </template>
                <Empty v-else />
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
import Empty from "@/components/Empty";
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
        CourseItem,
        Empty
    },
    methods: {
        getCourseList() {
            this.loading = true;
            let { moduleId, blockId, classListId } = this.$route.query;
            classListId = classListId.toString() === "-1" ? "" : classListId;
            this.recommendProjectList = []; // 清空
            home(
                {
                    type: "GET",
                    data: {
                        page: 1,
                        size: 100000,
                        moduleId,
                        classId: classListId,
                        blockId,
                        publicFlg: 1
                    }
                },
                "project"
            ).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content, total } = res.data;
                    this.recommendProjectList = this.recommendProjectList.concat(content || []);
                }
            });
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
                            // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
                            transform: scale(1.1);
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
            position: relative;
            padding-right: 10px;
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
