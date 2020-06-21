<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="海宝资讯"></Title>
            <Calendar></Calendar>
        </div>
        <div class="message_right">
            空白区域
        </div>
    </div>
</template>

<script>
// import MessageItem from "./item.vue";
import Title from "@/components/common/Title";
import Calendar from "@/components/Calendar";
export default {
    data() {
        return {};
    },
    components: {
        // MessageItem,
        Title,
        Calendar
    }
};
</script>

<style lang="less">
.message_container {
    display: flex;
    height: 100%;
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
