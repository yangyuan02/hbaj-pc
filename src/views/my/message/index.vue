<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="海宝资讯"></Title>
            <div class="message_list">
                <message-item v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index"></message-item>
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import MessageItem from "./item.vue";
import Title from "@/components/common/Title";
import BgNav from "@/components/common/BgNav";
export default {
    data() {
        return {};
    },
    components: {
        MessageItem,
        Title,
        BgNav
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
