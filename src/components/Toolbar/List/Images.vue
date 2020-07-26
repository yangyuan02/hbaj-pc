<template>
    <div class="images-list-containter">
        <div class="images-list-item" v-for="(item, index) in list" :key="index">
            <div class="images-header">
                <div class="images-title">
                    <span>{{ item.title }}</span>
                </div>
                <div class="operate">
                    <div class="sort"></div>
                    <div class="del"></div>
                    <div class="edit"></div>
                </div>
            </div>
            <div class="images-body">
                <div class="content">
                    <p>{{ item.content }}</p>
                </div>
                <div class="images">
                    <img :src="item.extra" :alt="item.title" />
                </div>
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
.images-list-item {
    height: 150px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    padding: 12px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .images-header {
        margin-bottom: 10px;
        .images-title {
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
            }
        }
    }
    .images-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        .content {
            p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 24px;
                color: rgba(102, 102, 102, 1);
            }
        }
        .images {
            width: 80px;
            height: 80px;
            img {
                width: 100%;
                height: 100%;
                max-width: 100%;
            }
        }
    }
}
</style>
