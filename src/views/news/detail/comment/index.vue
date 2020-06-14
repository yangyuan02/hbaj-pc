<template>
    <div class="comment">
        <div class="comment_list">
            <CommentItem v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index"></CommentItem>
        </div>
    </div>
</template>

<script>
import CommentItem from "./item";
export default {
    data() {
        return {};
    },
    components: {
        CommentItem
    }
};
</script>

<style lang="less"></style>
