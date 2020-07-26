<template>
    <div class="text-list-container">
        <div class="text-list-item" v-for="(item, index) in list" :key="index">
            <div class="text-header">
                <div class="text-title">
                    <span>{{ item.title }}</span>
                </div>
                <div class="operate">
                    <div class="sort"></div>
                    <div class="del"></div>
                    <div class="edit"></div>
                </div>
            </div>
            <div class="text-body">
                <p>{{ item.content }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    }
};
</script>
<style lang="less" scoped>
.text-list-item {
    height: 120px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 12px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // box-shadow: 0 8px 16px 0 rgba(216, 216, 216, 1), 0 6px 20px 0 rgba(216, 216, 216, 1);
    .text-header {
        margin-bottom: 10px;
        .text-title {
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
            }
        }
        .text-body {
            p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 24px;
                color: rgba(102, 102, 102, 1);
            }
        }
    }
}
</style>
