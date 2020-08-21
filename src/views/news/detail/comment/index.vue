<template>
    <div class="comment">
        <div class="comment_list">
            <CommentItem v-for="(item, index) in list" :key="index" :item="item"></CommentItem>
        </div>
    </div>
</template>

<script>
import CommentItem from "./item";
import { comment } from "@/model/api";
export default {
    data() {
        return {
            loading: false,
            list: []
        };
    },
    components: {
        CommentItem
    },
    methods: {
        getComment() {
            this.loading = true;
            const { id } = this.$route.params;
            comment({
                type: "GET",
                data: {
                    page: 1,
                    size: 10000,
                    relatedId: id,
                    type: "NEWS"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content } = res.data;
                    this.list = content;
                }
            });
        }
    },
    mounted() {
        this.getComment();
    }
};
</script>

<style lang="less"></style>
