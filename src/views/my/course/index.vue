<template>
    <div class="course">
        <div class="course_nav">
            <Title title="公共课件"></Title>
            <div class="course_list">
                <Nav></Nav>
            </div>
        </div>
        <div class="course_content">
            <Submenu></Submenu>
            <div class="course_list">
                <CourseItem v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index"></CourseItem>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/common/Nav";
import Title from "@/components/common/Title";
import Submenu from "../../course/Submenu";
import CourseItem from "@/components/course";
export default {
    data() {
        return {};
    },
    components: {
        Nav,
        Title,
        Submenu,
        CourseItem
    }
};
</script>

<style lang="less">
.course {
    display: flex;
    .course_nav {
        width: 294px;
        .course_list {
            background: #fff;
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
        .course_list {
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
