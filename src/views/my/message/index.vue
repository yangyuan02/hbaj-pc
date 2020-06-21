<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="海宝资讯"></Title>
            <div class="message_list">
                <message-item v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index"></message-item>
            </div>
        </div>
        <div class="message_right">
            空白区域
        </div>
    </div>
</template>

<script>
import MessageItem from "./item.vue";
import Title from "@/components/common/Title";
export default {
    data() {
        return {};
    },
    components: {
        MessageItem,
        Title
    }
};
</script>

<style lang="less">
.message_container {
    display: flex;
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
