<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="海宝资讯"></Title>
            <Calendar></Calendar>
            <div class="task_list">
                <TaskItem v-for="(item, index) in [1, 2, 3, 4]" :key="index"></TaskItem>
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
// import MessageItem from "./item.vue";
import Title from "@/components/common/Title";
import Calendar from "@/components/Calendar";
import TaskItem from "./item";
import BgNav from "@/components/common/BgNav";
export default {
    data() {
        return {};
    },
    components: {
        // MessageItem,
        Title,
        Calendar,
        TaskItem,
        BgNav
    }
};
</script>

<style lang="less">
.message_container {
    display: flex;
    height: 100%;
    .task_list {
        margin-top: 20px;
        overflow-y: scroll;
        height: calc(100% - 363px);
    }
    .message_info {
        width: 363px;
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
